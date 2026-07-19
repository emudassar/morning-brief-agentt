import { CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const bullets = [
  "Daily AI briefings built for focus",
  "Telegram delivery at your chosen time",
  "Personalized weather, news, and schedule",
];

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="app-shell min-h-full">
      <div className="mx-auto grid min-h-full w-full max-w-6xl items-stretch gap-6 px-4 py-8 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <section className="hidden overflow-hidden rounded-3xl border border-indigo-100/70 bg-brand-gradient p-10 text-white shadow-sm lg:flex lg:flex-col lg:justify-between">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Go to home page"
          >
            <Sparkles className="h-4 w-4" />
            Morning Briefing Agent
          </Link>
          <div className="space-y-5">
            <h2 className="text-4xl font-bold leading-tight tracking-tightest text-white">
              Start every morning
              <span className="block text-indigo-100">with complete clarity.</span>
            </h2>
            <p className="max-w-md text-sm leading-6 text-indigo-100/95">
              A premium daily briefing experience that keeps your day structured, informed, and actionable in one
              message.
            </p>
            <div className="space-y-3">
              {bullets.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-indigo-50">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-wide text-indigo-100/90">Sample briefing preview</p>
            <p className="mt-2 text-sm text-white/95">
              Good morning! Weather is clear, your 10:30 standup is next, and 3 headlines are ready.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="auth-fade-in w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-6 space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tightest">{title}</h1>
              {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
            </div>
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
