"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length > 0 ? cart.reduce((total, item) => total + item.quantity, 0) : 0);
    }
  };

  useEffect(() => {
    updateCartCount(); // Initial load

    // Listen for cart updates
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="Call" width="35" style={{ objectFit: "cover" }} height="38" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}><Link href="/">Homepage</Link></li>
          <li className={styles.listItem}><Link href="/products">Products</Link></li>
          <li className={styles.listItem}><Link href="/menu">Menu</Link></li>
          <Image src="/img/logo.png" alt="Logo" width="160" height="69" style={{ objectFit: "cover" }} />
          <li className={styles.listItem}><Link href="/events">Events</Link></li>
          <li className={styles.listItem}><Link href="/blog">Blog</Link></li>
          <li className={styles.listItem}><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href="/cart">
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="Cart" width="30" height="30" style={{ objectFit: "cover" }} />
            <div className={styles.counter}>{cartCount}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
