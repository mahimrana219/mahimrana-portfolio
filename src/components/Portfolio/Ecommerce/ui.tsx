import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Bell, Search } from "lucide-react";

// Shared dashboard parts: shell (sidebar + topbar), KPI card, panel, tabs.
// Uses @container queries so the desktop layout renders correctly in both the thumbnail and full view.

export const DashboardShell = ({
  brand,
  nav,
  active,
  children,
}: {
  brand: string;
  nav: { icon: LucideIcon; label: string }[];
  active: string;
  children: ReactNode;
}) => (
  <div className="@container w-full min-h-full flex bg-background text-foreground">
    <aside className="hidden @4xl:flex w-56 shrink-0 flex-col gap-1 p-4 border-r border-foreground/10 bg-card">
      <div className="flex items-center gap-2 px-2 mb-6 font-bold">
        <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground grid place-items-center text-sm">
          {brand[0]}
        </span>
        {brand}
      </div>
      {nav.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
            label === active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </div>
      ))}
    </aside>
    <div className="flex-1 min-w-0 flex flex-col">
      <header className="flex items-center gap-3 px-5 py-3 border-b border-foreground/10 bg-card">
        <div className="flex-1 max-w-xs flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/5 text-sm text-muted-foreground">
          <Search className="w-4 h-4" /> Search…
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-pink-400" />
        </div>
      </header>
      <main className="flex-1 p-4 @2xl:p-6 space-y-4">{children}</main>
    </div>
  </div>
);

export const Kpi = ({
  icon: Icon,
  label,
  value,
  change,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: number;
  color: string;
}) => (
  <div className="rounded-2xl bg-card border border-foreground/10 p-4 flex items-center justify-between gap-3">
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold mt-1 tabular-nums">{value}</p>
      {change !== undefined && (
        <p className={`text-xs mt-1 ${change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
          {change >= 0 ? "▲" : "▼"} {Math.abs(change)}% vs last period
        </p>
      )}
    </div>
    <div className="w-11 h-11 rounded-full grid place-items-center text-white shrink-0" style={{ background: color }}>
      <Icon className="w-5 h-5" />
    </div>
  </div>
);

export const Panel = ({
  title,
  action,
  className = "",
  children,
}: {
  title: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) => (
  <div className={`rounded-2xl bg-card border border-foreground/10 p-4 min-w-0 ${className}`}>
    <div className="flex items-center justify-between gap-2 mb-3">
      <h4 className="font-semibold text-sm">{title}</h4>
      {action}
    </div>
    {children}
  </div>
);

export const Tabs = <T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) => (
  <div className="inline-flex p-0.5 rounded-lg bg-foreground/5">
    {options.map((o) => (
      <button
        key={o}
        onClick={() => onChange(o)}
        className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
          value === o ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
        }`}
      >
        {o}
      </button>
    ))}
  </div>
);
