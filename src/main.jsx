// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        {" "}
        {/* ✅ Yahan wrap karo */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
