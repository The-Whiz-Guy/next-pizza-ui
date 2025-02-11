import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      localStorage.setItem("cart", JSON.stringify(storedCart));
    }
  }, []);

  const changePrice = (difference) => {
    setPrice((prev) => prev + difference);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras((prev) => prev.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists (matching id & size)
    const existingItemIndex = cart.findIndex(
      (item) => item.id === pizza._id && item.size === ["Small", "Medium", "Large"][size]
    );

    if (existingItemIndex !== -1) {
      // If exists, update the quantity instead of adding new
      cart[existingItemIndex].quantity = quantity;
      cart[existingItemIndex].price = price;
      cart[existingItemIndex].extras = extras;
    } else {
      // Otherwise, add new item
      cart.push({
        id: pizza._id,
        name: pizza.name,
        img: pizza.img,
        price,
        size: ["Small", "Medium", "Large"][size],
        extras,
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Trigger event for navbar update
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} width={500} height={500} objectFit="contain" alt={pizza.name} />
        </div>
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>${price.toFixed(2)}</span>
        <p className={styles.desc}>{pizza.desc}</p>

        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          {[0, 1, 2].map((sizeIndex, index) => (
            <div key={sizeIndex} className={styles.size} onClick={() => handleSize(sizeIndex)}>
              <Image src="/img/size.png" width={40 + index * 10} height={40 + index * 10} objectFit="contain" alt={`Size ${sizeIndex}`} />
              <span className={styles.number}>{["Small", "Medium", "Large"][sizeIndex]}</span>
            </div>
          ))}
        </div>

        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input type="checkbox" id={option.text} name={option.text} className={styles.checkbox} onChange={(e) => handleChange(e, option)} />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>

        <div className={styles.add}>
          <input
            type="number"
            value={quantity}
            className={styles.quantity}
            min="1"
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          />
          <button className={styles.button} onClick={handleClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
