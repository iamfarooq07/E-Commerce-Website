import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Colections from "./pages/Colections";
import Header from "./component/Header";
import Footer from "./component/Footer";
import ProductDetail from "./pages/ProductDetail";
import ProductCard from "./pages/ProductCard";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/dashboradUi/Dashboard";
import Orders from "./pages/dashboradUi/Orders";
import CustomersSection from "./pages/dashboradUi/CustomersSection";
import Analytics from "./pages/dashboradUi/Analytics";
import Settings from "./pages/dashboradUi/Settings";
import ProductsManagement from "./pages/dashboradUi/ProductsManagement";
import { Calendar18 } from "./pages/Calendar18";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ProtectedAdminRoute from "./component/ProtectedAdminRoute";

function Website() {
  const location = useLocation();

  const hideLayoutRoutes = ["/login", "/sign"];
  const isDashboard = location.pathname.startsWith("/dashboard");

  const shouldShowFooter = !hideLayoutRoutes.includes(location.pathname) && !isDashboard;
  const shouldShowHeader = !hideLayoutRoutes.includes(location.pathname) && !isDashboard;

  return (
    <div>
      {shouldShowHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        >
          <Route path="orders" element={<Orders />} />
          <Route path="product" element={<ProductsManagement />} />
          <Route path="customers" element={<CustomersSection />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="calendar" element={<Calendar18 />} />
        </Route>
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/products" element={<Colections />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ProductCard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Signup />} />
      </Routes>

      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default Website;
