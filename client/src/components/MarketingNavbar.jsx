import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";
import Button from "./ui/Button";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Login", to: "/login" },
];

export default function MarketingNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-slate-200/80 bg-white/80 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-white/40 backdrop-blur-md"
        }`}
      >
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 rounded-lg focus-visible:ring-2 focus-visible:ring-brand-500/30"
        >
          <div className="rounded-xl bg-brand-gradient p-2 text-white shadow-premium">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-900">Morning Briefing Agent</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className="rounded-md px-1 text-sm text-slate-600 transition-colors hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-brand-500/30">
            Features
          </a>
          <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Pricing</Link>
          <Link to="/login" className="rounded-md px-1 text-sm text-slate-600 transition-colors hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-brand-500/30">
            Login
          </Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        className={`mx-auto w-full max-w-6xl overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-2 space-y-2 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-soft backdrop-blur-xl">
          {navItems.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {item.label}
              </a>
            )
          )}
          <Link to="/register" onClick={() => setOpen(false)} className="block">
            <Button className="w-full">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
