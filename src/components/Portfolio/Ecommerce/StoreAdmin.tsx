import { useState } from "react";
import {
  BarChart3,
  Clock,
  DollarSign,
  Eye,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { AreaChart, BarChart, Legend } from "./charts";
import { DashboardShell, Kpi, Panel, Tabs } from "./ui";

// Demo data — store owner's admin panel

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const orderSeries = [
  { name: "Online", color: "#8b5cf6", values: [420, 580, 510, 660, 380, 490, 300, 520, 470, 600, 440, 710] },
  { name: "In-store", color: "#38bdf8", values: [180, 220, 150, 250, 120, 200, 100, 240, 180, 220, 160, 260] },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const revenueSeries = [{ name: "Revenue", color: "#10b981", values: [5200, 6100, 5800, 7400, 6900, 8800, 8100] }];

const topProducts = [
  { name: "Oversized Graphic Tee", sold: 842, revenue: 16840, stock: 82 },
  { name: "Cargo Joggers", sold: 615, revenue: 21525, stock: 46 },
  { name: "Classic Hoodie", sold: 498, revenue: 19920, stock: 18 },
  { name: "Canvas Sneakers", sold: 362, revenue: 18100, stock: 64 },
];

const statuses = ["All", "Paid", "Pending", "Shipped", "Refunded"] as const;
type Status = (typeof statuses)[number];

const orders: { id: string; customer: string; items: number; amount: number; status: Exclude<Status, "All"> }[] = [
  { id: "#ORD-1048", customer: "Ayesha Khan", items: 3, amount: 128, status: "Paid" },
  { id: "#ORD-1047", customer: "Bilal Ahmed", items: 1, amount: 45, status: "Pending" },
  { id: "#ORD-1046", customer: "Sara Malik", items: 2, amount: 89, status: "Shipped" },
  { id: "#ORD-1045", customer: "Usman Tariq", items: 5, amount: 214, status: "Paid" },
  { id: "#ORD-1044", customer: "Hina Raza", items: 1, amount: 39, status: "Refunded" },
  { id: "#ORD-1043", customer: "Daniel Brooks", items: 2, amount: 96, status: "Shipped" },
  { id: "#ORD-1042", customer: "Zara Sheikh", items: 4, amount: 172, status: "Pending" },
];

const statusStyle: Record<Exclude<Status, "All">, string> = {
  Paid: "bg-emerald-500/10 text-emerald-600",
  Pending: "bg-amber-500/10 text-amber-600",
  Shipped: "bg-sky-500/10 text-sky-600",
  Refunded: "bg-rose-500/10 text-rose-600",
};

const nav = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: Package, label: "Products" },
  { icon: Users, label: "Customers" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export const StoreAdmin = () => {
  const [status, setStatus] = useState<Status>("All");
  const visible = status === "All" ? orders : orders.filter((o) => o.status === status);

  return (
    <DashboardShell brand="ShopPanel" nav={nav} active="Dashboard">
      <div className="grid grid-cols-1 @md:grid-cols-2 @4xl:grid-cols-4 gap-4">
        <Kpi icon={ShoppingCart} label="Orders Today" value="1,284" change={12.4} color="#10b981" />
        <Kpi icon={Eye} label="Visitors Today" value="18,940" change={8.1} color="#f59e0b" />
        <Kpi icon={DollarSign} label="Revenue (Month)" value="$48,320" change={15.7} color="#8b5cf6" />
        <Kpi icon={Clock} label="Pending Orders" value="37" change={-4.2} color="#f43f5e" />
      </div>

      <div className="grid grid-cols-1 @4xl:grid-cols-3 gap-4">
        <Panel title="Order Summary" action={<Legend series={orderSeries} />} className="@4xl:col-span-2">
          <BarChart labels={months} series={orderSeries} />
        </Panel>
        <Panel title="Revenue This Week">
          <p className="text-2xl font-bold tabular-nums">$48.3k</p>
          <p className="text-xs text-emerald-500 mb-2">▲ 15.7% vs last week</p>
          <AreaChart labels={weekDays} series={revenueSeries} height={240} />
        </Panel>
      </div>

      <div className="grid grid-cols-1 @4xl:grid-cols-3 gap-4">
        <Panel title="Top Products">
          <div className="space-y-4">
            {topProducts.map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-foreground/5 grid place-items-center shrink-0">
                  <Package className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.sold} sold · ${p.revenue.toLocaleString()}
                  </p>
                </div>
                <span className={`text-xs font-medium ${p.stock < 25 ? "text-rose-500" : "text-muted-foreground"}`}>
                  {p.stock} in stock
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Recent Orders"
          action={<Tabs options={statuses} value={status} onChange={setStatus} />}
          className="@4xl:col-span-2 overflow-x-auto"
        >
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-foreground/10">
                <th className="py-2 font-medium">Order</th>
                <th className="py-2 font-medium">Customer</th>
                <th className="py-2 font-medium">Items</th>
                <th className="py-2 font-medium">Amount</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((o) => (
                <tr key={o.id} className="border-b border-foreground/5 last:border-0">
                  <td className="py-2.5 font-medium">{o.id}</td>
                  <td className="py-2.5">{o.customer}</td>
                  <td className="py-2.5 text-muted-foreground">{o.items}</td>
                  <td className="py-2.5 tabular-nums">${o.amount}</td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[o.status]}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </DashboardShell>
  );
};

export default StoreAdmin;
