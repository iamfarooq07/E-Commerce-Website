import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  console.log(CartItem);
  const { updateQuantity, removeFromCart } = useCart();

  const basePrice = Number(
    item.basePrice ?? item.price - (item.drink?.price || 0)
  );
  const drinkPrice = Number(item.drink?.price || 0);
  const quantity = Number(item.quantity || 1);
  const totalPrice = (basePrice + drinkPrice) * quantity;

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-lg shadow-sm"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>

        {item.drink && (
          <div className="flex items-center gap-2 mb-1 text-sm text-gray-600">
            <span>
              Drink:{" "}
              <span className="font-medium text-gray-800">
                {item.drink.name}
              </span>
              {drinkPrice > 0 && (
                <span className="text-gray-500"> (+${drinkPrice})</span>
              )}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          {drinkPrice > 0 ? (
            <>
              <span>${basePrice}</span> + <span>${drinkPrice}</span> ={" "}
              <span className="font-semibold text-gray-800">
                ${totalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-semibold text-gray-800">
              ${totalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            updateQuantity(item.cartItemId, Math.max(1, quantity - 1))
          }
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 font-bold transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold">{quantity}</span>
        <button
          onClick={() => updateQuantity(item.cartItemId, quantity + 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 font-bold transition-colors"
        >
          +
        </button>
      </div>

      {/* Remove button */}
      <div className="text-right min-w-[100px]">
        <p className="font-bold text-lg text-gray-800">
          ${totalPrice.toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.cartItemId)}
          className="text-red-500 text-sm hover:text-red-700 mt-1 font-medium transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
