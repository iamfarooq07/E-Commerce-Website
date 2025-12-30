import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 14000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 26000 },
  { month: "Jul", revenue: 24000 },
];

export default function Analytics() {
  return (
    <div>
      <div>
        <Link
          to="/dashboard"
          className="fixed left-10 top-30 z-50 flex items-center gap-2 text-blue-500 text-lg hover:text-blue-600"
        >
          <FaArrowLeft />
          Back
        </Link>

        <h1 className="text-center text-6xl font-extrabold mt-12">
          Analytics Chart
        </h1>
      </div>
      <div className="h-screen flex justify-center items-center">
        <Card className="bg-gray-800 w-[90%] mt-5">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Revenue Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0546eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
