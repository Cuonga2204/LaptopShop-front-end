import React from "react";
import { Link } from "react-router-dom";
import UserTable from "../components/admin/user/UserTable";
import { useAdmin } from "../context/AdminContext";
export default function AdminUser() {
  const { users } = useAdmin();
  console.log(users);

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
