import React from "react";
import { Link } from "react-router-dom";
const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <img src="/img/avatarAdmin.png" alt="" className="admin-img" />
      <h2>Admin</h2>
      <hr className="divider" />
      <Link to="/admin/user" className="admin-sidebar-link">
        <div className="admin-user-info">
          <span>User</span>
        </div>
      </Link>
      <hr className="divider" />
      <Link to="/admin/product" className="admin-sidebar-link">
        <div className="admin-user-info ">
          <span>Product</span>
        </div>
      </Link>
      <hr className="divider" />
      <Link to="/admin/order" className="admin-sidebar-link">
        <div className="admin-user-info ">
          <span>Order</span>
        </div>
      </Link>
      <hr className="divider" />
    </aside>
  );
};

export default AdminSidebar;
