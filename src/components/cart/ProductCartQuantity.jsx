import React, { useContext } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../context/CartContext";
export default function ProductCartQuantity({
  productId,
  quantity,
  setQuantity,
}) {
  const { updateQuantity } = useContext(CartContext);
  const incrementCart = () => updateQuantity(productId, quantity + 1);
  const decrementCart = () => updateQuantity(productId, quantity - 1);

  return (
    <>
      <div className="product-view-quantity-input">
        <button className="product-view-quantity-btn" onClick={decrementCart}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input
          type="text"
          value={quantity}
          readOnly
          className="product-view-quantity__input"
        />
        <button className="product-view-quantity-btn" onClick={incrementCart}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </>
  );
}
