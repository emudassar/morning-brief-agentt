import { Link } from "react-router-dom";

export default function Footer() {
  const openSupportEmail = () => {
    window.location.href = "mailto:contacmudassar@gmail.com?subject=Morning%20Briefing%20Support";
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-slate-900 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Link
              to="/"
              onClick={scrollTop}
              className="inline-block text-xl font-semibold text-white transition hover:text-slate-200"
            >
              Morning Briefing 🌅
            </Link>
            <p className="mt-3 text-sm text-slate-300">
              Your AI-powered morning briefing, delivered to Telegram every day.
            </p>
            <p className="mt-3 text-sm text-slate-400">Delivered via Telegram</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Product</h4>
            <nav className="mt-4 space-y-2">
              <Link to="/" onClick={scrollTop} className="block text-sm text-slate-400 transition hover:text-white">
                Home
              </Link>
              <Link
                to="/pricing"
                onClick={scrollTop}
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Pricing
              </Link>
              <Link
                to="/register"
                onClick={scrollTop}
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Register
              </Link>
              <Link
                to="/login"
                onClick={scrollTop}
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Login
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Support</h4>
            <p className="mt-4 text-sm text-slate-300">Questions or feedback?</p>
            <a
              href="mailto:contacmudassar@gmail.com"
              onClick={(e) => {
                e.preventDefault();
                openSupportEmail();
              }}
              className="mt-3 inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Contact Support
            </a>
            <p className="mt-3 text-xs text-slate-400">Payments by Lemon Squeezy</p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-5">
          <div className="flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Morning Briefing. All rights reserved.</p>
            <p>Made with ☕ for busy people</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
