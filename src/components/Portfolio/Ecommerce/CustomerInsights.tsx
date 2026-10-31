import { useState } from "react";
import { Award, Package, Receipt, Repeat, Search, Settings, Target, Users, UsersRound } from "lucide-react";
import { AreaChart, HBars, Legend } from "./charts";
import { DashboardShell, Kpi, Panel } from "./ui";

// Demo data — Customer analysis: who buys the most and who hasn't come back

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const activity = [
  { name: "Store Visits", color: "#38bdf8", values: [1400, 1250, 1500, 1300, 1700, 1950, 1850, 2000, 1800, 2100, 2300, 2500] },
  { name: "Orders", color: "#8b5cf6", values: [420, 390, 470, 430, 560, 640, 600, 690, 620, 720, 810, 900] },
];

const customers = [
  { name: "Northwind Traders", orders: 48, spent: 12840, days: 2 },
  { name: "Blue Harbor Co.", orders: 36, spent: 9620, days: 5 },
  { name: "Greenleaf Retail", orders: 31, spent: 8410, days: 9 },
  { name: "Summit Supplies", orders: 27, spent: 7150, days: 14 },
  { name: "Cedar & Co.", orders: 22, spent: 5980, days: 19 },
  { name: "Brightline Stores", orders: 18, spent: 4720, days: 26 },
  { name: "Oakridge Market", orders: 15, spent: 3890, days: 34 },
  { name: "Riverside Goods", orders: 11, spent: 2760, days: 47 },
];

const nav = [
  { icon: UsersRound, label: "Customers" },
  { icon: Receipt, label: "Transactions" },
  { icon: Target, label: "Segments" },
  { icon: Award, label: "Loyalty" },
  { icon: Settings, label: "Settings" },
];

// No purchase in 21+ days = "At risk" — send them an offer/email
const health = (days: number) =>
  days <= 7
    ? { label: "Active", cls: "bg-emerald-500/10 text-emerald-600" }
    : days <= 21
      ? { label: "Cooling", cls: "bg-amber-500/10 text-amber-600" }
      : { label: "At risk", cls: "bg-rose-500/10 text-rose-600" };

export const CustomerInsights = () => {
  const [query, setQuery] = useState("");
  const visible = customers.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <DashboardShell brand="CustomerIQ" nav={nav} active="Customers">
      <div className="grid grid-cols-1 @md:grid-cols-2 @4xl:grid-cols-4 gap-4">
        <Kpi icon={Users} label="Active Customers" value="2,184" change={9.2} color="#8b5cf6" />
        <Kpi icon={Receipt} label="Transactions" value="7,960" change={12.6} color="#38bdf8" />
        <Kpi icon={Package} label="Items Ordered" value="34.2k" change={7.9} color="#f59e0b" />
        <Kpi icon={Repeat} label="Repeat Purchase Rate" value="41%" change={3.4} color="#10b981" />
      </div>

      <div className="grid grid-cols-1 @4xl:grid-cols-3 gap-4">
        <Panel title="Store Visits vs Orders" action={<Legend series={activity} />} className="@4xl:col-span-2">
          <AreaChart labels={months} series={activity} height={260} />
        </Panel>
        <Panel title="Top Customers by Spend">
          <HBars
            data={customers.slice(0, 5).map((c) => ({ label: c.name, value: c.spent }))}
            color="#38bdf8"
            format={(v) => `$${v.toLocaleString()}`}
          />
        </Panel>
      </div>

      <Panel
        title="Customers & Last Purchase"
        action={
          <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/5 text-xs">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customer…"
              className="bg-transparent outline-none w-32"
            />
          </label>
        }
        className="overflow-x-auto"
      >
        <table className="w-full text-sm min-w-[520px]">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-foreground/10">
              <th className="py-2 font-medium">Customer</th>
              <th className="py-2 font-medium">Orders</th>
              <th className="py-2 font-medium">Total Spent</th>
              <th className="py-2 font-medium">Last Purchase</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((c) => {
              const h = health(c.days);
              return (
                <tr key={c.name} className="border-b border-foreground/5 last:border-0">
                  <td className="py-2.5 font-medium">{c.name}</td>
                  <td className="py-2.5 text-muted-foreground">{c.orders}</td>
                  <td className="py-2.5 tabular-nums">${c.spent.toLocaleString()}</td>
                  <td className="py-2.5 text-muted-foreground">{c.days} days ago</td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${h.cls}`}>{h.label}</span>
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted-foreground text-sm">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Panel>
    </DashboardShell>
  );
};

export default CustomerInsights;
