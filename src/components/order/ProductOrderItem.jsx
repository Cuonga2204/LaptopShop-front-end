import React from "react";
import { formatPrice } from "../utility/format";
export default function ProductOrderItem({ product }) {
  return (
    <>
      <li class="cart-product-by-item">
        <div class="cart-header__name">
          <img
            src={`https://laptopshop-back-end-1.onrender.com${product.imageProduct}`}
            alt=""
          />
          {product.name}
        </div>
        <div class="cart-header__price order-list-product">
          {formatPrice(product.price)}
        </div>
        <div className="product-order-quantity">
          <span>x{product.quantity} </span>
        </div>
        <div class="cart-header__cart-header__price-total">
          {formatPrice(product.price * product.quantity)}
        </div>
      </li>
    </>
  );
}
