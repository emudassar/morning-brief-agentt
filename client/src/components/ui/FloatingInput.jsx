import { Eye, EyeOff } from "lucide-react";
import { useMemo, useState } from "react";

export default function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = useMemo(() => {
    if (!isPassword) return type;
    return showPassword ? "text" : "password";
  }, [isPassword, type, showPassword]);

  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`peer w-full rounded-xl border bg-white/80 px-4 pb-2.5 pt-5 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-transparent hover:border-slate-300 focus:bg-white focus:ring-4 ${
            error
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/10"
              : "border-slate-200 focus:border-brand-500 focus:ring-brand-500/10"
          } ${isPassword ? "pr-12" : ""} ${className}`}
          {...props}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 px-1 text-sm text-slate-500 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-brand-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </label>
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} className="text-xs text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
