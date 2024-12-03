import React from "react";

export default function AddressCustomer({ orderDataDetail }) {
  return (
    <div className="customer-order-infor">
      <h2 className="address-order-header">Thông tin người nhận</h2>
      <div className="customer-infor">
        Họ tên: {orderDataDetail.shippingInfo.phone}
      </div>
      <div className="customer-infor">
        {" "}
        SDT: {orderDataDetail.shippingInfo.phone}
      </div>
      <div className="customer-infor">
        Email: {orderDataDetail.shippingInfo.email}
      </div>
      <div className="customer-infor">
        Địa chỉ: {orderDataDetail.shippingInfo.address}
      </div>
    </div>
  );
}
