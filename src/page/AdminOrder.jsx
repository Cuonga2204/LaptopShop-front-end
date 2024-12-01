import React from "react";
import OrderTable from "../components/admin/order/OrderTable";
import { useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { Context } from "ckeditor5";
import { useAdmin } from "../context/AdminContext";

export default function AdminOrder() {
  const { orders, getListOrder } = useAdmin();
  useEffect(() => {
    getListOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(orders);

  return (
    <main className="admin-content">
      <>
        <p className="admin-content-title">LIST ORDER</p>
        <OrderTable orders={orders} getListOrder={getListOrder} />
      </>
    </main>
  );
}
