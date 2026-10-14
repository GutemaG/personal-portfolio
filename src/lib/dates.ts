// Helpers for "YYYY-MM" dates in src/content. Parsed by hand so the time zone never shifts a month.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parts(ym: string): [number, number] {
  const [y, m] = ym.split("-").map(Number);
  return [y, m];
}

function now(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function formatMonth(ym: string): string {
  const [y, m] = parts(ym);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatRange(start: string, end?: string): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}

// Counts both the first and last month, the way LinkedIn does ("Apr 2023 – Jul 2026" = 3 yrs 4 mos).
export function duration(start: string, end?: string): string {
  const [y1, m1] = parts(start);
  const [y2, m2] = parts(end ?? now());
  const total = (y2 - y1) * 12 + (m2 - m1) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const out = [];
  if (years) out.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months) out.push(`${months} mo${months > 1 ? "s" : ""}`);
  return out.join(" ");
}
