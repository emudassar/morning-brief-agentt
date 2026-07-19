// Short flat timezone list for the UI: labels are UTC-style only; values are IANA for the scheduler.
import moment from "moment-timezone";

/** Display like UTC+5, UTC-5, UTC+5:30, or UTC±0 (no place names). */
export function utcLabelOnly(iana) {
  const offsetMin = moment.tz(iana).utcOffset();
  if (offsetMin === 0) return "UTC±0";
  const sign = offsetMin > 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  const h = Math.floor(abs / 60);
  const mm = abs % 60;
  if (mm === 0) return `UTC${sign}${h}`;
  return `UTC${sign}${h}:${String(mm).padStart(2, "0")}`;
}

/** Canonical IANA per row; order is west → east. Pakistan is UTC+5 via Asia/Karachi. */
const SIMPLE_IANA_ORDER = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Pacific/Honolulu",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Bangkok",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

/** Fresh labels (DST-aware). Skips a row when its label matches a previous row (same offset). */
export function getTimezoneSelectOptions() {
  const out = [];
  const seenLabels = new Set();
  for (const value of SIMPLE_IANA_ORDER) {
    const label = utcLabelOnly(value);
    if (seenLabels.has(label)) continue;
    seenLabels.add(label);
    out.push({ value, label });
  }
  return out;
}

export function findTimezoneOption(value) {
  if (!value) return null;
  const opts = getTimezoneSelectOptions();
  const hit = opts.find((o) => o.value === value);
  if (hit) return hit;
  return { value, label: utcLabelOnly(value) };
}
