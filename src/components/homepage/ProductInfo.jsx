import React from "react";

export default function ProductInfo({ name, currentPrice, oldPrice }) {
  return (
    <>
      <div className="product-infor">
        <h2 className="product-infor__name">{name}</h2>
        <div className="product-infor__prom">
          <div className="product-infor__price-current">{currentPrice}đ</div>
          <span className="product-infor__price-old">{oldPrice}đ</span>
        </div>
      </div>
    </>
  );
}
