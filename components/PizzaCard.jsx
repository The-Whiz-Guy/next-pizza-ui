"use client";  
import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";

const PizzaCard = ({ name, price, desc }) => {
  return (
    <div className={styles.container}>
      <Image src="/img/pizza.png" alt="Pizza" width="500" height="500" />
      <h1 className={styles.title}>{name}</h1>
      <span className={styles.price}>{price}</span>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
};

export default PizzaCard;
