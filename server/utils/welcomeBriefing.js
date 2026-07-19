// welcomeBriefing.js — fire-and-forget first briefing after Telegram is linked (instant trust / test send).
function queueWelcomeBriefing(userId, label = "link") {
  const { runBriefingJob } = require("../jobs/briefingJob");
  setImmediate(() => {
    runBriefingJob(userId).catch((err) => {
      console.error(`[welcomeBriefing:${label}] runBriefingJob failed for ${userId}:`, err.message);
    });
  });
}

module.exports = { queueWelcomeBriefing };
