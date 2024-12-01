import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPen } from "@fortawesome/free-solid-svg-icons";
import OrderStatusProductList from "../components/orderStatus/OrderStatusProductList";
import ProductOrderHeader from "../components/order/ProductOrderHeader";
import ProductOrderList from "../components/order/ProductOrderList";
import AddressCustomer from "../components/orderStatus/AddressCustomer";
import { OrderContext } from "../context/OrderContext";
import { formatPrice } from "../components/utility/format";

export default function OrderStatus() {
  const { orders, fetchOrders, deleteOrder, getOrderById } =
    useContext(OrderContext);
  const [orderDetail, setOrderDetail] = useState(false);
  const [orderDataDetail, setOrderDataDetail] = useState(null);
  const [orderStatusHeader, setOrderStatusHeader] = useState("Chờ xác nhận");

  // Lấy danh sách đơn hàng từ backend khi component được mount
  useEffect(() => {
    fetchOrders();
  }, []);
  const closeModal = () => {
    setOrderDetail(false);
    setOrderDataDetail(null);
  };

  const handleViewOrderDetail = async (orderId) => {
    try {
      const orderDetails = await getOrderById(orderId); // Lấy chi tiết từ backend
      setOrderDataDetail(orderDetails); // Lưu chi tiết đơn hàng vào state
      setOrderDetail(true); // Hiển thị modal
    } catch (error) {
      console.error("Error loading order details:", error);
      alert("Không thể tải chi tiết đơn hàng.");
    }
  };

  const handleRemoveOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      alert(`Đơn hàng ${orderId} đã bị xóa.`);

      setOrderDetail(false);
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Có lỗi xảy ra khi xóa đơn hàng.");
    }
  };

  // Lọc đơn hàng theo trạng thái
  const filteredOrders =
    orderStatusHeader === "Chờ xác nhận"
      ? orders.filter((order) => order.status === "Chờ xác nhận")
      : orders.filter((order) => order.status === orderStatusHeader);

  const menuItems = ["Chờ xác nhận", "Chờ giao hàng", "Hoàn thành"];

  return (
    <div className="container">
      <div className="grid">
        <div className="grid__row">
          {/* Sidebar thông tin user */}
          <div className="grid__row-column-2-4">
            <div className="account">
              <div className="base-icon">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="base-icon-account"
                />
              </div>
              <div className="account-edit">
                <span className="account-name">Cuonga2242002</span>
                <div className="account-edit-infor">
                  <FontAwesomeIcon icon={faPen} />
                  <span>Chỉnh sửa hồ sơ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Danh sách đơn hàng */}
          <div className="grid__row-column-9-6">
            <div className="product-header-status">
              {menuItems.map((item) => (
                <div
                  key={item}
                  className={`product-header-status__menu ${
                    orderStatusHeader === item ? "active" : ""
                  }`}
                  onClick={() => setOrderStatusHeader(item)}
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <OrderStatusProductList
                  products={order.items}
                  key={index}
                  order={order}
                  handleViewOrderDetail={() => handleViewOrderDetail(order._id)}
                />
              ))
            ) : (
              <div className="order-status-empty">
                <img
                  className="order-status-empty__img"
                  src="/img/OrderEmpty.png"
                  alt="Empty orders"
                />
              </div>
            )}

            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <OrderStatusProductList
                  products={order.items}
                  key={index}
                  order={order}
                  handleViewOrderDetail={() => handleViewOrderDetail(order._id)}
                />
              ))
            ) : (
              <div className="order-status-empty"></div>
            )}
          </div>
        </div>
      </div>

      {/* Chi tiết đơn hàng */}
      {orderDetail && (
        <div className="modal">
          <div className="modal__overlay" onClick={closeModal}></div>
          <div className="modal-body-product-order">
            <AddressCustomer orderDataDetail={orderDataDetail} />
            <ProductOrderHeader />
            <ProductOrderList
              products={orderDataDetail.items}
              setOrderDetail={setOrderDetail}
            />
            <div className="cart-product-pay">
              <div className="cart-product-total">Tổng Tiền: </div>
              <div className="cart-product-total-price">
                {formatPrice(orderDataDetail.totalPrice)}
              </div>
            </div>
            <button
              className="btn btn-cancel"
              onClick={() => handleRemoveOrder(orderDataDetail._id)}
            >
              Huỷ đơn hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
