"use client";  // ✅ Mark as client component

import { useEffect, useState } from "react";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = () => {
  const [pizzaList, setPizzaList] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      const res = await fetch("http://localhost:3000/api/products/");
      const data = await res.json();
      setPizzaList(data);
    };
    fetchPizzas();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
