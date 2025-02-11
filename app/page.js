import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

async function getPizzas() {
  const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" }); // No caching for fresh data
  if (!res.ok) {
    throw new Error("Failed to fetch pizzas");
  }
  return res.json();
}

export default async function Page() {
  const pizzaList = await getPizzas();

  return (
    <div className={styles.container}>
      <Featured />
      <PizzaList pizzaList={pizzaList} /> {/* ✅ Pass correct prop */}
    </div>
  );
}
