// src/context/ProductContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Khởi tạo ProductContext
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Hàm lấy tất cả sản phẩm
        const getAllProduct = async () => {
            try {
                const response = await axios.get('/product/getAllProduct');
                if (response.status === 200) {
                    setProducts(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllProduct();
    }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
