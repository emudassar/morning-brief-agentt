import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import MarketingNavbar from "../components/MarketingNavbar";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="app-shell">
      <MarketingNavbar />

      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              Your day, briefed before it begins
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tightest sm:text-5xl">
              Clarity Before Coffee.
              <span className="block bg-brand-gradient bg-clip-text text-transparent">
                One briefing. Zero noise.
              </span>
            </h1>
            <p className="max-w-xl text-base text-muted sm:text-lg">
              Stop juggling weather apps, news tabs, and calendar checks. Morning Briefing Agent compiles your
              priorities into one clean Telegram update so you can start fast and focused.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/register">
                <Button size="lg">Get Started Free</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  View Dashboard
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted">Loved by 1,000+ professionals</p>
          </div>

          <Card className="overflow-hidden p-0">
            <div className="border-b border-slate-200/80 bg-slate-50 px-5 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Mock Dashboard</p>
            </div>
            <div className="space-y-4 p-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-xs text-muted">Next briefing</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">08:00 - Asia/Karachi</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-xs text-muted">Status</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-700">Active</p>
                </div>
              </div>
              <div className="rounded-xl bg-brand-gradient p-4 text-white shadow-premium">
                <p className="text-sm font-semibold">Send briefing now</p>
                <p className="mt-1 text-xs text-white/90">One click to generate and deliver instantly.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Latest briefing</p>
                <p className="mt-2 text-sm text-slate-700">
                  Good morning! Weather is clear, your 10:30 meeting is coming up, and top headlines are ready.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold text-slate-900 text-center">How it works</h2>
            <p className="mt-3 text-slate-500 text-center max-w-xl mx-auto">
              Three steps. One Telegram message. Every morning.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white text-xl font-bold">
                  1
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Create your account</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Sign up in 30 seconds. Set your city, timezone, and what modules you want in your briefing.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-white text-xl font-bold">
                  2
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Connect Telegram</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Send one message to our Telegram bot to link your account. Takes 10 seconds.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white text-xl font-bold">
                  3
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Wake up informed</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Every morning at your chosen time, Gemini AI writes your personal briefing and sends it straight to Telegram.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-900">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-extrabold text-white">7 days</p>
                <p className="mt-1 text-sm text-slate-400">Free trial, no card</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">90 sec</p>
                <p className="mt-1 text-sm text-slate-400">Delivery after schedule</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">$0</p>
                <p className="mt-1 text-sm text-slate-400">Cost at launch</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">5 apps</p>
                <p className="mt-1 text-sm text-slate-400">Replaced by 1 message</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold text-slate-900 text-center">What arrives every morning</h2>
            <p className="mt-3 text-slate-500 text-center max-w-xl mx-auto">
              One Telegram message. Everything you need to start your day.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="text-3xl">🌤️</div>
                <h3 className="mt-3 font-semibold text-slate-900">Live Weather</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Current temp, feels like, humidity, wind speed, and a practical outfit or commute tip.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="text-3xl">📰</div>
                <h3 className="mt-3 font-semibold text-slate-900">Top News</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Top 3 headlines from your country — curated and summarized by Gemini AI.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="text-3xl">📅</div>
                <h3 className="mt-3 font-semibold text-slate-900">Calendar Events</h3>
                <p className="mt-2 text-sm text-slate-500">
                  All your Google Calendar events for today with prep suggestions between meetings.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="text-3xl">💬</div>
                <h3 className="mt-3 font-semibold text-slate-900">Motivational Quote</h3>
                <p className="mt-2 text-sm text-slate-500">
                  A handpicked daily quote to set the right mindset before your day starts.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="text-3xl">⚡</div>
                <h3 className="mt-3 font-semibold text-slate-900">AI Written</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Gemini 1.5 Flash writes a warm, personal briefing — not a raw data dump.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="text-3xl">🕐</div>
                <h3 className="mt-3 font-semibold text-slate-900">Your Schedule</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Set any delivery time in any timezone. Your briefing waits for you, not the other way around.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Simple, honest pricing</h2>
            <p className="mt-3 text-slate-500 text-base max-w-lg mx-auto">
              Start completely free for 7 days — no credit card needed.
              Upgrade when you are ready for unlimited daily briefings.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition"
              >
                Start Free — 7 Days
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 px-8 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                See All Plans →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
