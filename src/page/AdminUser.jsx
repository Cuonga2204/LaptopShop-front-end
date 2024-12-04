import React from "react";
import { Link } from "react-router-dom";
import UserTable from "../components/admin/user/UserTable";
import { useAdmin } from "../context/AdminContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminPagination from "../components/admin/AdminPanigation";
export default function AdminUser() {
  const { page } = useParams(); // Lấy số trang từ URL
  const currentPage = Number(page) || 1; // Đảm bảo `currentPage` luôn đồng bộ với URL
  const limit = 5;
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const navigate = useNavigate();
  const { users, getListUser } = useAdmin();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `/user/getAll?page=${currentPage}&limit=${limit}`
        );
        console.log(response);

        const { totalPages } = response.data;
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchUsers();
    getListUser(currentPage);
    console.log(users);
  }, [currentPage]);

  const handlePageChange = (page) => {
    navigate(`/admin/user/pages/${page}`); // Cập nhật URL
  };
  // useEffect(() => {
  //   getListUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // console.log(users);

  return (
    <main className="admin-content">
      <>
        <p className="admin-content-title">LIST USER</p>
        <Link to="create">
          <button className="add-user-button">Add User</button>
        </Link>
        <UserTable users={users} currentPage={currentPage} limit={limit} />
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    </main>
  );
}
