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
import { Link } from "react-router-dom";

export default function Orders() {
  const orders = [
    { id: 1, customer: "Ali Khan", total: "$120", status: "Pending" },
    { id: 2, customer: "Sara Ahmed", total: "$250", status: "Completed" },
    { id: 3, customer: "John Doe", total: "$75", status: "Cancelled" },
    { id: 4, customer: "Ayesha Ali", total: "$180", status: "Pending" },
    { id: 5, customer: "Omar Farooq", total: "$320", status: "Completed" },
    { id: 6, customer: "Hina Shah", total: "$60", status: "Pending" },
    { id: 7, customer: "Bilal Hassan", total: "$400", status: "Completed" },
    { id: 8, customer: "Zara Khan", total: "$90", status: "Cancelled" },
    { id: 9, customer: "Usman Iqbal", total: "$150", status: "Pending" },
    { id: 10, customer: "Maria Javed", total: "$220", status: "Completed" },
    { id: 11, customer: "Ahmed Raza", total: "$310", status: "Pending" },
    { id: 12, customer: "Sana Mirza", total: "$200", status: "Completed" },
    { id: 13, customer: "Farah Khan", total: "$140", status: "Cancelled" },
    { id: 14, customer: "Naveed Ali", total: "$175", status: "Pending" },
    { id: 15, customer: "Fatima Tariq", total: "$260", status: "Completed" },
    { id: 16, customer: "Imran Shah", total: "$95", status: "Pending" },
    { id: 17, customer: "Kiran Ahmed", total: "$340", status: "Completed" },
    { id: 18, customer: "Rashid Khan", total: "$80", status: "Cancelled" },
    { id: 19, customer: "Lubna Iqbal", total: "$190", status: "Pending" },
    { id: 20, customer: "Hamza Ali", total: "$230", status: "Completed" },
  ];

  return (
    <div>
      <Link
        to="/dashboard"
        className="inline-block mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Back
      </Link>

      <div className="flex justify-center items-center bg-black">
        <Card className=" bg-gray-800 text-white mt-10 w-[80%]">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "success"
                            : order.status === "Pending"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
