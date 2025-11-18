import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between items-center w-full px-20 border-b-2 bg-black">
      <div>
        <img
          src="https://www.broadwaypizza.com.pk/assets/broadwayPizzaLogo.png"
          alt=""
          className="w-35 h-16 rounded-full"
        />
      </div>

      <div className="flex gap-8 text-xl">
        <Link to="/" className="text-white hover:text-orange-300">
          Home
        </Link>
        <Link to="/products" className="text-white hover:text-orange-300">
          Products
        </Link>
        <Link to="/cart" className="text-white hover:text-orange-300">
          Cart
        </Link>
      </div>
    </div>
  );
}

export default Header;
