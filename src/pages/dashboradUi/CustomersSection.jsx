import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const customers = [
  {
    id: 1,
    name: "Ali Khan",
    email: "ali.khan@gmail.com",
    status: "Active",
    orders: 12,
  },
  {
    id: 2,
    name: "Sara Ahmed",
    email: "sara.ahmed@gmail.com",
    status: "Inactive",
    orders: 4,
  },
  {
    id: 3,
    name: "Usman Raza",
    email: "usman.raza@gmail.com",
    status: "Active",
    orders: 20,
  },
  {
    id: 4,
    name: "Ayesha Noor",
    email: "ayesha.noor@gmail.com",
    status: "Active",
    orders: 9,
  },
  {
    id: 5,
    name: "Hamza Ali",
    email: "hamza.ali@gmail.com",
    status: "Inactive",
    orders: 2,
  },
  {
    id: 6,
    name: "Zain Ahmed",
    email: "zain.ahmed@gmail.com",
    status: "Active",
    orders: 15,
  },
  {
    id: 7,
    name: "Fatima Khan",
    email: "fatima.khan@gmail.com",
    status: "Active",
    orders: 7,
  },
  {
    id: 8,
    name: "Bilal Hussain",
    email: "bilal.hussain@gmail.com",
    status: "Inactive",
    orders: 1,
  },
  {
    id: 9,
    name: "Hira Malik",
    email: "hira.malik@gmail.com",
    status: "Active",
    orders: 18,
  },
  {
    id: 10,
    name: "Danish Raza",
    email: "danish.raza@gmail.com",
    status: "Active",
    orders: 6,
  },
];

export default function CustomersSection() {
  return (
    <div>
      <Link
        to="/dashboard"
        className="fixed left-10 top-30 z-50 flex items-center gap-2 text-blue-500 text-lg hover:text-blue-600"
      >
        <FaArrowLeft />
        Back
      </Link>

      <div className="flex justify-center items-center mt-12">
        <Card className="bg-gray-800 text-white w-[80%]">
          <CardHeader>
            <CardTitle className="text-lg">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Customer</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>
                          {customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{customer.name}</span>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {customer.orders}
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
