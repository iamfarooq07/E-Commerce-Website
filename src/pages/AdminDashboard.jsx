import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  ShoppingCart,
  DollarSign,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const stats = [
  { title: "Users", value: 1240, icon: Users },
  { title: "Orders", value: 320, icon: ShoppingCart },
  { title: "Revenue", value: "$12,400", icon: DollarSign },
];

const chartData = [
  { name: "Mon", sales: 400 },
  { name: "Tue", sales: 300 },
  { name: "Wed", sales: 500 },
  { name: "Thu", sales: 200 },
  { name: "Fri", sales: 600 },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 shadow-lg p-5">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="space-y-3">
          {["Dashboard", "Users", "Orders", "Settings"].map((item) => (
            <Button
              key={item}
              variant={active === item ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActive(item)}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" /> {item}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="rounded-2xl shadow bg-gray-800 border border-gray-800"
            >
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-white text-2xl font-extrabold">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-2 text-gray-400">
                    {stat.value}
                  </h3>
                </div>
                <stat.icon className="h-10 w-10 text-gray-400" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart */}
        <Card className="rounded-2xl shadow-lg bg-gray-800 border border-gray-800">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Weekly Sales
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #1f2937",
                    color: "#ffffff",
                  }}
                  cursor={{ fill: "#1f2937" }}
                />
                <Bar dataKey="sales" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
