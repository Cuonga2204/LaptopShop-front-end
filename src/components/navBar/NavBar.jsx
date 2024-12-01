import React, { useContext, useEffect } from "react";
import CartNavbar from "./CartNavbar";
import { CartContext } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCartShopping,
  faCircleUser,
  faFileInvoiceDollar,
  faFileLines,
  faGamepad,
  faLaptop,
  faLaptopCode,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import HeaderUserMenu from "./HeaderUserMenu";
import { useState } from "react";
import axios from "axios";
const HeaderLogo = () => {
  return (
    <Link to={"/"}>
      <div className="header-logo">
        <img src="/img/Logo3.png" className="header__logo-img" alt="" />
      </div>
    </Link>
  );
};

// Component con HeaderSearchHistory
const HeaderSearchHistory = () => {
  return (
    <div className="header-search-history">
      <h3 className="header-search-history__heading">Lịch sử tìm kiếm</h3>
      <ul className="header-search-history-list">
        <li className="header-search-history-item">
          <a href="/" className="">
            Laptop gamming
          </a>
        </li>
        <li className="header-search-history-item">
          <a href="/" className="">
            Laptop Văn phòng
          </a>
        </li>
        <li className="header-search-history-item">
          <a href="/" className="">
            Laptop HP
          </a>
        </li>
      </ul>
    </div>
  );
};

// Component con HeaderMenuItem
const HeaderMenuItem = ({ iconName, iconClass, title, onClick }) => {
  return (
    <li className="header-menu-list__item" onClick={onClick}>
      <div>
        <FontAwesomeIcon icon={iconName} className={iconClass} />
        <span>{title}</span>
      </div>
    </li>
  );
};

const HeaderSearchListItem = ({ iconName, iconClass, title, itemClass }) => {
  const { cartItems } = useContext(CartContext);
  const countProducts = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <li className={itemClass}>
      <div className="base-icon">
        {title === "Giỏ hàng" ? (
          <Link to={"/Cart"}>
            <FontAwesomeIcon icon={iconName} className={iconClass} />
          </Link>
        ) : (
          <FontAwesomeIcon icon={iconName} className={iconClass} />
        )}
        {/* <FontAwesomeIcon icon={iconName} className={iconClass} /> */}
        {title === "Giỏ hàng" && (
          <span className="header__cart-notice">{countProducts} </span>
        )}
      </div>
      <span className="header-search-list-item-name">{title}</span>
      <CartNavbar />

      <HeaderUserMenu />
    </li>
  );
};
const NavBar = ({ setFilter }) => {
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId");
  // console.log(userId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/get-details/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (response.status === 200 && response.data.data) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  // console.log(userData);

  // console.log(`http://localhost:4000${userData.imageUrl}`);
  // console.log(`http://localhost:4000/uploads/images/avatarDefault.png`)
  const handleFilterClick = (filter) => {
    setFilter(filter);
  };

  return (
    <div>
      <header className="header">
        <div className="header-search">
          <div className="grid">
            <div className="header-wrap">
              <HeaderLogo />
              <div className="header-filter-search">
                <input
                  className="header-filter-search__input"
                  type="text"
                  placeholder="Nhập tên máy tính, phụ kiện máy tính, ... cần tìm"
                />
                <HeaderSearchHistory />
                <button className="header-filter-search__button">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="header-filter-search-btn-icon fa-solid fa-magnifying-glass"
                  />
                </button>
              </div>
              <ul className="header-search-list">
                <HeaderSearchListItem
                  itemClass="header-search-list__item"
                  iconName={faFileLines}
                  iconClass="fa-solid fa-file-lines"
                  title="Thông tin hay"
                />
                <HeaderSearchListItem
                  itemClass="header-search-list__item"
                  iconName={faFileInvoiceDollar}
                  iconClass="fa-solid fa-file-invoice-dollar"
                  title="Thanh toán & Tiện ích"
                />
                <li className="header-search-list__item header__navbar-user">
                  {userData?.imageUrl ? (
                    <img
                      src={`http://localhost:4000${userData.imageUrl}`}
                      alt="Avatar"
                      className="header-avatar-img"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="header-avatar-icon"
                    />
                  )}
                  <span className="header-avatar-name">
                    {userData?.name || "Tài khoản của tôi"}
                  </span>
                  <HeaderUserMenu />
                </li>
                {/* <img src={`http://localhost:4000${userData.imageUrl}`} alt="" /> */}
                <HeaderSearchListItem
                  itemClass="header-search-list__item header__navbar-cart"
                  iconName={faCartShopping}
                  iconClass="fa-solid fa-cart-shopping"
                  title="Giỏ hàng"
                />
              </ul>
            </div>
          </div>
        </div>
        <div className="header-menu">
          <div className="grid">
            <ul className="header-menu-list">
              <HeaderMenuItem
                iconName={faLaptop}
                iconClass="fa-solid fa-mobile-screen-button"
                title="TẤT CẢ"
                onClick={() => handleFilterClick("TẤT CẢ")}
              />
              <HeaderMenuItem
                iconName={faLaptop}
                iconClass="fa-solid fa-mobile-screen-button"
                title="HP"
                onClick={() => handleFilterClick("HP")}
              />
              <HeaderMenuItem
                iconName={faCoffee}
                iconClass="fa-solid fa-laptop"
                title="DELL"
                onClick={() => handleFilterClick("DELL")}
              />
              <HeaderMenuItem
                iconName={faGamepad}
                iconClass="fa-solid fa-tablet-screen-button"
                title="ASUS"
                onClick={() => handleFilterClick("ASUS")}
              />
              <HeaderMenuItem
                iconName={faLaptopCode}
                iconClass="fa-brands fa-apple"
                title="MACBOOK"
                onClick={() => handleFilterClick("MACBOOK")}
              />
              <HeaderMenuItem
                iconName={faLaptop}
                iconClass="fa-solid fa-computer"
                title="ACER"
                onClick={() => handleFilterClick("ACER")}
              />
              <HeaderMenuItem
                iconName={faLaptopCode}
                iconClass="fa-solid fa-headphones"
                title="LG"
                onClick={() => handleFilterClick("LG")}
              />
              <HeaderMenuItem
                iconName={faLaptop}
                iconClass="fa-solid fa-sim-card"
                title="RAZER"
                onClick={() => handleFilterClick("RAZER")}
              />
              <HeaderMenuItem
                iconName={faLaptop}
                iconClass="fa-brands fa-salesforce"
                title="LENOVO"
                onClick={() => handleFilterClick("LENOVO")}
              />
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
