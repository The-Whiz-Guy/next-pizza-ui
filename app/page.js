import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";

async function getPizzas() {
  const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" }); 
  if (!res.ok) {
    throw new Error("Failed to fetch pizzas");
  }
  return res.json();
}

export default async function Page() {
  const pizzaList = await getPizzas();

  return (
    <div>
      <Featured />
      <PizzaList pizzaList={pizzaList} /> 
    </div>
  );
}
