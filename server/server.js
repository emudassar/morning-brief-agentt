require("dotenv").config();

// server.js — API entry point.
// Order: load env -> middleware (CORS, security, logging) -> routes -> health checks -> connect DB -> start scheduler + Telegram bot.

// ---------- Imports ----------
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const db = require("./config/db");
const auth = require("./routes/auth");
const user = require("./routes/user");
const briefing = require("./routes/briefing");
const { startScheduler, getSchedulerStatus } = require("./scheduler/scheduler");

const app = express();

// ---------- CORS: only the deployed frontend (CLIENT_URL) and local dev may call this API ----------
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (curl, server-to-server) with no Origin header.
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

// ---------- Security headers and request logging ----------
app.use(helmet());
app.use(morgan("dev"));

// ---------- Routes ----------
// Webhooks must be mounted BEFORE express.json(): signature checks need the raw request body.
app.use("/api", require("./routes/webhooks"));
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/briefing", briefing);

// ---------- Health and debug endpoints ----------
// Root: simple "is it up" message (also handy as a Render health check).
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Morning Briefing API",
    health: "/health",
  });
});

// Telegram status that never throws, so /health keeps working even if the bot failed to start.
function safeTelegramStatus() {
  try {
    return require("./services/telegram").getTelegramBotStatus();
  } catch (err) {
    return { initialized: false, error: err.message };
  }
}

// /health: public status of the scheduler and Telegram bot.
app.get("/health", (req, res) => {
  const scheduler = getSchedulerStatus();
  const telegram = safeTelegramStatus();
  res.json({
    ok: true,
    time: new Date().toISOString(),
    scheduler: {
      startedAt: scheduler.startedAt,
      cronRegistered: scheduler.cronRegistered,
      approximateNextCronUtc: scheduler.approximateNextCronUtc,
      lastTickStartedAt: scheduler.lastTickStartedAt,
      lastTickFinishedAt: scheduler.lastTickFinishedAt,
      lastTickDurationMs: scheduler.lastTickDurationMs,
      lastError: scheduler.lastError,
    },
    telegram: {
      isPolling: telegram.isPolling,
      pollingStartedAt: telegram.pollingStartedAt,
      lastPollingErrorAt: telegram.lastPollingErrorAt,
      restartInProgress: telegram.restartInProgress,
      initialized: telegram.initialized !== false,
      ...(telegram.error ? { error: telegram.error } : {}),
    },
  });
});

// /debug/scheduler: full scheduler details, locked behind DEBUG_SCHEDULER_SECRET.
app.get("/debug/scheduler", (req, res) => {
  const secret = process.env.DEBUG_SCHEDULER_SECRET;
  if (!secret) {
    return res.status(503).json({
      error: "Debug disabled — set DEBUG_SCHEDULER_SECRET in the server environment",
    });
  }
  const provided = req.query.secret || req.headers["x-debug-secret"];
  if (provided !== secret) {
    return res.status(403).json({ error: "Forbidden — provide ?secret= or x-debug-secret header" });
  }

  const scheduler = getSchedulerStatus();
  const telegram = safeTelegramStatus();

  res.json({
    serverTimeUtc: new Date().toISOString(),
    scheduler,
    telegram,
  });
});

// ---------- Startup ----------
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then listen, then start the daily-briefing scheduler and the Telegram bot.
async function start() {
  await db();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    startScheduler();
    require("./services/telegram");
  });
}

start();
