import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../common/common";
import { useAdmin } from "../../../context/AdminContext";
const UserTable = ({ users }) => {
  const { getListUser } = useAdmin();
  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.delete(`/user/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log("User delete successfully");
        getListUser();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error delete user:", error);
    }
  };
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.stt}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`${user.id}`}>
                  <button className="view-button">
                    <FontAwesomeIcon icon={faEye} />{" "}
                    {/* Icon mắt để xem chi tiết */}
                  </button>
                </Link>
                <Link to={`update/${user.id}`}>
                  <button className="edit-button">
                    <FontAwesomeIcon icon={faEdit} />{" "}
                    {/* Icon bút chì để sửa */}
                  </button>
                </Link>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(user.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />{" "}
                  {/* Icon thùng rác để xóa */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
