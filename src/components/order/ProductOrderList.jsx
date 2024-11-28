import React from "react";
import ProductOrderItem from "./ProductOrderItem";

export default function ProductOrderList({ products = [] }) {
  return (
    <>
      <ul className="cart-product-by-list">
        {products.map((product, index) => (
          <ProductOrderItem key={index} product={product} />
        ))}
      </ul>
    </>
  );
}
