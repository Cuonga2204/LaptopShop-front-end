import React, { createContext, useState, useEffect } from "react";
import axios from "../common/common";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cart, setCart] = useState({
        totalPrice: 0,
        items: [],
    });

    // Lấy dữ liệu giỏ hàng từ backend khi component được render lần đầu
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage
                const accessToken = localStorage.getItem("access_token"); // Lấy token từ localStorage
                const response = await axios.post(
                    "/cart",
                    { userId }, // Gửi userId qua body
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setCart(response.data.data || { items: [], totalPrice: 0 });
                setCartItems(response.data.data.items || []); // Cập nhật giỏ hàng từ API
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, []);

    //
    const getCart = async () => {
        try {
            const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage
            const accessToken = localStorage.getItem("access_token"); // Lấy token từ localStorage
            const response = await axios.post(
                "/cart",
                { userId }, // Gửi userId qua body
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setCart(response.data.data || { items: [], totalPrice: 0 });
            setCartItems(response.data.data.items || []); // Cập nhật giỏ hàng từ API
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    // Thêm vào giỏ hàng

    const addToCart = async (productId, quantity = 1) => {
        try {
            const userId = localStorage.getItem("userId");
            const accessToken = localStorage.getItem("access_token");
            // console.log(userId);
            // console.log(productId);
            // console.log(accessToken);

            const response = await axios.post(
                "/cart/add",
                { userId, productId, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setCartItems(response.data.data.items);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    //Xoá sản phẩm khỏi giỏ hàng
    const removeFromCart = async (productId) => {

        try {
            const accessToken = localStorage.getItem("access_token");
            const userId = localStorage.getItem("userId");
            console.log(userId);
            console.log(productId);
            console.log(accessToken);
            const response = await axios.delete(`http://localhost:4000/api/cart/delete/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        userId, // Gửi userId qua query parameter
                    },
                }
            )
            console.log(response);

            setCartItems(response.data.data.items);
            getCart();
        } catch (error) {
            console.error("Error fetching cart delete:", error);
        }
    };
    // Cập nhập khi ấn button "+" "-"
    const updateQuantity = async (productId, quantity) => {
        try {
            const userId = localStorage.getItem("userId");
            const accessToken = localStorage.getItem("access_token");

            // Gửi yêu cầu API tới backend để cập nhật số lượng
            const response = await axios.put(
                `/cart/update/${productId}`, // Endpoint để cập nhật số lượng sản phẩm
                { userId, quantity }, // Gửi userId và số lượng mới qua body
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Đính kèm token để xác thực
                    },
                }
            );

            // Cập nhật giỏ hàng từ phản hồi của API
            setCart(response.data.data);
            setCartItems(response.data.data.items);
            getCart();
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };
    const clearCart = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const accessToken = localStorage.getItem("access_token");

            await axios.post(
                "/cart/clear",
                { userId },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setCartItems([]);
            setCart({ items: [], totalPrice: 0 });
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };
    return (
        <CartContext.Provider value={{ cart, cartItems, addToCart, removeFromCart, updateQuantity, setCartItems, getCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};