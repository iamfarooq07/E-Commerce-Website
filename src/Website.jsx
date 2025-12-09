import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Colections from "./pages/Colections";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import ProductCard from "./pages/ProductCard";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import CartProvider from "./contextFile/CartContext";

function Website() {
  return (
    <CartProvider>
      {" "}
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
