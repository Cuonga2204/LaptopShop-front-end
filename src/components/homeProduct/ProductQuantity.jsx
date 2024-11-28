import React, { useContext } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../context/CartContext";
export default function ProductQuantity({ productId, quantity, setQuantity }) {
  const { updateQuantity } = useContext(CartContext);
  const increment = () => updateQuantity(productId, quantity + 1);
  const decrement = () => updateQuantity(productId, quantity - 1);

  return (
    <>
      <div className="product-view-quantity-input">
        <button className="product-view-quantity-btn" onClick={decrement}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input
          type="text"
          value={quantity}
          readOnly
          className="product-view-quantity__input"
        />
        <button className="product-view-quantity-btn" onClick={increment}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </>
  );
}
