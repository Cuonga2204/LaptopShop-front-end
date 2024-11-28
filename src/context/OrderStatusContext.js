import React, { createContext, useState } from "react";

export const OrderStatusContext = createContext();

export const OrderStatusProvider = ({ children }) => {

    const [orderList, setOrderList] = useState([]);
    const [orderDetail, setOrderDetail] = useState(null);

    return (
        <OrderStatusContext.Provider value={{ orderList, setOrderList, orderDetail, setOrderDetail }}>
            {children}
        </OrderStatusContext.Provider>
    );
};
