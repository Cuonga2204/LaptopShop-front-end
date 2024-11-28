import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import ProductOrderList from "../components/order/ProductOrderList";
import ProductOrderHeader from "../components/order/ProductOrderHeader";
import { useState } from "react";
import ModalSuccess from "../components/order/ModalSuccess";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../components/utility/format";
import { OrderContext } from "../context/OrderContext";
export default function Order() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);

  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  // const products = [...cartItems];
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const orderData = {
        shippingInfo: formData,
        items: cartItems,
        totalPrice,
      };
      await createOrder(orderData);
      await clearCart();
      setIsModalSuccess(true);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="grid">
          <div className="background-empty"></div>
          <h3 className=" Order-title">Thanh Toán</h3>
          <div className="inforOrder-cart inforOrder cart-product-by">
            <ProductOrderHeader />
            <ProductOrderList products={cartItems} />
            <div class="cart-product-pay">
              <div class="cart-product-total">Tồng Tiền : </div>
              <div class="cart-product-total-price">
                {formatPrice(totalPrice)}
              </div>
            </div>
          </div>
          <div className="inforOrder inforOrder-infor">
            <div className="inforOrder__header">
              <FontAwesomeIcon
                icon={faBox}
                className="inforOrder__header-icon"
              />
              <span className="inforOrder__header-title">
                Thông tin người nhận hàng
              </span>
            </div>
            <div className="customerInfor">
              <div className="customerInfor-name-phone">
                <input
                  className="input-infor input-infor_1-2"
                  type="text"
                  placeholder="Nhập họ và tên"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  className="input-infor input-infor_1-2"
                  type="text"
                  placeholder="Nhập số điện thoại"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="customerAddress">
              <div className="customerAddress__header">
                <h2>Địa chỉ nhận hàng</h2>

                <input
                  className="input-infor input-infor_1-0"
                  type="text"
                  placeholder="Nhập địa chỉ của bạn"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <button className="btn btn-pay" onClick={handleSubmit}>
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
      {isModalSuccess && <ModalSuccess />}

      {/* Thông báo đặt hàng thành công */}
    </>
  );
}
