import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { useState } from "react";
import AddressCustomer from "../../orderStatus/AddressCustomer";
import ProductOrderHeader from "../../order/ProductOrderHeader";
import ProductOrderList from "../../order/ProductOrderList";
import { formatPrice } from "../../utility/format";
import { useAdmin } from "../../../context/AdminContext";
import axios from "axios";
const OrderTable = ({ orders }) => {
  const { deleteOrder, getOrderById } = useContext(OrderContext);
  const [orderDetail, setOrderDetail] = useState(false);
  const [orderDataDetail, setOrderDataDetail] = useState(null);
  const { getListOrder } = useAdmin();
  const [status, setStatus] = useState();
  const statusColors = {
    "Chờ xác nhận": "#f8d7da",
    "Chờ giao hàng": "#fff3cd",
    "Hoàn thành": "#d4edda",
  };
  const closeModal = () => {
    setOrderDetail(false);
    setOrderDataDetail(null);
  };
  const handleView = async (orderId) => {
    try {
      console.log(orderId);

      const orderDetails = await getOrderById(orderId); // Lấy chi tiết từ backend
      setOrderDataDetail(orderDetails); // Lưu chi tiết đơn hàng vào state
      setOrderDetail(true); // Hiển thị modal
    } catch (error) {
      console.error("Error loading order details:", error);
      alert("Không thể tải chi tiết đơn hàng.");
    }
  };
  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      //   alert(`Đơn hàng ${orderId} đã bị xóa.`);
      getListOrder();
      setOrderDetail(false);
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Có lỗi xảy ra khi xóa đơn hàng.");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put("/order/update-status", {
        orderId,
        status: newStatus,
      });

      if (response.status === 200) {
        console.log("Status updated successfully");
        getListOrder();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  return (
    <>
      <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>OrderId</th>
              <th>Customer Name</th>
              <th>Total</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.orderId}</td>
                <td>{order.userName}</td>
                <td>{formatPrice(order.totalPrice)}</td>
                <td>
                  <select
                    className="status-select"
                    style={{
                      backgroundColor: statusColors[order.status],
                    }}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.orderId, e.target.value)
                    }
                  >
                    <option
                      value="Chờ xác nhận"
                      style={{ backgroundColor: "#f8d7da" }}
                    >
                      Đang xử lý
                    </option>
                    <option
                      value="Chờ giao hàng"
                      style={{ backgroundColor: "#fff3cd" }}
                    >
                      Chờ giao hàng
                    </option>
                    <option
                      value="Hoàn thành"
                      style={{ backgroundColor: "#d4edda" }}
                    >
                      Hoàn thành
                    </option>
                  </select>
                </td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => handleView(order.orderId)}
                  >
                    <FontAwesomeIcon icon={faEye} />{" "}
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(order.orderId)}
                  >
                    <FontAwesomeIcon icon={faTrash} />{" "}
                    {/* Icon thùng rác để xóa */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
          </div>
        </div>
      )}
    </>
  );
};

export default OrderTable;
