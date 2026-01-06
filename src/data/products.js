// export const products = [
//   {
//     id: 1,
//     image: "/images/products/burger.png",
//     title: "Burger1",
//     description:
//       "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
//     price: 100,
//     category: "Burger",

//     rating: 5,
//   },
//   {
//     id: 2,
//     image: "/images/products/shawarma.jpg",
//     title: "Shawarma1",
//     description:
//       "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
//     price: 200,
//     category: "Shawarma",
//     rating: 4,
//   },
//   {
//     id: 3,
//     image: "/images/products/piz.jpg",
//     title: "Pizza1",
//     description: "Crispy Zinger, double-crispy fried to perfection, wrapped in a soft, buttery paratha for the ultimate flavor explosion.",
//     price: 300,
//     category: "Pizza",
//     rating: 3,
//   },
//   {
//     id: 4,
//     image: "/images/products/burger.png",
//     title: "Burger2",
//     description:
//       "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
//     price: 400,
//     category: "Burger",
//     rating: 2,
//   },
//   {
//     id: 5,
//     image: "/images/products/shawarma.jpg",
//     title: "Shawarma2",
//     description:
//       "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
//     price: 500,
//     category: "Shawarma",
//     rating: 1,
//   },
//   {
//     id: 6,
//     image: "/images/products/piz.jpg",
//     title: "Pizza2",
//     description: "Crispy Zinger, double-crispy fried to perfection, wrapped in a soft, buttery paratha for the ultimate flavor explosion.",
//     price: 600,
//     category: "Pizza",
//     rating: 5,
//   },
//   {
//     id: 7,
//     image: "/images/products/burger.png",
//     title: "Burger3",
//     description:
//       "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
//     price: 700,
//     category: "Burger",
//     rating: 4,
//   },
//   {
//     id: 8,
//     image: "/images/products/shawarma.jpg",
//     title: "Shawarma3",
//     description:
//       "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
//     price: 800,
//     category: "Shawarma",
//     rating: 3,
//   },
//   {
//     id: 9,
//     image: "/images/products/piz.jpg",
//     title: "Pizza3",
//     description: "Crispy Zinger, double-crispy fried to perfection, wrapped in a soft, buttery paratha for the ultimate flavor explosion.",
//     price: 900,
//     category: "Pizza",
//     rating: 2,
//   },
// ];

// const findRange = () => {
//   let min = products[0].price;
//   let max = products[0].price;

//   products.forEach((product) => {
//     if (product.price < min) min = product.price;
//     if (product.price > max) max = product.price;
//   });

//   return { min, max };
// };
// export const priceRange = findRange();

//========================

export const products = [
  {
    id: 1,
    image: "/images/products/krunchBurger.png",
    title: "Burger1",
    description: "Enjoy the crispy chicken fillet in a soft bun with spicy mayo and our signature sauce",
    price: 100,
    category: "Burger",
    rating: 5,
  },
  {
    id: 2,
    image: "/images/products/shawarma.jpg",
    title: "Shawarma1",
    description: "Aromatic arabian rice with 6 pcs of hot shots and famous vietnamese sauce",
    price: 200,
    category: "Shawarma",
    rating: 4,
  },
  {
    id: 3,
    image: "/images/products/pizza.jpg",
    title: "Pizza1",
    description: "Crispy Zinger, double-crispy fried to perfection wrapped in a soft, buttery paratha",
    price: 300,
    category: "Pizza",
    rating: 3,
  },
  {
    id: 4,
    image: "/images/products/burger.png",
    title: "Burger2",
    description: "Juicy chicken burger with fresh lettuce, tomato, and cheese",
    price: 150,
    category: "Burger",
    rating: 4,
  },
  {
    id: 5,
    image: "/images/products/shawarma.jpg",
    title: "Shawarma2",
    description: "Spicy and flavorful shawarma roll with garlic sauce",
    price: 250,
    category: "Shawarma",
    rating: 3,
  },
  {
    id: 6,
    image: "/images/products/pizza.jpg",
    title: "Pizza2",
    description: "Cheesy Margherita pizza with fresh basil and tomato sauce",
    price: 350,
    category: "Pizza",
    rating: 5,
  },
  {
    id: 7,
    image: "/images/products/sandwichs.jpg",
    title: "Sandwich1",
    description: "Grilled vegetable sandwich with cheddar cheese and mayo",
    price: 120,
    category: "Sandwich",
    rating: 4,
  },
  {
    id: 8,
    image: "/images/products/krunchBurger.png",
    title: "Burger3",
    description: "Double patty burger with caramelized onions and BBQ sauce",
    price: 180,
    category: "Burger",
    rating: 5,
  },
  {
    id: 9,
    image: "/images/products/shawarma.jpg",
    title: "Shawarma3",
    description: "Classic beef shawarma with pickles and tahini sauce",
    price: 300,
    category: "Shawarma",
    rating: 4,
  },
  {
    id: 10,
    image: "/images/products/pizza.jpg",
    title: "Pizza3",
    description: "Pepperoni pizza with extra cheese and chili flakes",
    price: 400,
    category: "Pizza",
    rating: 3,
  },
  {
    id: 11,
    image: "/images/products/sandwich1.jpg",
    title: "Sandwich2",
    description: "Club sandwich with chicken, bacon, lettuce and tomato",
    price: 180,
    category: "Sandwich",
    rating: 5,
  },
  {
    id: 12,
    image: "/images/products/krunchBurger.png",
    title: "Burger4",
    description: "Spicy chicken burger with jalapenos and cheese sauce",
    price: 220,
    category: "Burger",
    rating: 4,
  },
  {
    id: 13,
    image: "/images/products/shawarma.jpg",
    title: "Shawarma4",
    description: "Chicken shawarma wrap with fresh vegetables and garlic sauce",
    price: 350,
    category: "Shawarma",
    rating: 3,
  },
  {
    id: 14,
    image: "/images/products/pizza.jpg",
    title: "Pizza4",
    description: "Veggie pizza with bell peppers, olives, mushrooms and onions",
    price: 420,
    category: "Pizza",
    rating: 4,
  },
  {
    id: 15,
    image: "/images/products/sandwichs.jpg",
    title: "Sandwich3",
    description: "Toasted ham and cheese sandwich with mustard mayo",
    price: 200,
    category: "Sandwich",
    rating: 3,
  },
  {
    id: 16,
    image: "/images/products/burger.png",
    title: "Burger5",
    description: "Classic beef burger with lettuce, tomato, and special sauce",
    price: 250,
    category: "Burger",
    rating: 5,
  },
  {
    id: 17,
    image: "/images/products/shawarma.jpg",
    title: "Shawarma5",
    description: "Beef shawarma with spicy sauce and crispy fries",
    price: 400,
    category: "Shawarma",
    rating: 4,
  },
  {
    id: 18,
    image: "/images/products/pizza.jpg",
    title: "Pizza5",
    description: "BBQ chicken pizza with onions and fresh cilantro",
    price: 500,
    category: "Pizza",
    rating: 5,
  },
  {
    id: 19,
    image: "/images/products/sandwich1.jpg",
    title: "Sandwich4",
    description: "Grilled chicken sandwich with creamy mayo and lettuce",
    price: 220,
    category: "Sandwich",
    rating: 4,
  },
  {
    id: 20,
    image: "/images/products/krunchBurger.png",
    title: "Burger6",
    description: "Cheese burger with crispy onions and pickles",
    price: 300,
    category: "Burger",
    rating: 5,
  },
  {
    id: 21,
    image: "/images/products/sandwichs.jpg",
    title: "Burger6",
    description: "Cheese burger with crispy onions and pickles",
    price: 300,
    category: "Burger",
    rating: 5,
  },
];

// Calculate price range automatically
const findRange = () => {
  let min = products[0].price;
  let max = products[0].price;

  products.forEach((product) => {
    if (product.price < min) min = product.price;
    if (product.price > max) max = product.price;
  });

  return { min, max };
};
export const priceRange = findRange();