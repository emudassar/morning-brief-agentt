import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const goToFeatures = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <nav className="flex items-center gap-4">
      <button
        type="button"
        onClick={goToFeatures}
        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
      >
        Features
      </button>
      <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
        Pricing
      </Link>
      <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
        Dashboard
      </Link>
      <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
        Login
      </Link>
      <Link to="/register" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
        Register
      </Link>
    </nav>
  );
}
