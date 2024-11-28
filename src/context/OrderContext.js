import React, { createContext, useState } from "react";
import axios from "../common/common";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const createOrder = async (orderData) => {
        try {
            const userId = localStorage.getItem("userId");
            const accessToken = localStorage.getItem("access_token");
            const response = await axios.post(
                "/order/create",
                { userId, ...orderData },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setOrders([...orders, response.data.data]);
            return response.data;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    };
    const deleteOrder = async (orderId) => {
        try {
            const userId = localStorage.getItem("userId");
            const accessToken = localStorage.getItem("access_token");

            const response = await axios.delete(
                `/order/delete/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: { userId }, // Gửi userId qua body
                }
            );

            // Xóa đơn hàng khỏi danh sách hiện tại
            setOrders(orders.filter((order) => order._id !== orderId));

            return response.data;
        } catch (error) {
            console.error("Error deleting order:", error);
            throw error;
        }
    };
    const getOrderById = async (orderId) => {
        try {
            const userId = localStorage.getItem("userId");
            const accessToken = localStorage.getItem("access_token");

            const response = await axios.get(`/order/detail/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    userId,
                },
            });

            return response.data.data; // Trả về chi tiết đơn hàng
        } catch (error) {
            console.error("Error fetching order by ID:", error);
            throw error;
        }
    };


    const fetchOrders = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const accessToken = localStorage.getItem("access_token");
            const response = await axios.post(
                "/order/getAll",
                { userId },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setOrders(response.data.data || []);
            return response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, createOrder, fetchOrders, deleteOrder, getOrderById }}>
            {children}
        </OrderContext.Provider>
    );
};
