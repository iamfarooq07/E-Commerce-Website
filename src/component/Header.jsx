import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "./logo.png";

// import login from "../auth/Login";

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
        <nav className="hidden md:flex items-center gap-10 text-lg font-medium relative">
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
          <Link
            to="/login"
            className="text-white hover:text-orange-400 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/sign"
            className="text-white hover:text-orange-400 transition duration-200"
          >
            Sign Up
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="text-white hover:text-orange-400 transition duration-200 text-xl"
          >
            🛒
          </Link>

          {/* User Section */}
          <div className="relative flex items-center gap-2 cursor-pointer group">
            <div
              className="w-10 h-10 rounded-full bg-indigo-600 text-white
  flex items-center justify-center font-bold uppercase"
            >
              {/* {idName} */}
            </div>

            <span className="font-medium text-white text-sm">Farooq</span>

            {/* Dropdown */}
            <div
              className="absolute right-0 top-14 w-40 bg-white rounded-lg shadow-lg
      opacity-0 invisible group-hover:opacity-100 group-hover:visible
      transition-all duration-200"
            >
              <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                Logout
              </button>
            </div>
          </div>
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
