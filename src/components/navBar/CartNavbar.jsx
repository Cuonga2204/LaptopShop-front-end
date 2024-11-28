import React, { useContext } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Cart = () => {
  const { cartItems, getCart } = useContext(CartContext);
  useEffect(() => {
    const fetchCart = async () => {
      getCart();
    };

    fetchCart();
  }, []);
  return (
    <div className="header__cart-list">
      {!cartItems || cartItems.length === 0 ? (
        <>
          <img
            src="/img/no_cart.png"
            alt="No cart"
            className="header__cart-no-cart-img"
          />
          <span className="header__cart-no-cart-msg">Chưa có sản phẩm</span>
        </>
      ) : (
        <>
          <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
          <ul className="header__cart-list-item">
            {cartItems.map((item, index) => (
              <CartItem
                id={item.product}
                key={index}
                imageProduct={`http://localhost:4000${item.imageProduct}`}
                name={item.nameProduct}
                currentPrice={item.price}
                quantity={item.quantity}
              />
            ))}
          </ul>
          <Link to={"/Cart"}>
            <a href="/" className="header__cart-view-cart btn btn--primary">
              Xem giỏ hàng
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
