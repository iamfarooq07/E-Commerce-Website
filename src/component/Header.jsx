import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "./logo.png";
import { useAuth } from "@/contextFile/AuthContext";
import { useCart } from "@/contextFile/CartContext";

function Header() {
  const [open, setOpen] = useState(false);
  const { user, idName, logout } = useAuth();
  const { totalCartItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-black border-b shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Website Logo"
            className="hidden md:block w-56 h-16 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
          <Link
            to="/"
            className="text-orange-400 hover:text-white transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-white hover:text-orange-400 transition duration-200"
          >
            Products
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-white text-xl hover:text-orange-400 transition"
          >
            🛒
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-500 text-xs px-2 rounded-full">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {!user ? (
            <div className="flex gap-3 ml-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-gray-800 rounded-md text-white hover:bg-gray-700 transition"
              >
                Login
              </Link>
              <Link
                to="/sign"
                className="px-4 py-2 bg-orange-500 rounded-md text-black hover:bg-orange-400 transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative flex items-center gap-2 cursor-pointer group ml-4">
              {/* Letter Avatar */}
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold uppercase">
                {idName}
              </div>

              <span className="text-white text-sm">{user.email}</span>

              {/* Dropdown */}
              <div
                className="absolute right-0 top-14 w-40 bg-white rounded-lg shadow-lg
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-200"
              >
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-700 py-4 px-6 space-y-4 text-xl">
          <Link
            to="/"
            className="block text-white hover:text-orange-400"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block text-white hover:text-orange-400"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="block text-white hover:text-orange-400"
            onClick={() => setOpen(false)}
          >
            🛒 Cart
          </Link>

          {/* Mobile Auth Section */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="block text-white hover:text-orange-400"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/sign"
                className="block text-white hover:text-orange-400"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="block w-full text-left text-red-600 hover:bg-gray-800 px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
