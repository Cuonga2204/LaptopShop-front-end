import { Link } from "react-router-dom";

const HeaderUserMenuItem = ({ href, text, separate }) => (
  <li className="header__navbar-user-item">
    <Link to={href}>{text}</Link>
  </li>
);
const userId = localStorage.getItem("userId");
// HeaderUserMenu Component
const HeaderUserMenu = () => (
  <ul className="header__navbar-user-menu">
    <HeaderUserMenuItem
      href={`/user/update/${userId}`}
      text="Cập nhập thông tin"
    />
    <HeaderUserMenuItem href="/orderStatus" text="Đơn mua" />
    <HeaderUserMenuItem href="/login" text="Đăng xuất" separate />
  </ul>
);

export default HeaderUserMenu;
