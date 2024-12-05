import React from "react";
import OrderTable from "../components/admin/order/OrderTable";
import { useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { Context } from "ckeditor5";
import { useAdmin } from "../context/AdminContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminPagination from "../components/admin/AdminPanigation";
export default function AdminOrder() {
  const { orders, getListOrder } = useAdmin();
  const { page } = useParams(); // Lấy số trang từ URL
  const currentPage = Number(page) || 1; // Đảm bảo `currentPage` luôn đồng bộ với URL
  const limit = 5;
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `/order/getAllOrderPage?page=${currentPage}&limit=${limit}`
        );
        console.log(response);

        const { totalPages } = response.data;
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchOrders();
    getListOrder(currentPage);
  }, [currentPage]);
  console.log(orders);
  const handlePageChange = (page) => {
    navigate(`/admin/order/pages/${page}`); // Cập nhật URL
  };
  return (
    <main className="admin-content">
      <>
        <p className="admin-content-title">LIST ORDER</p>
        <OrderTable orders={orders} getListOrder={getListOrder} />
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    </main>
  );
}
