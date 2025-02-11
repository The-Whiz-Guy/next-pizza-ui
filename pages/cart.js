"use client";

import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import OrderDetail from "../components/OrderDetail";
import { useRouter } from "next/router";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);

      // Ensure navbar updates when cart is loaded
      const event = new Event("cartUpdated");
      window.dispatchEvent(event);
    }
  }, []);

  const handleCheckout = () => {
    setOpen(true);
  };

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        localStorage.removeItem("cart");
        setCart([]);
        const event = new Event("cartUpdated");
        window.dispatchEvent(event);
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((product, index) => (
                <tr className={styles.tr} key={index}>
                  <td className={styles.imgTd}>
                    <div className={styles.imgContainer}>
                      <Image src={product.img} width={80} height={80} objectFit="cover" alt={product.name} />
                    </div>
                  </td>
                  <td className={styles.textTd}>
                    <span className={styles.name}>{product.name || "Unnamed"}</span>
                  </td>
                  <td className={styles.textTd}>
                    <span className={styles.size}>{product.size || "N/A"}</span>
                  </td>
                  <td className={styles.textTd}>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                  </td>
                  <td className={styles.textTd}>
                    <span className={styles.quantity}>{product.quantity}</span>
                  </td>
                  <td className={styles.textTd}>
                    <span className={styles.total}>${(product.price * product.quantity).toFixed(2)}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.emptyCart}>
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$
            {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$
            {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton} onClick={() => setCash(true)}>
                CASH ON DELIVERY
              </button>
            </div>
          ) : (
            <button className={styles.button} onClick={handleCheckout}>CHECKOUT NOW!</button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
