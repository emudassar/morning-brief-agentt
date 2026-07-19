import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import { findTimezoneOption, getTimezoneSelectOptions } from "../constants/timezones";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import AuthShell from "../components/AuthShell";
import Button from "../components/ui/Button";
import FloatingInput from "../components/ui/FloatingInput";

const COUNTRIES = [
  { code: "us", label: "United States" },
  { code: "gb", label: "United Kingdom" },
  { code: "ca", label: "Canada" },
  { code: "au", label: "Australia" },
  { code: "de", label: "Germany" },
  { code: "fr", label: "France" },
  { code: "pk", label: "Pakistan" },
  { code: "in", label: "India" },
  { code: "ae", label: "United Arab Emirates" },
  { code: "sa", label: "Saudi Arabia" },
  { code: "ng", label: "Nigeria" },
  { code: "za", label: "South Africa" },
  { code: "br", label: "Brazil" },
  { code: "mx", label: "Mexico" },
  { code: "jp", label: "Japan" },
  { code: "kr", label: "South Korea" },
  { code: "sg", label: "Singapore" },
  { code: "nl", label: "Netherlands" },
  { code: "se", label: "Sweden" },
  { code: "no", label: "Norway" },
];

const selectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "0.75rem",
    borderColor: "#e2e8f0",
    minHeight: "44px",
    boxShadow: "none",
    transition: "all 0.2s ease",
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

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("us");
  const [timezone, setTimezone] = useState(() => findTimezoneOption("UTC"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const timezoneOptions = useMemo(() => getTimezoneSelectOptions(), []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/api/auth/register", {
        email,
        password,
        city,
        country,
        timezone: timezone?.value ?? "UTC",
      });
      login(data.token, { userId: data.userId, email: data.email });
      toast.success("Account created");
      navigate("/connect-telegram");
    } catch (err) {
      const msg =
        err.response?.data?.error ?? err.message ?? "Registration failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create your BriefAI account"
      subtitle={
        <>
          Already registered?{" "}
          <Link to="/login" className="link-brand">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        ) : null}
        <FloatingInput
          id="email"
          type="email"
          autoComplete="email"
          required
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FloatingInput
          id="password"
          type="password"
          autoComplete="new-password"
          required
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FloatingInput
          id="city"
          type="text"
          required
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
          <div className="space-y-2">
            <label htmlFor="country" className="block text-sm font-medium text-slate-700">
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition duration-200 hover:border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Timezone</label>
            <Select
              options={timezoneOptions}
              value={timezone}
              onChange={(v) => v && setTimezone(v)}
              styles={selectStyles}
              isSearchable
              placeholder="Select timezone"
            />
          </div>
        <Button type="submit" loading={loading} className="w-full" size="lg">
          {loading ? "Creating account..." : "Continue"}
        </Button>
      </form>
    </AuthShell>
  );
}
