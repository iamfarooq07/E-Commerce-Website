import CenterImage from "./CenterImage";
import Maincard from "./Maincard";
import MainImage from "./MainImage";

const pizzas = [
  {
    id: 1,
    name: "Pizza-Deal-1",
    description:
      "Cheesy delight with fresh veggies and toppings, baked to perfection with a golden crust. Every bite is full of flavor and freshness.",
    image: "https://potatox.pk/wp-content/uploads/2025/06/pizza-deal-1.png",
    price: 1000,
  },
  {
    id: 2,
    name: "Pizza-Deal-2",
    description:
      "Spicy chicken pizza loaded with gooey cheese and a tangy tomato base. Crispy edges and flavorful toppings make it an irresistible treat for spice lovers.",
    image: "https://potatox.pk/wp-content/uploads/2025/06/pizza-deal-2.png",
    price: 1100,
  },
  {
    id: 3,
    name: "Pizza-Deal-3",
    description:
      "Margherita pizza topped with fresh basil, mozzarella, and a drizzle of olive oil. A classic favorite that combines simplicity with mouth-watering taste.",
    image: "https://potatox.pk/wp-content/uploads/2025/06/pizza-deal-3.png",
    price: 1050,
  },
  {
    id: 4,
    name: "Pizza-Deal-4",
    description:
      "Hot, cheesy, and loaded with your favorite toppings – every slice is a slice of happiness! Perfectly baked crust with a richs.",
    image: "https://potatox.pk/wp-content/uploads/2025/06/pizza-deal-4.png",
    price: 1200,
  },
  {
    id: 5,
    name: "Pizza-Deal-5",
    description:
      "Pepperoni pizza with extra cheese, tangy sauce, and a crispy crust. Every bite bursts with flavor, making it a top choice for pizza lovers.",
    image: "https://potatox.pk/wp-content/uploads/2025/06/pizza-deal-5.png",
    price: 1150,
  },
  {
    id: 6,
    name: "Pizza-Deal-6",
    description:
      "BBQ chicken pizza with smoky flavor, gooey cheese, and perfectly baked dough. A savory combination of smoky and cheesy goodness in every slice.",
    image: "https://potatox.pk/wp-content/uploads/2025/06/pizza-deal-6.png",
    price: 1250,
  },
  {
    id: 7,
    name: "Pizza-Deal-7",
    description:
      "Veggie supreme pizza loaded with fresh vegetables, olives, and melted cheese. A colorful and flavorful delight that is healthy, fresh, and incredibly tasty.",
    image: "https://potatox.pk/wp-content/uploads/2025/06/pizza-deal-7.png",
    price: 1100,
  },
  {
    id: 8,
    name: "Pizza-Deal-8",
    description:
      "Hawaiian pizza with juicy pineapple, savory ham, and melted cheese. Sweet, savory, and cheesy, this pizza is a tropical treat for every bite.",
    image: "https://potatox.pk/wp-content/uploads/2025/06/pizza-deal-8.png",
    price: 1200,
  },
];
const starters = [
  {
    id: 1,
    name: "Garlic Bread",
    description:
      "Freshly baked garlic bread with a buttery garlic spread and a hint of herbs. Perfect as a starter or side with your main meal.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5ea3b22556f3d073f3d9cae4/17b16cb1-b77d-4730-9a33-e95780d04b7f/1D956910-76FD-42A3-B67E-186157D75674_1_105_c.jpeg",
    price: 350,
  },
  {
    id: 2,
    name: "Chicken Wings",
    description:
      "Juicy and crispy chicken wings tossed in a spicy BBQ sauce, served with a side of creamy dip. Ideal for spice lovers.",
    image: "https://assets.unileversolutions.com/v1/89693590.jpg",
    price: 500,
  },
  {
    id: 3,
    name: "Mozzarella Sticks",
    description:
      "Golden-fried mozzarella sticks with a gooey cheesy center, served with tangy marinara sauce!",
    image:
      "https://www.fifteenspatulas.com/wp-content/uploads/2013/02/How-to-Make-Homemade-Mozzarella-Sticks.jpg",
    price: 400,
  },
  {
    id: 4,
    name: "French Fries",
    description:
      "Crispy golden fries sprinkled with seasoning, served with ketchup or mayo. A classic starter loved by everyone.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJu0r3EbIemuW_XGaONq1rmHgNVPHaKiViXw&s",
    price: 250,
  },
  {
    id: 5,
    name: "Veg Spring Rolls",
    description:
      "Crispy rolls stuffed with fresh vegetables, served with sweet chili sauce. Light, crunchy, and absolutely delicious.",
    image:
      "https://www.brahminsfoods.com/wp-content/uploads/2020/11/spring-roll-recipe-step-by-step-instructions.jpg",
    price: 300,
  },
  {
    id: 6,
    name: "Chicken Nuggets",
    description:
      "Tender chicken nuggets, perfectly fried and served with your choice of dipping sauce. Great starter for kids and adults alike.",
    image:
      "https://images.archanaskitchen.com/images/recipes/world-recipes/continental-party-appetizer-starter-recipes/Chicken_Nuggets_603dab142b.jpg",
    price: 400,
  },
  {
    id: 7,
    name: "Mushrooms",
    description:
      "Fresh mushrooms stuffed with cheese and herbs, baked to perfection. A savory starter in flavor.",
    image:
      "https://in.thebar.com/_next/image?url=https%3A%2F%2Fcms.in.thebar.com%2FPR1670%2Fpublic%2F2025-07%2FTrending%25201%2520July%2520Mushroom%2520Starter%2520Recipes_Banner.jpg%3FVersionId%3D1.7tb8hZOe9D8BMCqD1xeuELcuq5.iY.&w=3840&q=75",
    price: 450,
  },
  {
    id: 8,
    name: "Paneer Tikka",
    description:
      "Soft paneer cubes marinated in aromatic spices and grilled to perfection. Served with mint chutney for extra flavor.",
    image:
      "https://twosleevers.com/wp-content/uploads/2017/06/Paneer-Tikka-Wide.jpg",
    price: 500,
  },
];
const pastas = [
  {
    id: 1,
    name: "Spaghetti",
    description:
      "Classic Italian spaghetti with rich meat sauce, fresh herbs, and Parmesan cheese. A hearty and delicious favorite.",
    image:
      "https://www.nestlegoodnes.com/ph/sites/default/files/styles/1_1_768px_width/public/srh_recipes/ec9fce823d23bbb054d52aea1981fc0c.jpg.webp?itok=00faecKA",
    price: 800,
  },
  {
    id: 2,
    name: "Alfredo Pasta",
    description:
      "Fettuccine pasta in a creamy Alfredo sauce, topped with Parmesan and parsley. Smooth, rich, and cheesy perfection.",
    image:
      "https://s3.amazonaws.com/static.realcaliforniamilk.com/media/recipes_2/fettuccine-alfredo-with-creme-fraiche.jpg",
    price: 850,
  },
  {
    id: 3,
    name: "Club Sandwich",
    description:
      "Triple-layered sandwich with chicken, bacon, lettuce, tomato, and mayo. Classic, filling, and absolutely tasty.",
    image:
      "https://www.miocoalition.com/wp-content/uploads/2024/05/Classic-Club-Sandwich.jpg",
    price: 550,
  },
  {
    id: 4,
    name: "Tuna Sandwich",
    description:
      "Fresh tuna mixed with mayo, herbs, and veggies, served in soft bread. Light, flavorful, and protein-rich.",
    image:
      "https://www.katheats.com/wp-content/uploads/2024/11/Healthy-Tuna-Sandwich-14-500x375.jpg",
    price: 520,
  },
  {
    id: 5,
    name: "Cheese Sandwich",
    description:
      "Toasted bread with melted cheese and butter, simple yet irresistibly delicious. Perfect for breakfast or snack.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZb4RDR3Bki-ogbeRv4RSjGNgeTZc-Yqjykw&s",
    price: 400,
  },
];

console.log(...pizzas);

function Home() {
  return (
    <div className="w-full h-full bg-black">
      <MainImage />
      <hr className="border-2 border-white ml-10 mr-10 mt-10" />
      <h1 className="m-10 text-center text-5xl font-extrabold">Mega Deals</h1>
      <div className="flex flex-wrap justify-center items-center">
        {pizzas.map((elem) => {
          console.log(elem);
          return (
            <Maincard
              name={elem.name}
              description={elem.description}
              image={elem.image}
              price={elem.price}
            />
          );
        })}
      </div>
      <h1 className="m-10 text-center text-5xl font-extrabold">Starters</h1>
      <div className="flex flex-wrap justify-center items-center">
        {starters.map((elem) => {
          // console.log(elem);
          return (
            <Maincard
              name={elem.name}
              description={elem.description}
              image={elem.image}
              price={elem.price}
            />
          );
        })}
      </div>
      <h1 className="m-10 text-center text-5xl font-extrabold">
        Pasta / StandWich
      </h1>
      <div className="flex flex-wrap justify-center items-center">
        {pastas.map((elem) => {
          // console.log(elem);
          return (
            <Maincard
              name={elem.name}
              description={elem.description}
              image={elem.image}
              price={elem.price}
            />
          );
        })}
      </div>
      <CenterImage />
    </div>
  );
}

export default Home;
