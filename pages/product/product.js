import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Product = ({ pizza }) => {
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    const product = {
      id: pizza._id,
      name: pizza.name,
      price,
      size,
      extras,
      quantity,
      img: pizza.img,
    };
    addToCart(product);
  };
};
