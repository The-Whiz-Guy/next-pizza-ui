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

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
        <thead>
  <tr className={styles.trTitle}>
    <th className={styles.th}>Product</th>
    <th className={styles.th}>Name</th>
    <th className={styles.th}>Size</th>
    <th className={styles.th}>Price</th>
    <th className={styles.th}>Quantity</th>
    <th className={styles.th}>Total</th>
    <th className={styles.th}>Action</th>
  </tr>
</thead>
<tbody>
  {cart.length > 0 ? (
    cart.map((product, index) => (
      <tr className={styles.trTitle} key={index}>
        <td className={styles.imgTd}>
          <div className={styles.imgContainer}>
            <Image src={product.img} width={120} height={120} objectFit="cover" alt={product.name} />
          </div>
        </td>
        <td className={styles.textTd}>
          <span className={styles.name}>{product.name }</span>
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
        <td className={styles.textTd}>
          <button className={styles.removeButton} onClick={() => removeFromCart(index)}>Remove</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className={styles.emptyCart}>
        Your cart is empty.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART_TOTAL</h2>
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
