import React from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="admin-nav-links">
        <Link to="/">Home</Link> {/* Thay a bằng Link */}
        <Link to="/contact">Contact</Link> {/* Thay a bằng Link */}
      </div>
      <div className="admin-logout">
        <p>Logout</p>
        <FontAwesomeIcon
          className="admin-logout-icon"
          icon={faRightFromBracket}
        />
      </div>
    </header>
  );
};

export default AdminHeader;
