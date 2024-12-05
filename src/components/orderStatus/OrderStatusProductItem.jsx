import React from "react";
import { formatPrice } from "../utility/format";
export default function OrderStatusProductItem({
  product,
  handleViewOrderDetail,
}) {
  // console.log(orderList);
  // console.log(orderListIndex);
  // console.log(1);
  return (
    <>
      <li className="product-order-item">
        <div className="product-order-infor">
          <img
            src={`https://laptopshop-back-end-1.onrender.com${product.imageProduct}`}
            alt=""
          />
          <span className="product-order-infor__name">{product.name}</span>
          <div className="product-order-quantity">
            <span>x{product.quantity}</span>
          </div>
          <div className="product-order-price">
            <div className="product-order-price__current">
              {formatPrice(product.price)}
            </div>
            <span className="product-order-price__old">
              {product.oldPrice}{" "}
            </span>
          </div>
        </div>
        <div className="product-order-price-total">
          <span>
            Thành tiền :
            <span className="product-order-price-total-number">
              {formatPrice(product.price)}
            </span>
          </span>
          <div className="product-order-price-total__current"></div>
        </div>
        <div className="product-order-btn">
          {/* <button className="btn btn-cancel"> Huỷ</button> */}
          <button className="btn btn-contact" onClick={handleViewOrderDetail}>
            Xem chi tiết đơn hàng
          </button>
        </div>
      </li>
    </>
  );
}
