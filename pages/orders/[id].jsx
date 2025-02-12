import { useEffect, useState } from "react";
import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({ order }) => {
  // Prevents hydration issues by ensuring component is mounted
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // Prevent SSR mismatch

  if (!order) return <p>Loading...</p>; // Handle undefined order

  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td>
                  <span className={styles.name}>{order.customer}</span>
                </td>
                <td>
                  <span className={styles.address}>{order.address}</span>
                </td>
                <td>
                  <span className={styles.total}>${order.total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.row}>
          {["paid", "bake", "bike", "delivered"].map((statusText, i) => (
            <div key={i} className={statusClass(i)}>
              <Image src={`/img/${statusText}.png`} width={30} height={30} alt={statusText} />
              <span>{statusText.charAt(0).toUpperCase() + statusText.slice(1)}</span>
              <div className={styles.checkedIcon}>
                <Image src="/img/checked.png" width={20} height={20} alt="checked" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>
            <span suppressHydrationWarning>${order.total}</span>
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>
            <span suppressHydrationWarning>$0.00</span>
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>
            <span suppressHydrationWarning>${order.total}</span>
          </div>
          <button disabled className={styles.button}>Yet To Pay</button>
        </div>
      </div>
    </div>
  );
};

// Fetch order data on the server side
export const getServerSideProps = async ({ params }) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
    return {
      props: { order: res.data },
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      props: { order: null }, // Return null to prevent crashes
    };
  }
};

export default Order;
