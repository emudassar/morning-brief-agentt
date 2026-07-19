import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MONTHLY_URL = import.meta.env.VITE_LEMONSQUEEZY_MONTHLY_URL;
const YEARLY_URL = import.meta.env.VITE_LEMONSQUEEZY_YEARLY_URL;

const sharedFeatures = [
  "Unlimited daily briefings",
  "Weather, News, Quote modules",
  "Telegram delivery",
  "Full briefing history",
  "Custom delivery time",
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="app-shell">
        <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 shadow-soft backdrop-blur-xl px-4 py-3 transition-all duration-300 sm:px-5">
            <Navbar />
          </div>
        </header>

        <div className="min-h-screen bg-slate-50 py-16 px-4">
          <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Simple pricing</h1>
          <p className="mt-3 text-slate-500 text-base max-w-md mx-auto">
            Start free for 7 days. Upgrade anytime. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Free Trial */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Get Started</span>
              <h2 className="mt-2 text-xl font-bold text-slate-900">Free Trial</h2>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">$0</p>
              <p className="text-sm text-slate-400 mt-1">7 days, no card needed</p>
            </div>
            <ul className="flex-1 space-y-2 text-sm text-slate-600 mb-6">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Daily briefings for 7 days</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Weather + News</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Telegram delivery</li>
              <li className="flex items-center gap-2"><span className="text-red-400">✗</span> 3 briefings/week after trial</li>
              <li className="flex items-center gap-2"><span className="text-red-400">✗</span> No custom modules</li>
              <li className="flex items-center gap-2"><span className="text-red-400">✗</span> No history</li>
            </ul>
            <button
              onClick={() => navigate("/register")}
              className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition"
            >
              Start Free Trial
            </button>
          </div>

          {/* Monthly — highlighted */}
          <div className="flex flex-col rounded-2xl border-2 border-amber-400 bg-amber-50 p-6 shadow-md relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-white shadow">
              Most Popular
            </span>
            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-500">Best for starters</span>
              <h2 className="mt-2 text-xl font-bold text-slate-900">Monthly</h2>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">$4.99</p>
              <p className="text-sm text-slate-500 mt-1">per month, cancel anytime</p>
            </div>
            <ul className="flex-1 space-y-2 text-sm text-slate-700 mb-6">
              {sharedFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="text-green-500">✓</span> {f}</li>
              ))}
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Priority support</li>
            </ul>
            <a
              href={MONTHLY_URL}
              className="w-full rounded-xl bg-amber-400 py-2.5 text-sm font-bold text-white text-center hover:bg-amber-500 transition block"
            >
              Get Monthly Access
            </a>
          </div>

          {/* Yearly */}
          <div className="flex flex-col rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-6 shadow-sm relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-white shadow">
              Best Value
            </span>
            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Save $20</span>
              <h2 className="mt-2 text-xl font-bold text-slate-900">Yearly</h2>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">$39.99</p>
              <p className="text-sm text-slate-500 mt-1">per year — $3.33/month</p>
            </div>
            <ul className="flex-1 space-y-2 text-sm text-slate-700 mb-6">
              {sharedFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="text-green-500">✓</span> {f}</li>
              ))}
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 2 months free vs monthly</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Price locked for life</li>
            </ul>
            <a
              href={YEARLY_URL}
              className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-white text-center hover:bg-emerald-600 transition block"
            >
              Get Yearly Access
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-slate-400">
          Payments secured by Lemon Squeezy · Cancel anytime · VAT handled automatically
        </p>

        {/* FAQ */}
        <div className="mt-10 mx-auto max-w-2xl space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 text-center">FAQ</h3>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <p className="font-medium text-slate-800">What happens after my trial?</p>
            <p className="mt-1 text-slate-500">You get 3 briefings per week on the free plan. Upgrade anytime to restore daily delivery.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <p className="font-medium text-slate-800">Can I cancel my subscription?</p>
            <p className="mt-1 text-slate-500">Yes, cancel anytime. You keep access until the end of your paid period.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <p className="font-medium text-slate-800">Is my payment secure?</p>
            <p className="mt-1 text-slate-500">Yes. Lemon Squeezy handles all payments and never shares your card data with us.</p>
          </div>
        </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
