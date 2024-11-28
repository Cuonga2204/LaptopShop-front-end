import React from "react";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function AddProduct({ product, quantity }) {
  const { addToCart } = useContext(CartContext);
  return (
    <>
      <div className="add-product">
        <Link className="product-link" to={`/products/${product._id}`}>
          <button className="btn add-product-buy">Xem chi tiết</button>
        </Link>
        <button
          className="btn add-product-cart"
          onClick={() => addToCart(product._id, quantity)}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </>
  );
}
