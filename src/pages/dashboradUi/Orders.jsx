import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { fetchAdminOrders, updateOrderStatus } from "../../services/api";

const STATUS_CYCLE = [
  "pending",
  "confirmed",
  "preparing",
  "delivered",
  "cancelled",
];

const badgeVariant = (status) => {
  if (status === "delivered") return "success";
  if (status === "cancelled") return "destructive";
  return "warning";
};

const badgeClass = (status) => {
  if (status === "delivered") return "bg-green-700 text-green-200";
  if (status === "cancelled") return "bg-red-700 text-red-200";
  if (status === "preparing") return "bg-blue-700 text-blue-200";
  if (status === "confirmed") return "bg-yellow-700 text-yellow-200";
  return "bg-gray-600 text-gray-200";
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchAdminOrders()
      .then(setOrders)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (id, currentStatus) => {
    const nextIndex =
      (STATUS_CYCLE.indexOf(currentStatus) + 1) % STATUS_CYCLE.length;
    const nextStatus = STATUS_CYCLE[nextIndex];
    try {
      await updateOrderStatus(id, nextStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: nextStatus } : o)),
      );
      toast.success(`Order status updated to ${nextStatus}`);
    } catch (e) {
      toast.error("Failed to update status: " + e.message);
    }
  };

  return (
    <div className="flex justify-center items-start bg-black min-h-screen py-10">
      <Card className="bg-gray-800 text-white w-[90%]">
        <CardHeader>
          <CardTitle>Orders ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <p className="text-gray-400 text-sm">Loading orders...</p>
          )}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {!loading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Order ID</TableHead>
                  <TableHead className="text-white">Customer</TableHead>
                  <TableHead className="text-white">Items</TableHead>
                  <TableHead className="text-white">Total</TableHead>
                  <TableHead className="text-white">Payment</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <>
                    <TableRow
                      key={order._id}
                      className="cursor-pointer hover:bg-gray-700/50"
                      onClick={() =>
                        setExpandedId(
                          expandedId === order._id ? null : order._id,
                        )
                      }
                    >
                      <TableCell className="font-mono text-xs">
                        {order._id.slice(-6).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        <div>{order.user?.name ?? "Guest"}</div>
                        <div className="text-xs text-gray-400">
                          {order.user?.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 text-xs">
                        {order.items?.length ?? 0} item(s)
                      </TableCell>
                      <TableCell>
                        PKR {order.totalAmount?.toLocaleString()}
                      </TableCell>
                      <TableCell className="capitalize">
                        {order.paymentMethod}
                      </TableCell>
                      <TableCell className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${badgeClass(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          className="bg-gray-700"
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(order._id, order.status);
                          }}
                          disabled={
                            order.status === "cancelled" ||
                            order.status === "delivered"
                          }
                        >
                          Next Status
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedId === order._id && (
                      <TableRow
                        key={`${order._id}-detail`}
                        className="bg-gray-900"
                      >
                        <TableCell colSpan={8} className="py-3 px-6">
                          <div className="text-sm space-y-2">
                            <p className="font-semibold text-gray-300">
                              Order Items:
                            </p>
                            <div className="space-y-1">
                              {order.items?.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex justify-between text-gray-400"
                                >
                                  <span>
                                    {item.foodItem?.name ?? "Unknown"} ×{" "}
                                    {item.quantity}
                                  </span>
                                  <span>
                                    PKR{" "}
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                            {order.deliveryAddress && (
                              <p className="text-gray-400 text-xs mt-2">
                                Address: {order.deliveryAddress.street},{" "}
                                {order.deliveryAddress.city}
                                {order.deliveryAddress.phone &&
                                  ` | Phone: ${order.deliveryAddress.phone}`}
                              </p>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-gray-400"
                    >
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
