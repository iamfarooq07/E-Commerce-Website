import React, { useState } from "react";
import logo from "../../component/logo.png";
import { Link } from "react-router-dom";

// Single-file React + Tailwind dashboard component
// No external libraries required — only React and Tailwind CSS.

const stats = [
  { id: 1, title: "Users", value: "12,430", delta: "+4.2%" },
  { id: 2, title: "Sales", value: "8,712", delta: "+1.1%" },
  { id: 3, title: "Revenue", value: "PKR 1.24M", delta: "-0.5%" },
  { id: 4, title: "Orders", value: "1,094", delta: "+6.8%" },
];

const tableData = [
  {
    id: 1,
    name: "Ayaan Shoes",
    category: "Running",
    price: "PKR 12,000",
    status: "Active",
  },
  {
    id: 2,
    name: "Luna Sneakers",
    category: "Casual",
    price: "PKR 8,500",
    status: "Low",
  },
  {
    id: 3,
    name: "Pro Runner",
    category: "Sports",
    price: "PKR 15,200",
    status: "Active",
  },
  {
    id: 4,
    name: "Comfy Step",
    category: "Formal",
    price: "PKR 9,300",
    status: "Sold",
  },
];

function Sparkline({ data = [], width = 120, height = 28 }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const len = data.length;
  const points = data
    .map((d, i) => {
      const x = (i / (len - 1)) * width;
      const y =
        max === min ? height / 2 : height - ((d - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="inline-block"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="text-indigo-500"
      />
    </svg>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("All");

  const filtered = tableData.filter(
    (t) =>
      selected === "All" ||
      t.category === selected ||
      t.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } bg-gray-800 border-r border-gray-200 min-h-screen transition-all duration-300`}
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
                  <p className="text-xs text-gray-200">Admin Dashborad</p>
                </div>
              </div>
            </div>
            <button
              className="p-2 rounded hover:bg-gray-100 hover:text-gray-800"
              onClick={() => setSidebarOpen((s) => !s)}
              aria-label="Toggle sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* --- */}
          <nav className="mt-6 px-2 space-y-1">
            <Link
              to="/dashboard/product"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-200 hover:text-gray-800 transition"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <BoxIcon />
              </span>
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                Products
              </span>
            </Link>

            <Link
              to="/dashboard/orders"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-200 hover:text-gray-800 transition"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <OrdersIcon />
              </span>
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                Orders
              </span>
            </Link>

            <Link
              to="/dashboard/customers"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-200 hover:text-gray-800 transition"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <UsersIcon />
              </span>
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                Customers
              </span>
            </Link>

            <Link
              to="/dashboard/analytics"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-200 hover:text-gray-800 transition"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <ChartIcon />
              </span>
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                Analytics
              </span>
            </Link>

            <Link
              to="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:bg-gray-200 hover:text-gray-800 transition"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <CogIcon />
              </span>
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                Settings
              </span>
            </Link>
          </nav>

          {/* --- */}

          <div className={`${sidebarOpen ? "block" : "hidden"}`}>
            <div className="mt-auto p-4">
              <button className="w-full text-sm px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 hover:text-gray-800">
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Topbar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-gray-800 text-sm shadow-sm focus:outline-none"
                />
                <svg
                  className="w-4 h-4 absolute left-3 top-2.5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                  />
                </svg>
              </div>

              <div className="hidden md:flex items-center gap-3 text-sm text-gray-600">
                <button className="px-3 py-2 rounded-md text-white hover:bg-gray-300 hover:text-gray-800">
                  Calendar
                </button>
                <button className="px-3 py-2 rounded-md text-white hover:bg-gray-300 hover:text-gray-800">
                  Reports
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100 hover:text-gray-800">
                <BellIcon />
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="https://www.shutterstock.com/image-vector/flat-vector-smiling-boy-headphones-600nw-2606713523.jpg"
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden sm:block text-sm">
                  <div className="font-medium">Muhammad Farooq</div>
                  <div className="text-xs text-gray-200">Admin</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {stats.map((s) => (
              <div
                key={s.id}
                className="bg-gray-800 p-4 rounded-2xl border border-gray-100 shadow-sm transform transition hover:-translate-y-1"
              >
                <div className="text-sm text-gray-200">{s.title}</div>
                <div className="mt-2 flex items-baseline justify-between gap-3">
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div
                    className={`text-sm ${
                      s.delta.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {s.delta}
                  </div>
                </div>
                <div className="text-xs text-gray-200 mt-2 flex items-center gap-2">
                  {/* <Sparkline data={sales.slice(8)} /> */}
                  <span>Compared to last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main grid: chart (SVG) + recent orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Sales Overview</h4>
                <div className="text-sm text-gray-200">Last 12 months</div>
              </div>

              <div className="w-full h-64 mt-4 flex items-center">
                {/* Simple large sparkline + labels without chart library */}
                <div className="flex-1">
                  <div className="w-full h-48 bg-gray-900 rounded-lg border border-gray-100 flex items-center justify-center">
                    <div className="text-sm text-gray-200">
                      Business growth chart
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-200">
                    <div>Jan</div>
                    <div>Mar</div>
                    <div>May</div>
                    <div>Jul</div>
                    <div>Sep</div>
                    <div>Nov</div>
                  </div>
                </div>

                <div className="w-40 pl-6 hidden lg:block">
                  <div className="text-xs text-gray-200">Total</div>
                  <div className="text-2xl font-bold mt-1">PKR 1.24M</div>
                  <div className="mt-4 text-xs text-gray-200">
                    Avg order value
                  </div>
                  <div className="font-medium">PKR 1,200</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-lg font-semibold">Recent Orders</h4>
              <div className="mt-4 divide-y">
                {tableData.map((row) => (
                  <div
                    key={row.id}
                    className="py-3 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{row.name}</div>
                      <div className="text-xs text-gray-400">
                        {row.category} • {row.price}
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        row.status === "Active"
                          ? "text-green-600"
                          : row.status === "Low"
                          ? "text-yellow-600"
                          : "text-gray-200"
                      }`}
                    >
                      {row.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table and activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-2xl border border-gray-100 shadow-sm overflow-auto">
              <h4 className="text-xl font-bold">Products</h4>
              <div className="mt-4 mb-2 flex items-center gap-3">
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="text-sm rounded-md border px-3 py-2"
                >
                  <option className="text-gray-800">All</option>
                  <option className="text-gray-800">Running</option>
                  <option className="text-gray-800">Casual</option>
                  <option className="text-gray-800">Sports</option>
                  <option className="text-gray-800">Formal</option>
                </select>
                <div className="text-xs text-gray-200">
                  Showing {filtered.length} results
                </div>
              </div>

              <table className="min-w-full mt-2 text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b">
                    <th className="py-2 px-2">Product</th>
                    <th className="py-2 px-2">Category</th>
                    <th className="py-2 px-2">Price</th>
                    <th className="py-2 px-2">Status</th>
                    <th className="py-2 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-gray-600">
                      <td className="py-3 px-2">{r.name}</td>
                      <td className="py-3 px-2">{r.category}</td>
                      <td className="py-3 px-2">{r.price}</td>
                      <td className="py-3 px-2">{r.status}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <button className="text-xs px-2 py-1 rounded bg-green-500 text-black">
                            Edit
                          </button>
                          <button className="text-xs px-2 py-1 rounded bg-red-500 text-white">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-lg font-semibold">Activity</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-2.5" />
                  <div>
                    <div className="font-medium">Order #2334 completed</div>
                    <div className="text-xs text-gray-200">2 hours ago</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 mt-2.5" />
                  <div>
                    <div className="font-medium">Stock low: Luna Sneakers</div>
                    <div className="text-xs text-gray-200">4 hours ago</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-400 mt-2.5" />
                  <div>
                    <div className="font-medium">New user signup: Zara</div>
                    <div className="text-xs text-gray-200">1 day ago</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Inline icons
function DashboardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM3 14h7v7H3v-7zM14 14h7v7h-7v-7z"
      />
    </svg>
  );
}
function BoxIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 7l9-4 9 4-9 4-9-4z"
      />
    </svg>
  );
}
function OrdersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 3h18v6H3V3zM3 13h18v8H3v-8z"
      />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 3v18M21 3v10M1 21h20"
      />
    </svg>
  );
}
function CogIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.983 2.5c.657 0 1.29.07 1.887.203l.37.103a2 2 0 001.509-.27l.31-.2a2 2 0 012.188 0l.31.2a2 2 0 001.509.27l.37-.103A9.01 9.01 0 0121.5 11.98c0 .657-.07 1.29-.203 1.887l-.103.37a2 2 0 00.27 1.509l.2.31a2 2 0 010 2.188l-.2.31a2 2 0 00-.27 1.509l.103.37c.133.597.203 1.23.203 1.887A9.01 9.01 0 0112 21.5c-.657 0-1.29-.07-1.887-.203l-.37-.103a2 2 0 00-1.509.27l-.31.2a2 2 0 01-2.188 0l-.31-.2a2 2 0 00-1.509-.27l-.37.103A9.01 9.01 0 012.5 12c0-.657.07-1.29.203-1.887l.103-.37a2 2 0 00-.27-1.509l-.2-.31a2 2 0 010-2.188l.2-.31a2 2 0 00.27-1.509l-.103-.37A9.01 9.01 0 0111.983 2.5z"
      />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.6 14.6V11a6 6 0 10-12 0v3.6c0 .538-.214 1.055-.595 1.495L4 17h11z"
      />
    </svg>
  );
}
