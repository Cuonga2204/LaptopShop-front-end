import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../common/common";
import ProductTable from "../components/admin/product/ProductTable";
import AdminPagination from "../components/admin/AdminPanigation";
import { useAdmin } from "../context/AdminContext";

export default function AdminProduct() {
  const { page } = useParams(); // Lấy số trang từ URL
  const currentPage = Number(page) || 1; // Đảm bảo `currentPage` luôn đồng bộ với URL
  const limit = 5;
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const { products, getListProduct } = useAdmin([]);
  const navigate = useNavigate();
  // console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/product/getAll?page=${currentPage}&limit=${limit}`
        );
        console.log(response);

        const { totalPages } = response.data;
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
    getListProduct(currentPage);
    console.log(products);
  }, [currentPage]);

  const handlePageChange = (page) => {
    navigate(`/admin/product/pages/${page}`); // Cập nhật URL
  };

  return (
    <main className="admin-content">
      <p className="admin-content-title">LIST PRODUCT</p>
      <button
        className="add-user-button"
        onClick={() => navigate("/admin/product/create")}
      >
        Add Product
      </button>
      <ProductTable
        products={products}
        currentPage={currentPage}
        limit={limit}
      />
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
