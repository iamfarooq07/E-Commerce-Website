import React, { useState, useEffect } from "react";
import logo from "../../component/logo.png";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";
import { fetchAdminStats } from "../../services/api";
import { useEcommerceAuth } from "../../contexts/EcommerceAuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useEcommerceAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSubRoute = location.pathname !== "/dashboard";

  useEffect(() => {
    fetchAdminStats()
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { id: 1, title: "Users", value: stats.totalUsers?.toLocaleString() ?? "—", delta: "" },
        { id: 2, title: "Sales", value: stats.totalOrders?.toLocaleString() ?? "—", delta: "" },
        { id: 3, title: "Revenue", value: `PKR ${stats.totalRevenue?.toLocaleString() ?? "—"}`, delta: "" },
        { id: 4, title: "Products", value: stats.totalFoodItems?.toLocaleString() ?? "—", delta: "" },
      ]
    : [
        { id: 1, title: "Users", value: "—", delta: "" },
        { id: 2, title: "Sales", value: "—", delta: "" },
        { id: 3, title: "Revenue", value: "—", delta: "" },
        { id: 4, title: "Products", value: "—", delta: "" },
      ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 border-r border-gray-700 min-h-screen transition-all duration-300 flex-shrink-0`}
      >
        <div className="px-4 py-6 flex items-center justify-between">
          <div className={`${sidebarOpen ? "block" : "hidden"}`}>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 rounded-full bg-white my-5 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">Snackify Pizza</h3>
                <p className="text-xs text-gray-200">Admin Dashboard</p>
              </div>
            </div>
          </div>
          <button
            className="p-2 rounded hover:bg-gray-600"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="mt-6 px-2 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-600 transition">
            <span className="w-6 h-6 flex items-center justify-center"><DashboardIcon /></span>
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>Dashboard</span>
          </Link>
          <Link to="/dashboard/product" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-600 transition">
            <span className="w-6 h-6 flex items-center justify-center"><BoxIcon /></span>
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>Products</span>
          </Link>
          <Link to="/dashboard/orders" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-600 transition">
            <span className="w-6 h-6 flex items-center justify-center"><OrdersIcon /></span>
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>Orders</span>
          </Link>
          <Link to="/dashboard/customers" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-600 transition">
            <span className="w-6 h-6 flex items-center justify-center"><UsersIcon /></span>
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>Customers</span>
          </Link>
          <Link to="/dashboard/analytics" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-600 transition">
            <span className="w-6 h-6 flex items-center justify-center"><ChartIcon /></span>
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>Analytics</span>
          </Link>
          <Link to="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-600 transition">
            <span className="w-6 h-6 flex items-center justify-center"><CogIcon /></span>
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>Settings</span>
          </Link>
          <Link to="/dashboard/calendar" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-600 transition">
            <span className="w-6 h-6 flex items-center justify-center"><Calendar className="h-5 w-5" /></span>
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>Calendar</span>
          </Link>
        </nav>

        <div className={`${sidebarOpen ? "block" : "hidden"} mt-auto p-4`}>
          <button
            onClick={logout}
            className="w-full text-sm px-3 py-2 rounded-md border border-gray-500 hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {isSubRoute ? (
          <Outlet />
        ) : (
          <>
            {/* Topbar */}
            <div className="flex justify-between items-center w-full px-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                  {user?.name?.charAt(0) ?? "A"}
                </div>
                <div className="hidden sm:block text-sm">
                  <div className="font-medium">{user?.name ?? "Admin"}</div>
                  <div className="text-xs text-gray-400 capitalize">{user?.role ?? "admin"}</div>
                </div>
              </div>
              <button
                onClick={() => navigate("/products")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                Go Products
              </button>
            </div>

            {/* Stats */}
            {loading ? (
              <div className="text-gray-400 text-sm px-4">Loading stats...</div>
            ) : error ? (
              <div className="text-red-400 text-sm px-4">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((s) => (
                  <div key={s.id} className="bg-gray-800 p-4 rounded-2xl border border-gray-700 shadow-sm transform transition hover:-translate-y-1">
                    <div className="text-sm text-gray-400">{s.title}</div>
                    <div className="mt-2 flex items-baseline justify-between gap-3">
                      <div className="text-2xl font-bold">{s.value}</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">Live from database</div>
                  </div>
                ))}
              </div>
            )}

            {/* Chart + Weekly Sales */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2 bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Weekly Sales</h4>
                  <div className="text-sm text-gray-400">Last 7 days</div>
                </div>
                {stats?.chartData?.length > 0 ? (
                  <div className="mt-4 flex items-end gap-2 h-40">
                    {stats.chartData.map((d) => {
                      const max = Math.max(...stats.chartData.map((x) => x.sales), 1);
                      const pct = Math.round((d.sales / max) * 100);
                      return (
                        <div key={d.name} className="flex flex-col items-center flex-1 gap-1">
                          <div className="text-xs text-gray-400">${d.sales}</div>
                          <div
                            className="w-full bg-blue-600 rounded-t"
                            style={{ height: `${pct}%`, minHeight: "4px" }}
                          />
                          <div className="text-xs text-gray-400">{d.name}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="w-full h-40 mt-4 bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center">
                    <div className="text-sm text-gray-400">No sales data yet</div>
                  </div>
                )}
              </div>

              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-sm">
                <h4 className="text-lg font-semibold">Quick Stats</h4>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Revenue</span>
                    <span className="font-semibold">PKR {stats?.totalRevenue?.toLocaleString() ?? "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Orders</span>
                    <span className="font-semibold">{stats?.totalOrders ?? "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Users</span>
                    <span className="font-semibold">{stats?.totalUsers ?? "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Products</span>
                    <span className="font-semibold">{stats?.totalFoodItems ?? "—"}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function DashboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM3 14h7v7H3v-7zM14 14h7v7h-7v-7z" />
    </svg>
  );
}
function BoxIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7l9-4 9 4-9 4-9-4z" />
    </svg>
  );
}
function OrdersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v6H3V3zM3 13h18v8H3v-8z" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3v18M21 3v10M1 21h20" />
    </svg>
  );
}
function CogIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
