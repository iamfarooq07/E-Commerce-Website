import { Route, Routes } from "react-router-dom";
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

function Website() {
  return (
    <CartProvider>
      {" "}
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
          <Route path="/Products" element={<Colections />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/Card" element={<ProductCard />} />
          <Route path="/Checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default Website;
