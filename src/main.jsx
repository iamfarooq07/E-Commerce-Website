import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./contextFile/CartContext";
import AuthProvider from "./contextFile/AuthContext";
import EcommerceAuthProvider from "./contexts/EcommerceAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EcommerceAuthProvider>
          <CartProvider>
            <ToastContainer />
            <App />
          </CartProvider>
        </EcommerceAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
