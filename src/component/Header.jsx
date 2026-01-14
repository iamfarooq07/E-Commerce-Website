import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "./logo.png";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-700 shadow-lg">
      {/* Container */}
      <div className="flex justify-between items-center px-6 h-20">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="hidden md:block w-56 h-16 object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-10 text-xl font-semibold">
          <Link
            to="/"
            className="text-white font-sans hover:text-orange-400 duration-200"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="text-white font-sans hover:text-orange-400 duration-200"
          >
            Dashboard
          </Link>

          <Link
            to="/products"
            className="text-white font-sans hover:text-orange-400 duration-200"
          >
            Products
          </Link>
          <Link
            to="/adminDashboard"
            className="text-white font-sans hover:text-orange-400 duration-200"
          >
            Admin Dashborad
          </Link>

          <Link
            to="/card"
            className="text-white hover:text-orange-400 duration-200"
          >
            🛒
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
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
