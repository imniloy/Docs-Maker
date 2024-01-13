import React from "react";
import Editor from "./components/Editor";
const App = () => {
  return (
    <div>
      <Editor />
    </div>
  );
};

export default App;

// import Carousel from "./components/pizza/newCarousel";
// // import Carousel from "./components/pizza/Carousel";
// import Pizza from "./components/pizza/pizza.png";
// export default function App() {
//   const CarouselData = [
//     {
//       _id: 1,
//       name: "Cheese Pizza",
//       image: Pizza,
//       price: 100,
//       addOns: ["S", "M", "L"],
//     },
//     {
//       _id: 2,
//       name: "Veggie Pizza",
//       image: Pizza,
//       price: 10,
//       addOns: ["S", "M", "L"],
//     },
//     {
//       _id: 3,
//       name: "Pepperoni Pizza",
//       image: Pizza,
//       price: 20,
//       addOns: ["S", "M", "L"],
//     },
//     {
//       _id: 4,
//       name: "Meat Pizza",
//       image: Pizza,
//       price: 25,
//       addOns: ["S", "M", "L"],
//     },
//     {
//       _id: 5,
//       name: "Margherita Pizza",
//       image: Pizza,
//       price: 21,
//       addOns: ["S", "M", "L"],
//     },

//     {
//       _id: 5,
//       name: "BBQ Chicken Pizza",
//       image: Pizza,
//       price: 30,
//       addOns: ["S", "M", "L"],
//     },
//   ];
//   return (
//     <div className="max-w-[600px] mx-auto w-full h-[100vh] bg-blue-500 overflow-hidden">
//       <Carousel Data={CarouselData} />
//     </div>
//   );
// }
