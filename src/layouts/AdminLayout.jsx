// src/layouts/AdminLayout.jsx
import React from "react";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
export default function AdminLayout() {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}
