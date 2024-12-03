import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HeaderUserMenuItem = ({ href, text, separate }) => (
  <li className="header__navbar-user-item">
    <Link to={href}>{text}</Link>
  </li>
);

// HeaderUserMenu Component
const HeaderUserMenu = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    // Lấy giá trị userId mới từ localStorage mỗi khi component được mount
    const storedUserId = localStorage.getItem("userId");

    setUserId(storedUserId);
  }, []);

  return (
    <ul className="header__navbar-user-menu">
      <HeaderUserMenuItem
        href={userId ? `/user/update/${userId}` : "/login"}
        text="Cập nhật thông tin"
      />
      <HeaderUserMenuItem href="/orderStatus" text="Đơn mua" />
      <HeaderUserMenuItem href="/login" text="Đăng xuất" separate />
    </ul>
  );
};

export default HeaderUserMenu;
