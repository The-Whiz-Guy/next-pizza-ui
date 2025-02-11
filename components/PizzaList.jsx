"use client";  // Add this at the top
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const pizzas = [
  { name: "FIORI DI ZUCCA", price: "$19.90", desc: "A delightful mix of zucchini flowers and creamy mozzarella." },
  { name: "MARGHERITA", price: "$14.90", desc: "Classic tomato sauce, fresh mozzarella, and basil leaves." },
  { name: "PEPPERONI FEAST", price: "$17.50", desc: "Loaded with spicy pepperoni and a cheesy blend." },
  { name: "TRUFFLE PARADISE", price: "$22.90", desc: "A rich mix of truffle oil, mushrooms, and parmesan." },
  { name: "BBQ CHICKEN", price: "$18.90", desc: "Grilled chicken, smoky BBQ sauce, and red onions." },
  { name: "VEGGIE SUPREME", price: "$16.50", desc: "A colorful medley of fresh veggies and mozzarella." },
  { name: "HAWAIIAN DELIGHT", price: "$15.90", desc: "Sweet pineapple, savory ham, and melted cheese." },
  { name: "MEAT LOVERS", price: "$20.90", desc: "A hearty mix of sausage, pepperoni, bacon, and beef." }
];

const PizzaList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        "Indulge in the finest, most delicious pizzas, baked with fresh ingredients. 
        Savor every bite of perfection, made just for you!"
      </p>
      <div className={styles.wrapper}>
        {pizzas.map((pizza, index) => (
          <PizzaCard key={index} name={pizza.name} price={pizza.price} desc={pizza.desc} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
