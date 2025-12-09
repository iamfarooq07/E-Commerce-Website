import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-4 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Snackify Fast Food And Pizza
            </h2>
            <p className="mt-3 text-sm leading-6">
              Building tasty, clean, and interactive web experiences for
              Snackffy using React & Tailwind.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Services</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Services</h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Pizza Deals</li>
              <li className="hover:text-white cursor-pointer">Starters</li>
              <li className="hover:text-white cursor-pointer">Pasta</li>
              <li className="hover:text-white cursor-pointer">Standwich</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Subscribe</h3>
            <p className="text-sm mb-3">
              Get updates on new projects and features.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Snackify Pizza Pakistan — All Rights
          Reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
