import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "./logo.png";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black border-b shadow-lg">
      {/* Container */}
      <div className="flex justify-between items-center px-6 h-20">
        <Link to="/">
          <img
            src={logo}
            alt="Website Logo"
            className="hidden md:block w-56 h-16 object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10 text-lg font-medium">
          <Link
            to="/"
            className="text-orange-400 hover:text-white transition duration-200"
          >
            Home
          </Link>

          {/* <Link
            to="/adminDashboard"
            className="text-white hover:text-orange-400 transition duration-200"
          >
            Admin Dashboard
          </Link> */}

          <Link
            to="/products"
            className="text-white hover:text-orange-400 transition duration-200"
          >
            Products
          </Link>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 bg-gray-800 rounded-md text-white hover:bg-gray-700 transition"
            >
              Login
            </Link>
            <Link
              to="/sign"
              className="px-4 py-2 bg-gray-800 rounded-md text-white hover:bg-gray-700 transition"
            >
              Sign Up
            </Link>
          </div>
          <Link
            to="/cart"
            className="text-white hover:text-orange-400 transition duration-200 text-xl"
          >
            🛒
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle Menu"
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
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
            to="/dashboard"
            className="block text-white hover:text-orange-400"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/products"
            className="block text-white hover:text-orange-400"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>

          <Link
            to="/card"
            className="block text-white hover:text-orange-400"
            onClick={() => setOpen(false)}
          >
            🛒 Cart
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
