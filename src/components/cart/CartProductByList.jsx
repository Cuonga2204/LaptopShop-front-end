import React from "react";
import CartProductByItem from "./CartProductByItem";

export default function CartProductByList({ products = [] }) {
  return (
    <>
      <ul className="cart-product-by-list">
        {products.map((product, index) => (
          <CartProductByItem key={index} product={product} />
        ))}
      </ul>
    </>
  );
}
