import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import moment from "moment-timezone";
import { findTimezoneOption, getTimezoneSelectOptions } from "../constants/timezones";
import {
  Bitcoin,
  CalendarDays,
  Clock3,
  CloudSun,
  Globe2,
  History,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Quote,
  Settings,
  Sparkles,
} from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";

const selectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "0.75rem",
    borderColor: "#e2e8f0",
    minHeight: "44px",
    boxShadow: "none",
    transition: "all 0.3s ease",
    "&:hover": { borderColor: "#cbd5e1" },
  }),
  valueContainer: (base) => ({ ...base, padding: "0 10px" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#eef2ff" : "white",
    color: "#0f172a",
  }),
  menu: (base) => ({ ...base, zIndex: 50 }),
};

function defaultModules() {
  return {
    weather: true,
    news: true,
    calendar: false,
    crypto: false,
    quote: true,
  };
}

function ToggleRow({ label, checked, onChange, badge }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-left transition hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-brand-500/30"
    >
      <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
        {label.icon}
        <span>{label.text}</span>
        {badge}
      </span>
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          checked ? "bg-brand-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

export default function SetPreferences() {
  const navigate = useNavigate();
  const { token, setUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [briefingTime, setBriefingTime] = useState("08:00");
  const [timezone, setTimezone] = useState(() => findTimezoneOption("UTC"));
  const [modules, setModules] = useState(defaultModules);

  const timezoneOptions = useMemo(() => getTimezoneSelectOptions(), []);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get("/api/user/me");
        if (cancelled) return;
        setUser(data);
        if (data.briefingTime) setBriefingTime(data.briefingTime.slice(0, 5));
        if (data.timezone) {
          setTimezone(findTimezoneOption(data.timezone));
        }
        if (data.modules) {
          setModules({
            weather: !!data.modules.weather,
            news: !!data.modules.news,
            calendar: !!data.modules.calendar,
            crypto: !!data.modules.crypto,
            quote: !!data.modules.quote,
          });
        }
      } catch {
        toast.error("Could not load your profile");
        navigate("/login", { replace: true });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, navigate, setUser]);

  const preview = useMemo(() => {
    const tz = timezone?.value ?? "UTC";
    const tzDisplay = timezone?.label ?? tz;
    const readableTime = moment(briefingTime, "HH:mm").format("h:mm A");
    return `Your briefing will arrive at ${readableTime} (${tzDisplay})`;
  }, [briefingTime, timezone]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/api/user/preferences", {
        briefingTime,
        timezone: timezone?.value ?? "UTC",
        modules,
      });
      setUser(data);
      toast.success("Preferences saved");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error ?? err.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="app-shell flex min-h-full items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl space-y-6">
          <Card className="p-8">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="mt-3 h-10 w-full" />
          </Card>
          <Card className="p-6 sm:p-8">
            <Skeleton className="h-6 w-44" />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell min-h-full px-4 py-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-8 lg:h-fit">
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
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <div
                className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700"
                aria-current="page"
              >
                <Settings className="h-4 w-4" />
                Settings
              </div>
              <Link
                to="/dashboard#history"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <History className="h-4 w-4" />
                History
              </Link>
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
          <Card className="p-8">
            <div className="mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] text-white">Step 3 / 3</span>
              Finalize preferences
            </div>
            <h1 className="text-3xl font-bold tracking-tightest">Set your briefing</h1>
            <p className="mt-2 rounded-xl bg-brand-50 px-3 py-2 text-sm text-brand-700 ring-1 ring-brand-100">{preview}</p>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Time & Timezone</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Clock3 className="h-4 w-4 text-brand-600" />
                    Daily briefing time
                  </div>
                  <Input
                    id="briefingTime"
                    type="time"
                    value={briefingTime}
                    onChange={(e) => setBriefingTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Globe2 className="h-4 w-4 text-brand-600" />
                    Timezone
                  </div>
                  <Select
                    options={timezoneOptions}
                    value={timezone}
                    onChange={(v) => v && setTimezone(v)}
                    styles={selectStyles}
                    isSearchable
                    placeholder="Select timezone"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Modules</h2>
              <p className="mt-1 text-sm text-muted">Choose what appears in your daily briefing.</p>
              <div className="mt-5 space-y-2">
                <ToggleRow
                  label={{ text: "Weather", icon: <CloudSun className="h-4 w-4 text-brand-600" /> }}
                  checked={modules.weather}
                  onChange={(v) => setModules((m) => ({ ...m, weather: v }))}
                />
                <ToggleRow
                  label={{ text: "News", icon: <Newspaper className="h-4 w-4 text-brand-600" /> }}
                  checked={modules.news}
                  onChange={(v) => setModules((m) => ({ ...m, news: v }))}
                />
                <ToggleRow
                  label={{ text: "Calendar", icon: <CalendarDays className="h-4 w-4 text-brand-600" /> }}
                  checked={modules.calendar}
                  onChange={(v) => setModules((m) => ({ ...m, calendar: v }))}
                  badge={
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      Phase 2
                    </span>
                  }
                />
                <ToggleRow
                  label={{ text: "Crypto", icon: <Bitcoin className="h-4 w-4 text-brand-600" /> }}
                  checked={modules.crypto}
                  onChange={(v) => setModules((m) => ({ ...m, crypto: v }))}
                />
                <ToggleRow
                  label={{ text: "Quote", icon: <Quote className="h-4 w-4 text-brand-600" /> }}
                  checked={modules.quote}
                  onChange={(v) => setModules((m) => ({ ...m, quote: v }))}
                />
              </div>
            </Card>

            <Button type="submit" loading={saving} className="w-full" size="lg">
              {saving ? "Saving..." : "Save & go to dashboard"}
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
