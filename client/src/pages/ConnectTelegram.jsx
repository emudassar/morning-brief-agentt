import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckCircle2, Copy, ExternalLink, Loader2, MessageCircle, Send, Smartphone } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";

const botUsername =
  import.meta.env.VITE_TELEGRAM_BOT_USERNAME || "@BriefMorningAgentBot";
const botOpenUrl =
  import.meta.env.VITE_TELEGRAM_BOT_URL || "https://t.me/BriefMorningAgentBot";

export default function ConnectTelegram() {
  const { token, user, setUser } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const startCommand = useMemo(() => `/start ${user?.email ?? "your@email.com"}`, [user?.email]);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    let intervalId;

    const poll = async () => {
      try {
        const { data } = await api.get("/api/user/me");
        setUser(data);
        if (data.telegramChatId) {
          if (intervalId) clearInterval(intervalId);
          setIsConnected((prev) => {
            if (!prev) {
              toast.success("Connected! Your first briefing is being sent to Telegram now.");
            }
            return true;
          });
          setTimeout(() => navigate("/setup"), 1300);
        }
      } catch {
        /* ignore polling errors */
      }
    };

    poll();
    intervalId = setInterval(poll, 3000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [token, navigate, setUser]);

  async function handleCopyCommand() {
    try {
      await navigator.clipboard.writeText(startCommand);
      setCopied(true);
      toast.success("Command copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy command");
    }
  }

  return (
    <div className="app-shell min-h-full px-4 py-8">
      <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-2">
        <Card className="p-8 sm:p-10">
          <div className="mb-6 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] text-white">Step 2 / 3</span>
            Connect Telegram
          </div>
          <h1 className="text-3xl font-bold tracking-tightest">Connect Telegram</h1>
          <p className="mt-2 text-sm text-muted">One quick setup and your daily briefing starts flowing automatically.</p>

          <div className="mt-6 space-y-3">
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="mt-0.5 rounded-full bg-brand-100 p-1 text-brand-700">
                <span className="block h-2 w-2 rounded-full bg-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Step 1: Open your bot</p>
                <p className="text-sm text-muted">
                  Search for <span className="font-medium text-slate-700">{botUsername}</span> in Telegram, or{" "}
                  <a
                    href={botOpenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-brand-600 underline decoration-brand-200 underline-offset-2 hover:text-brand-700"
                  >
                    open the bot
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </a>{" "}
                  in your browser or app.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="mt-0.5 rounded-full bg-brand-100 p-1 text-brand-700">
                <span className="block h-2 w-2 rounded-full bg-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Step 2: Send this command</p>
                <div className="mt-2 flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 ring-1 ring-brand-100">
                  <code className="flex-1 break-all font-mono text-sm text-brand-700">{startCommand}</code>
                  <button
                    type="button"
                    onClick={handleCopyCommand}
                    className="inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="mt-0.5 rounded-full bg-brand-100 p-1 text-brand-700">
                <span className="block h-2 w-2 rounded-full bg-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Step 3: Wait for auto-detect</p>
                <p className="text-sm text-muted">We check your Telegram connection every few seconds.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-3">
            {isConnected ? (
              <div className="flex items-center gap-2 text-emerald-700">
                <span className="relative inline-flex">
                  <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-emerald-300/70" />
                  <CheckCircle2 className="relative h-6 w-6" />
                </span>
                <span className="text-sm font-semibold">Connected! Redirecting to setup...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-600">
                <Loader2 className="h-4 w-4 animate-spin text-brand-600" />
                <span className="text-sm">Waiting for connection confirmation...</span>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="border-b border-slate-200 bg-sky-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <p className="text-sm font-semibold">Telegram Chat Preview</p>
            </div>
          </div>
          <div className="space-y-3 bg-gradient-to-b from-sky-50 to-white p-4">
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-white px-3 py-2 text-sm shadow-soft ring-1 ring-slate-200">
                {startCommand}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-brand-600 px-3 py-2 text-sm text-white shadow-soft">
                Connected! Briefing arrives daily at your selected time.
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">What happens next</p>
              <div className="mt-2 space-y-2 text-sm text-slate-700">
                <p className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-brand-600" /> Bot links your account</p>
                <p className="flex items-center gap-2"><Send className="h-4 w-4 text-brand-600" /> Daily briefing gets delivered</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
