export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none";

  const variants = {
    primary: "bg-brand-gradient text-white shadow-premium hover:scale-[1.01] hover:brightness-105 active:scale-[0.99]",
    secondary:
      "border border-slate-200 bg-white text-slate-700 shadow-soft hover:scale-[1.01] hover:border-slate-300 hover:bg-slate-50",
    ghost: "text-slate-600 hover:scale-[1.01] hover:bg-slate-100 hover:text-slate-900",
    danger: "bg-rose-600 text-white shadow-soft hover:scale-[1.01] hover:bg-rose-700",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      )}
      {children}
    </button>
  );
}
