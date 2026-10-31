import { useState } from "react";
import { BarChart3, CreditCard, DollarSign, LineChart, PieChart, Settings, ShoppingBag, UserPlus, Wallet } from "lucide-react";
import { AreaChart, BarChart, Donut, HBars, Legend } from "./charts";
import { DashboardShell, Kpi, Panel, Tabs } from "./ui";

// Demo data — Sales analytics, all data updates when the period changes

const periods = ["7D", "30D", "12M"] as const;
type Period = (typeof periods)[number];

const data: Record<
  Period,
  {
    kpi: { total: string; net: string; customers: string; aov: string; change: [number, number, number, number] };
    labels: string[];
    gross: number[];
    net: number[];
    channels: number[];
  }
> = {
  "7D": {
    kpi: { total: "$24.6k", net: "$19.8k", customers: "142", aov: "$58", change: [6.2, 4.8, 11.3, -1.4] },
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    gross: [2900, 3100, 3300, 3600, 3400, 4300, 4000],
    net: [2300, 2500, 2700, 2900, 2700, 3500, 3200],
    channels: [11.2, 7.4, 3.6, 2.4],
  },
  "30D": {
    kpi: { total: "$107.3k", net: "$86.1k", customers: "584", aov: "$62", change: [9.6, 8.2, 14.9, 2.1] },
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    gross: [2900, 3200, 3100, 3500, 3400, 4100, 3900, 3300, 3200, 3600, 3800, 3700, 4400, 4200, 3500, 3400, 3700, 3900, 3800, 4600, 4500, 3600, 3500, 3800, 4000, 4100, 4900, 4700, 3900, 3800],
    net: [2300, 2600, 2500, 2800, 2700, 3300, 3100, 2600, 2600, 2900, 3000, 3000, 3500, 3400, 2800, 2700, 3000, 3100, 3000, 3700, 3600, 2900, 2800, 3000, 3200, 3300, 3900, 3800, 3100, 3000],
    channels: [48.3, 32.1, 16.8, 10.1],
  },
  "12M": {
    kpi: { total: "$1.24M", net: "$998k", customers: "6,920", aov: "$64", change: [21.4, 19.7, 26.2, 3.8] },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    gross: [78000, 82000, 91000, 88000, 96000, 102000, 98000, 105000, 110000, 118000, 132000, 141000],
    net: [62000, 66000, 73000, 71000, 77000, 82000, 79000, 84000, 89000, 95000, 106000, 114000],
    channels: [552, 381, 196, 111],
  },
};

const channelMeta = [
  { name: "Website", color: "#8b5cf6" },
  { name: "Mobile App", color: "#10b981" },
  { name: "Marketplace", color: "#f59e0b" },
  { name: "Social", color: "#38bdf8" },
];

const categories = [
  { label: "Apparel", value: 38400 },
  { label: "Footwear", value: 26100 },
  { label: "Accessories", value: 18700 },
  { label: "Bags", value: 12900 },
  { label: "Beauty", value: 11200 },
];

const nav = [
  { icon: LineChart, label: "Sales" },
  { icon: ShoppingBag, label: "Orders" },
  { icon: Wallet, label: "Refunds" },
  { icon: PieChart, label: "Channels" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export const SalesAnalytics = () => {
  const [period, setPeriod] = useState<Period>("30D");
  const d = data[period];
  const channels = channelMeta.map((c, i) => ({ ...c, value: d.channels[i] }));
  const totalChannels = d.channels.reduce((a, b) => a + b, 0);

  return (
    <DashboardShell brand="Salesboard" nav={nav} active="Sales">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">Sales Overview</h3>
          <p className="text-xs text-muted-foreground">All channels · compared with previous period</p>
        </div>
        <Tabs options={periods} value={period} onChange={setPeriod} />
      </div>

      <div className="grid grid-cols-1 @md:grid-cols-2 @4xl:grid-cols-4 gap-4">
        <Kpi icon={DollarSign} label="Total Sales" value={d.kpi.total} change={d.kpi.change[0]} color="#8b5cf6" />
        <Kpi icon={Wallet} label="Net Sales" value={d.kpi.net} change={d.kpi.change[1]} color="#10b981" />
        <Kpi icon={UserPlus} label="New Customers" value={d.kpi.customers} change={d.kpi.change[2]} color="#38bdf8" />
        <Kpi icon={CreditCard} label="Avg. Order Value" value={d.kpi.aov} change={d.kpi.change[3]} color="#f59e0b" />
      </div>

      <div className="grid grid-cols-1 @4xl:grid-cols-3 gap-4">
        <Panel title="Sales by Channel">
          <Donut data={channels} center={d.kpi.total} sub="total sales" />
          <div className="mt-4 space-y-2">
            {channels.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c.color }} />
                  {c.name}
                </span>
                <span className="text-muted-foreground tabular-nums">
                  ${c.value}k · {Math.round((c.value / totalChannels) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Gross vs Net Sales"
          action={<Legend series={[{ name: "Gross", color: "#8b5cf6" }, { name: "Net", color: "#10b981" }]} />}
          className="@4xl:col-span-2"
        >
          <AreaChart
            key={period}
            labels={d.labels}
            series={[
              { name: "Gross", color: "#8b5cf6", values: d.gross },
              { name: "Net", color: "#10b981", values: d.net },
            ]}
            height={280}
          />
        </Panel>
      </div>

      <div className="grid grid-cols-1 @4xl:grid-cols-3 gap-4">
        <Panel title="Daily Sales Breakdown" className="@4xl:col-span-2">
          <BarChart
            key={period}
            labels={d.labels}
            series={[
              { name: "Net", color: "#10b981", values: d.net },
              { name: "Fees & Refunds", color: "#c4b5fd", values: d.gross.map((g, i) => g - d.net[i]) },
            ]}
          />
        </Panel>
        <Panel title="Top Categories">
          <HBars data={categories} color="#8b5cf6" format={(v) => `$${(v / 1000).toFixed(1)}k`} />
        </Panel>
      </div>
    </DashboardShell>
  );
};

export default SalesAnalytics;
