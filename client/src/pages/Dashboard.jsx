import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  AlertTriangle,
  CalendarClock,
  LayoutDashboard,
  History,
  Inbox,
  Loader2,
  LogOut,
  Menu,
  MessageCircle,
  Pause,
  Play,
  Send,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { DashboardSkeleton } from "../components/ui/Skeleton";

function StatusBadge({ status }) {
  const base = "rounded-full px-2 py-0.5 text-xs font-medium";
  if (status === "sent") return <span className={`${base} bg-emerald-100 text-emerald-800`}>sent</span>;
  if (status === "failed") return <span className={`${base} bg-rose-100 text-rose-700`}>failed</span>;
  return <span className={`${base} bg-slate-100 text-slate-600`}>{status}</span>;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();
  const [latestBriefing, setLatestBriefing] = useState(null);
  const [briefingHistory, setBriefingHistory] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [dismissedSubscriptionBanner, setDismissedSubscriptionBanner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sendLoading, setSendLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    let cancelled = false;

    function isAbortedRequest(err) {
      return err?.code === "ERR_CANCELED" || err?.name === "CanceledError";
    }

    async function loadDashboard() {
      setLoading(true);
      try {
        const meRes = await api.get("/api/user/me", { signal: ac.signal });
        if (cancelled) return;
        setUser(meRes.data);

        const results = await Promise.allSettled([
          api.get("/api/briefing/latest", { signal: ac.signal }),
          api.get("/api/briefing/history", { params: { limit: 7 }, signal: ac.signal }),
          api.get("/api/user/subscription", { signal: ac.signal }),
        ]);
        if (cancelled) return;

        const [latestR, histR, subR] = results;

        if (latestR.status === "fulfilled") {
          setLatestBriefing(latestR.value.data);
        } else {
          setLatestBriefing(null);
        }

        if (histR.status === "fulfilled") {
          setBriefingHistory(Array.isArray(histR.value.data) ? histR.value.data : []);
        } else {
          setBriefingHistory([]);
        }

        if (subR.status === "fulfilled") {
          setSubscriptionStatus(subR.value.data || null);
        } else {
          setSubscriptionStatus(null);
        }

        setDismissedSubscriptionBanner(false);
      } catch (err) {
        if (cancelled || isAbortedRequest(err)) return;
        toast.error("Could not load dashboard");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDashboard();
    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [setUser]);

  async function handleToggleActive() {
    setToggleLoading(true);
    try {
      await api.put("/api/user/toggle-active");
      const { data } = await api.get("/api/user/me");
      setUser(data);
      toast.success(data.isActive ? "Briefings resumed" : "Briefings paused");
    } catch (err) {
      toast.error(err.response?.data?.error ?? err.message ?? "Update failed");
    } finally {
      setToggleLoading(false);
    }
  }

  async function handleSendNow() {
    if (!user.telegramChatId) {
      toast.error("Link Telegram first — open the banner below.");
      return;
    }
    setSendLoading(true);
    try {
      await api.post("/api/briefing/send-now");
      toast.success("Briefing sent! Check Telegram in ~10 seconds");
      const [latestRes, histRes] = await Promise.all([
        api.get("/api/briefing/latest"),
        api.get("/api/briefing/history", { params: { limit: 7 } }),
      ]);
      setLatestBriefing(latestRes.data);
      setBriefingHistory(Array.isArray(histRes.data) ? histRes.data : []);
    } catch (err) {
      const msg = err.response?.data?.error ?? err.message ?? "Send failed";
      if (msg.toLowerCase().includes("telegram")) {
        toast.error(
          "Telegram not linked yet. Use Link Telegram, send /start with your account email, and keep the API server online so the bot can reach Telegram."
        );
      } else {
        toast.error(msg);
      }
    } finally {
      setSendLoading(false);
    }
  }

  function handleLogout() {
    setSidebarOpen(false);
    logout();
    navigate("/login");
  }

  function handleGoHistory() {
    const section = document.getElementById("history");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSidebarOpen(false);
  }

  if (loading || !user) {
    return <DashboardSkeleton />;
  }

  const active = !!user.isActive;
  const linked = !!user.telegramChatId;
  const firstName = (user.email || "there").split("@")[0];
  const now = Date.now();
  const startOfWeek = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  })();
  const fallbackBriefingsThisWeek = briefingHistory.filter((b) => {
    if (!b?.createdAt) return false;
    return new Date(b.createdAt).getTime() >= startOfWeek.getTime();
  }).length;
  const briefingsThisWeek = subscriptionStatus?.briefingsThisWeek ?? fallbackBriefingsThisWeek;

  const plan = subscriptionStatus?.plan;
  const trialDaysRemaining = Number(subscriptionStatus?.trialDaysRemaining ?? 0);
  const cancelAtPeriodEnd = !!subscriptionStatus?.cancelAtPeriodEnd;
  const currentPeriodEnd = subscriptionStatus?.currentPeriodEnd
    ? new Date(subscriptionStatus.currentPeriodEnd)
    : null;

  let subscriptionBanner = null;

  if (!dismissedSubscriptionBanner && plan === "trial" && trialDaysRemaining > 0) {
    subscriptionBanner = (
      <Card className="flex items-start justify-between gap-3 border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
        <p>
          {"\u23f3"} Your free trial ends in {trialDaysRemaining} day(s).{" "}
          <Link to="/pricing" className="font-semibold underline">
            Upgrade
          </Link>{" "}
          to keep daily briefings {"\u2192"}
        </p>
        <button
          type="button"
          onClick={() => setDismissedSubscriptionBanner(true)}
          className="rounded-md p-1 text-yellow-700 transition hover:bg-yellow-100"
          aria-label="Dismiss subscription banner"
        >
          <X className="h-4 w-4" />
        </button>
      </Card>
    );
  } else if (!dismissedSubscriptionBanner && plan === "trial" && trialDaysRemaining === 0) {
    subscriptionBanner = (
      <Card className="flex items-start justify-between gap-3 border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
        <p>
          {"\ud83d\udd12"} Your free trial has ended. You're now on the free plan (3 briefings/week).{" "}
          <Link to="/pricing" className="font-semibold underline">
            Upgrade
          </Link>{" "}
          to restore daily access {"\u2192"}
        </p>
        <button
          type="button"
          onClick={() => setDismissedSubscriptionBanner(true)}
          className="rounded-md p-1 text-rose-700 transition hover:bg-rose-100"
          aria-label="Dismiss subscription banner"
        >
          <X className="h-4 w-4" />
        </button>
      </Card>
    );
  } else if (!dismissedSubscriptionBanner && plan === "free") {
    subscriptionBanner = (
      <Card className="flex items-start justify-between gap-3 border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p>
          Free plan: {briefingsThisWeek}/3 briefings used this week.{" "}
          <Link to="/pricing" className="font-semibold underline">
            Upgrade
          </Link>{" "}
          for unlimited {"\u2192"}
        </p>
        <button
          type="button"
          onClick={() => setDismissedSubscriptionBanner(true)}
          className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
          aria-label="Dismiss subscription banner"
        >
          <X className="h-4 w-4" />
        </button>
      </Card>
    );
  } else if (
    !dismissedSubscriptionBanner &&
    (plan === "monthly" || plan === "yearly") &&
    cancelAtPeriodEnd &&
    currentPeriodEnd &&
    now <= currentPeriodEnd.getTime()
  ) {
    subscriptionBanner = (
      <Card className="flex items-start justify-between gap-3 border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <p>
          Your subscription is cancelled. Access continues until{" "}
          {currentPeriodEnd.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          .
        </p>
        <button
          type="button"
          onClick={() => setDismissedSubscriptionBanner(true)}
          className="rounded-md p-1 text-amber-700 transition hover:bg-amber-100"
          aria-label="Dismiss subscription banner"
        >
          <X className="h-4 w-4" />
        </button>
      </Card>
    );
  }

  return (
    <div className="app-shell min-h-full px-4 py-8">
      <div className="mx-auto mb-4 flex w-full max-w-7xl items-center justify-between lg:hidden">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button
          type="button"
          onClick={() => setSidebarOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block lg:sticky lg:top-8 lg:h-fit`}
        >
          <Card className="p-4">
            <Link
              to="/"
              className="mb-3 flex items-center gap-2 rounded-xl px-2 py-2 text-slate-900 transition hover:bg-slate-100"
              aria-label="Go to home page"
            >
              <span className="rounded-lg bg-brand-gradient p-1.5 text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold tracking-tight">Morning Briefing Agent</span>
            </Link>
            <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Workspace</p>
            <nav className="space-y-1.5">
              <div
                className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700"
                aria-current="page"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </div>
              <Link
                to="/setup"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                type="button"
                onClick={handleGoHistory}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <History className="h-4 w-4" />
                History
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </nav>
          </Card>
        </aside>

        <main className="space-y-6">
          {subscriptionBanner}

          <Card className="flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <p className="text-sm text-muted">Good morning,</p>
              <h1 className="text-xl font-bold tracking-tightest capitalize sm:text-2xl">{firstName}</h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                <CalendarClock className="h-4 w-4 text-brand-600" />
                Next briefing: {user.briefingTime} - {user.timezone}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                  active ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-700"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${active ? "bg-emerald-500" : "bg-rose-500"}`} />
                {active ? "Active" : "Paused"}
              </span>
              <Button type="button" onClick={handleToggleActive} disabled={toggleLoading} variant="secondary" size="sm">
                {toggleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : active ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {active ? "Pause" : "Resume"}
              </Button>
            </div>
          </Card>

          {!linked && (
            <Card className="flex gap-3 border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
              <div className="space-y-2">
                <p className="font-semibold">Telegram not connected</p>
                <p>Send this command to your bot to activate delivery:</p>
                <p className="rounded-lg bg-white/80 px-3 py-2 font-mono text-amber-900 ring-1 ring-amber-200">
                  /start {user.email}
                </p>
                <Link to="/connect-telegram" className="inline-flex items-center gap-2 link-brand">
                  <MessageCircle className="h-4 w-4" />
                  Open Link Telegram page
                </Link>
              </div>
            </Card>
          )}

          <section className="grid gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-1 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Primary action</p>
              <Button
                type="button"
                onClick={handleSendNow}
                disabled={sendLoading || !linked}
                title={!linked ? "Connect Telegram first" : undefined}
                className="mt-4 w-full"
                size="lg"
              >
                {sendLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                {sendLoading ? "Sending..." : "Send Now"}
              </Button>
              <p className="mt-3 text-xs text-muted">Delivers instantly to your connected Telegram account.</p>
            </Card>

            <Card className="xl:col-span-2 p-5">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Last briefing preview</h2>
              {latestBriefing?.content ? (
                <textarea
                  readOnly
                  value={latestBriefing.content}
                  rows={8}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 font-sans text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                />
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center">
                  <Inbox className="mx-auto h-6 w-6 text-slate-400" />
                  <p className="mt-2 text-sm text-slate-500">No briefings yet.</p>
                  <p className="mt-1 text-xs text-slate-400">Generate your first one using Send Now.</p>
                </div>
              )}
            </Card>
          </section>

          <section id="history" className="grid gap-4 xl:grid-cols-3">
            <Card className="p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-sm text-slate-600">Delivery</span>
                  <StatusBadge status={active ? "sent" : "failed"} />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-sm text-slate-600">Telegram</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${linked ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                    {linked ? "connected" : "not linked"}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="xl:col-span-2 p-5">
              <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <History className="h-4 w-4" />
                History
              </h2>
              <ul className="space-y-3">
                {briefingHistory.length === 0 ? (
                  <li className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-6 text-center text-sm text-slate-500">
                    No history yet. Your activity will appear here.
                  </li>
                ) : (
                  briefingHistory.map((b) => (
                    <li
                      key={b._id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2 transition hover:border-slate-200 hover:bg-slate-50"
                    >
                      <span className="text-sm text-slate-700">
                        {new Date(b.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                      <StatusBadge status={b.status} />
                    </li>
                  ))
                )}
              </ul>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
