import React, { useState, useEffect } from "react";
import UserInput from "./UserInput";
import axios from "../../../common/common";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAdmin } from "../../../context/AdminContext";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
const UpdateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");
  const [avatar, setAvatar] = useState(null); // State cho ảnh mới
  const [previewAvatar, setPreviewAvatar] = useState(null); // Xem trước ảnh mới
  const navigate = useNavigate();
  const { userId } = useParams();
  const { getListUser } = useAdmin();
  const { setTriggerFetch } = useContext(UserContext);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/get-details/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.status === 200 && response.data.data) {
          const { name, email, phone, isAdmin, imageUrl } = response.data.data;
          setUsername(name || "");
          setEmail(email || "");
          setPhone(phone || "");
          setRole(isAdmin ? "admin" : "customer");
          setPreviewAvatar(
            imageUrl
              ? `http://localhost:4000${imageUrl}`
              : `http://localhost:4000/uploads/images/avatarDefault.png`
          ); // Hiển thị ảnh hiện tại hoặc ảnh mặc định
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
    getListUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file)); // Hiển thị ảnh xem trước
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("isAdmin", role === "admin");
    if (avatar) {
      formData.append("avatar", avatar); // Thêm ảnh mới nếu có
    }

    try {
      const response = await axios.put(
        `/user/update-user/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("User updated successfully");
        const accessToken = localStorage.getItem("access_token");
        console.log(accessToken);

        const payloadDecode = jwtDecode(accessToken).payload;
        console.log(payloadDecode);

        console.log(payloadDecode);

        if (payloadDecode.isAdmin === true) {
          navigate("/admin/user");
        } else {
          setTriggerFetch((prev) => !prev);
          navigate("/");
        }
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="create-user-container">
      <h2 className="create-user-title">Update User</h2>
      <div className="create-user-form-wrapper">
        <form onSubmit={handleSubmit} className="create-user-form">
          <div className="avatar-upload-section">
            {previewAvatar ? (
              <img
                src={previewAvatar}
                alt="Avatar Preview"
                className="avatar-preview"
              />
            ) : (
              <div className="avatar-placeholder">Upload Avatar</div>
            )}
            <input type="file" onChange={handleAvatarChange} />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <UserInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <UserInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="phone">
              Phone
            </label>
            <UserInput
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="input-group role-select">
            <label className="input-label" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="create-user-button">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
