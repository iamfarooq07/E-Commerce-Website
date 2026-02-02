import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Colections from "./pages/Colections";
import Header from "./component/Header";
import Footer from "./component/Footer";
import ProductDetail from "./pages/ProductDetail";
import ProductCard from "./pages/ProductCard";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/dashboradUi/Dashboard";
import CartProvider from "./contextFile/CartContext";
import Orders from "./pages/dashboradUi/Orders";
import CustomersSection from "./pages/dashboradUi/CustomersSection";
import Analytics from "./pages/dashboradUi/Analytics";
import Settings from "./pages/dashboradUi/Settings";
import { Calendar18 } from "./pages/Calendar18";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

function Website() {
  const location = useLocation();

  // Routes where footer should be hidden
  const hideFooterRoutes = ["/login", "/sign"];

  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <CartProvider>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/product" element={<Colections />} />
          <Route path="/dashboard/customers" element={<CustomersSection />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/calendar" element={<Calendar18 />} />
          <Route path="/products" element={<Colections />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ProductCard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Signup />} />
        </Routes>

        {shouldShowFooter && <Footer />}
      </div>
    </CartProvider>
  );
}

export default Website;
