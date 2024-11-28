import React, { useContext } from "react";
import CartHeader from "../components/cart/CartHeader";
import CartProductByList from "../components/cart/CartProductByList";
// import DEFAULT__PRODUCTS from "../mockData/DefaultProduct";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../components/utility/format";
import { useEffect } from "react";
export default function Cart() {
  const { cartItems, cart, getCart } = useContext(CartContext);
  const products = cartItems;
  const totalPrice = cart.totalPrice;
  useEffect(() => {
    // Gọi hàm getCart để lấy dữ liệu giỏ hàng
    getCart();
  }, []);
  return (
    <>
      <div className="container">
        <div className="grid">
          <h3 class="cart-title"> Danh Mục Sản Phẩm</h3>
          <CartHeader />
          <div className="cart-product-by">
            <CartProductByList products={products} />
            <div class="cart-product-pay">
              <div class="cart-product-total">Tồng Tiền : </div>
              <div class="cart-product-total-price">
                {formatPrice(totalPrice)}
              </div>
              <Link to={"/order"}>
                <button class="btn btn-cart-pay"> Đặt hàng</button>
              </Link>
            </div>
          </div>
        </div>
        <div class="background-bottom"></div>
      </div>
    </>
  );
}
