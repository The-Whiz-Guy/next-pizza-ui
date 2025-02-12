import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState(["", "", ""]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState({ text: "", price: "" });

  // Update price in state
  const changePrice = (e, index) => {
    const updatedPrices = [...prices];
    updatedPrices[index] = e.target.value;
    setPrices(updatedPrices);
  };

  // Handle input for extra toppings
  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  // Add extra topping to the list
  const handleExtra = () => {
    if (extra.text && extra.price) {
      setExtraOptions((prev) => [...prev, extra]);
      setExtra({ text: "", price: "" }); // Reset input fields
    } else {
      alert("Please enter both item name and price for the extra option.");
    }
  };

  // Handle product creation
  const handleCreate = async () => {
    if (!file || !title || !desc || prices.some(price => price === "")) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset","pizza-app");

    try {
      // Upload image to Cloudinary
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/pizza-app/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newProduct = {
        title,
        desc,
        prices: prices.map(Number), // Ensure prices are numbers
        extraOptions,
        img: url,
      };

      console.log("Submitting product:", newProduct);

      // Send new product data to API
      await axios.post("http://localhost:3000/api/products", newProduct);

      setClose(true);
    } catch (err) {
      console.error("Error creating product:", err.response?.data || err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>

        {/* Image Upload */}
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        {/* Title Input */}
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description Input */}
        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <textarea
            rows={4}
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* Prices Input */}
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            {["Small", "Medium", "Large"].map((size, index) => (
              <input
                key={size}
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder={size}
                value={prices[index]}
                onChange={(e) => changePrice(e, index)}
              />
            ))}
          </div>
        </div>

        {/* Extra Options */}
        <div className={styles.item}>
          <label className={styles.label}>Extras</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              value={extra.text}
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              value={extra.price}
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option, index) => (
              <span key={index} className={styles.extraItem}>
                {option.text} (${option.price})
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
