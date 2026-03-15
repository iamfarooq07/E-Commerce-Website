import { useEffect, useState } from "react";
import { fetchAdminStats, fetchAdminOrders } from "../../services/api";

const STATUS_COLORS = {
  pending: "bg-gray-500",
  confirmed: "bg-yellow-500",
  preparing: "bg-blue-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchAdminStats(), fetchAdminOrders()])
      .then(([s, o]) => { setStats(s); setOrders(o); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-gray-400">Loading analytics...</div>;
  if (error) return <div className="p-6 text-red-400">{error}</div>;

  // Status breakdown
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  // Revenue by category from orders
  const categoryRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .flatMap((o) => o.items || [])
    .reduce((acc, item) => {
      const cat = item.foodItem?.category || "other";
      acc[cat] = (acc[cat] || 0) + item.price * item.quantity;
      return acc;
    }, {});

  const maxRevenue = Math.max(...Object.values(categoryRevenue), 1);

  // Weekly chart max
  const maxSales = Math.max(...(stats?.chartData?.map((d) => d.sales) || [1]), 1);

  return (
    <div className="p-6 space-y-6 bg-black min-h-screen text-white">
      <h2 className="text-2xl font-semibold">Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: `PKR ${stats?.totalRevenue?.toLocaleString() ?? 0}` },
          { label: "Total Orders", value: stats?.totalOrders ?? 0 },
          { label: "Total Users", value: stats?.totalUsers ?? 0 },
          { label: "Total Products", value: stats?.totalFoodItems ?? 0 },
        ].map((card) => (
          <div key={card.label} className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-xs">{card.label}</p>
            <p className="text-2xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Weekly Sales Chart */}
      {stats?.chartData?.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Sales (Last 7 Days)</h3>
          <div className="flex items-end gap-3 h-40">
            {stats.chartData.map((day) => (
              <div key={day.name} className="flex flex-col items-center flex-1 gap-1">
                <span className="text-xs text-gray-400">PKR {day.sales?.toLocaleString()}</span>
                <div
                  className="w-full bg-blue-600 rounded-t"
                  style={{ height: `${Math.max((day.sales / maxSales) * 120, 4)}px` }}
                />
                <span className="text-xs text-gray-400">{day.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Status Breakdown */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Order Status Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${STATUS_COLORS[status] || "bg-gray-500"}`} />
                <span className="capitalize text-sm flex-1">{status}</span>
                <span className="text-sm font-semibold">{count}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${STATUS_COLORS[status] || "bg-gray-500"}`}
                    style={{ width: `${(count / orders.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {Object.keys(statusCounts).length === 0 && (
              <p className="text-gray-400 text-sm">No orders yet</p>
            )}
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
          <div className="space-y-3">
            {Object.entries(categoryRevenue)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, rev]) => (
                <div key={cat} className="flex items-center gap-3">
                  <span className="capitalize text-sm flex-1">{cat}</span>
                  <span className="text-sm font-semibold">PKR {rev.toLocaleString()}</span>
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${(rev / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            {Object.keys(categoryRevenue).length === 0 && (
              <p className="text-gray-400 text-sm">No revenue data yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
