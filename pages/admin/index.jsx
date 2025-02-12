import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import cookie from "cookie"; 
import styles from "../../styles/Admin.module.css";
import Add from "../../components/Add";  // Import Add Component

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [showAdd, setShowAdd] = useState(false); // Add state for modal
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/api/products/" + id);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.find((order) => order._id === id);
    if (!item) return;
    
    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: item.status + 1,
      });
      setOrderList((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? res.data : order))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      {showAdd && <Add setClose={() => setShowAdd(false)} />}  {/* Show Add modal */}
      
      {/* Admin Actions */}
      <div className={styles.adminActions}>
        <button className={styles.addButton} onClick={() => setShowAdd(true)}>
          Add New Pizza
        </button>
      </div>

      {/* Products Section */}
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pizzaList.map((product) => (
              <tr key={product._id} className={styles.trTitle}>
                <td>
                  <Image src={product.img} width={185} height={180} alt="" />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.Ebutton}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders Section */}
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id} className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>{order.method === 0 ? "Cash" : "Paid"}</td>
                <td>{status[order.status]}</td>
                <td>
                  <button className={styles.Obutton} onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ Fix `getServerSideProps` function
export const getServerSideProps = async (ctx) => {
  const cookies = cookie.parse(ctx.req.headers.cookie || "");
  const isAdmin = cookies.token === process.env.TOKEN;

  if (!isAdmin) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  try {
    const [productRes, orderRes] = await Promise.all([
      axios.get("http://localhost:3000/api/products"),
      axios.get("http://localhost:3000/api/orders"),
    ]);

    return {
      props: {
        orders: orderRes.data,
        products: productRes.data,
      },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: {
        orders: [],
        products: [],
      },
    };
  }
};

export default Index;
