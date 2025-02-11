import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <Featured />
      <PizzaList />
    </div>
  );
}
