import { useId } from "react";
import { motion } from "framer-motion";

// Lightweight, dependency-free SVG charts for the dashboards

export interface Series {
  name: string;
  color: string;
  values: number[];
}

const niceMax = (v: number) => {
  const p = Math.pow(10, Math.floor(Math.log10(v || 1)));
  return Math.ceil(v / p) * p;
};

const short = (v: number) => (v >= 1000 ? `${+(v / 1000).toFixed(1)}k` : `${Math.round(v)}`);

const W = 640;
const L = 40;
const R = 8;
const T = 10;
const B = 26;

const Grid = ({ max, height }: { max: number; height: number }) => {
  const ih = height - T - B;
  return (
    <>
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <g key={f}>
          <line x1={L} x2={W - R} y1={T + ih * (1 - f)} y2={T + ih * (1 - f)} className="stroke-foreground/10" />
          <text x={L - 8} y={T + ih * (1 - f) + 4} textAnchor="end" className="fill-muted-foreground text-[11px]">
            {short(max * f)}
          </text>
        </g>
      ))}
    </>
  );
};

export const Legend = ({ series }: { series: { name: string; color: string }[] }) => (
  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
    {series.map((s) => (
      <span key={s.name} className="inline-flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
        {s.name}
      </span>
    ))}
  </div>
);

// Stacked bar chart
export const BarChart = ({ labels, series, height = 220 }: { labels: string[]; series: Series[]; height?: number }) => {
  const ih = height - T - B;
  const iw = W - L - R;
  const max = niceMax(Math.max(...labels.map((_, i) => series.reduce((s, se) => s + se.values[i], 0))));
  const slot = iw / labels.length;
  const bw = Math.min(26, slot * 0.55);
  const step = Math.ceil(labels.length / 12);

  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full h-auto">
      <Grid max={max} height={height} />
      {labels.map((label, i) => {
        const x = L + slot * i + (slot - bw) / 2;
        let top = T + ih;
        return (
          <g key={label}>
            {series.map((se) => {
              const h = (se.values[i] / max) * ih;
              top -= h;
              return (
                <motion.rect
                  key={se.name}
                  x={x}
                  y={top}
                  width={bw}
                  height={h}
                  rx={3}
                  fill={se.color}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.03 }}
                  style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
                />
              );
            })}
            {i % step === 0 && (
              <text x={x + bw / 2} y={height - 8} textAnchor="middle" className="fill-muted-foreground text-[11px]">
                {label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// Line + gradient area chart (one or more series)
export const AreaChart = ({ labels, series, height = 220 }: { labels: string[]; series: Series[]; height?: number }) => {
  const uid = useId().replace(/:/g, "");
  const ih = height - T - B;
  const iw = W - L - R;
  const max = niceMax(Math.max(...series.flatMap((s) => s.values)));
  const px = (i: number) => L + (iw * i) / (labels.length - 1);
  const py = (v: number) => T + ih - (v / max) * ih;
  const step = Math.ceil(labels.length / 12);

  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full h-auto">
      <defs>
        {series.map((s, si) => (
          <linearGradient key={s.name} id={`${uid}-${si}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={s.color} stopOpacity={0} />
          </linearGradient>
        ))}
      </defs>
      <Grid max={max} height={height} />
      {series.map((s, si) => {
        const line = s.values.map((v, i) => `${i ? "L" : "M"}${px(i)},${py(v)}`).join(" ");
        const area = `${line} L${px(s.values.length - 1)},${T + ih} L${px(0)},${T + ih} Z`;
        return (
          <g key={s.name}>
            <motion.path d={area} fill={`url(#${uid}-${si})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
            <motion.path
              d={line}
              fill="none"
              stroke={s.color}
              strokeWidth={2.5}
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </g>
        );
      })}
      {labels.map((label, i) =>
        i % step === 0 ? (
          <text key={label} x={px(i)} y={height - 8} textAnchor="middle" className="fill-muted-foreground text-[11px]">
            {label}
          </text>
        ) : null
      )}
    </svg>
  );
};

// Donut chart with the total in the middle
export const Donut = ({
  data,
  center,
  sub,
}: {
  data: { name: string; color: string; value: number }[];
  center: string;
  sub: string;
}) => {
  const r = 70;
  const C = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0);
  let offset = 0;

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[220px] h-auto mx-auto">
      <circle cx={100} cy={100} r={r} fill="none" strokeWidth={22} className="stroke-foreground/5" />
      {data.map((d, i) => {
        const len = (d.value / total) * C;
        const el = (
          <motion.circle
            key={d.name}
            cx={100}
            cy={100}
            r={r}
            fill="none"
            stroke={d.color}
            strokeWidth={22}
            strokeDasharray={`${Math.max(len - 2, 0)} ${C}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 100 100)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.12 }}
          />
        );
        offset += len;
        return el;
      })}
      <text x={100} y={98} textAnchor="middle" className="fill-foreground text-[24px] font-bold">
        {center}
      </text>
      <text x={100} y={118} textAnchor="middle" className="fill-muted-foreground text-[11px]">
        {sub}
      </text>
    </svg>
  );
};

// Horizontal bars (for rankings)
export const HBars = ({
  data,
  color,
  format = short,
}: {
  data: { label: string; value: number }[];
  color: string;
  format?: (v: number) => string;
}) => {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={d.label}>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium truncate">{d.label}</span>
            <span className="text-muted-foreground tabular-nums">{format(d.value)}</span>
          </div>
          <div className="h-2 rounded-full bg-foreground/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: color }}
              initial={{ width: 0 }}
              animate={{ width: `${(d.value / max) * 100}%` }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
