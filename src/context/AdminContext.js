// src/context/AdminContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../common/common";
// Tạo AdminContext
const AdminContext = createContext();



// Custom hook để sử dụng AdminContext dễ dàng hơn
export const useAdmin = () => useContext(AdminContext);

// Component Provider cho AdminContext
export const AdminProvider = ({ children }) => {
    const [selectedContent, setSelectedContent] = useState("User");
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    async function getListUser() {
        try {
            const response = await axios.get("/user/getAll");

            if (response.status === 200 && response.data.data) {
                const fetchedUsers = response.data.data.map((user, index) => ({
                    stt: index + 1,
                    id: user._id,
                    username: user.name || "N/A",
                    role: user.isAdmin ? "admin" : "customer",
                    email: user.email,
                }));
                setUsers(fetchedUsers);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getListProduct(page = 1, limit = 5) {
        try {
            const response = await axios.get(`/product/getAll?page=${page}&limit=${limit}`);
            if (response.status === 200 && response.data.data) {
                const fetchedProducts = response.data.data.map((product, index) => ({
                    stt: (page - 1) * limit + index + 1,
                    id: product._id,
                    name: product.name,
                    price: product.currentPrice,
                    imageUrl: product.imageUrl,
                }));
                setProducts(fetchedProducts); // Cập nhật danh sách sản phẩm
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        getListUser();

        getListProduct();

    }, []);

    // Hàm để thay đổi nội dung được chọn
    const changeContent = (content) => setSelectedContent(content);

    return (
        <AdminContext.Provider value={{ selectedContent, changeContent, users, products, setUsers, setProducts, getListUser, getListProduct }}>
            {children}
        </AdminContext.Provider>
    );
};
