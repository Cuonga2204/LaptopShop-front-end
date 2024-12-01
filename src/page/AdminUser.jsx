import React from "react";
import { Link } from "react-router-dom";
import UserTable from "../components/admin/user/UserTable";
import { useAdmin } from "../context/AdminContext";
import { useEffect } from "react";
export default function AdminUser() {
  const { users, getListUser } = useAdmin();
  useEffect(() => {
    getListUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(users);

  return (
    <main className="admin-content">
      <>
        <p className="admin-content-title">LIST USER</p>
        <Link to="create">
          <button className="add-user-button">Add User</button>
        </Link>
        <UserTable users={users} />
      </>
    </main>
  );
}
