export default function Card({ children, className = "" }) {
  return <div className={`card-premium hover:translate-y-[-1px] hover:shadow-md ${className}`}>{children}</div>;
}
