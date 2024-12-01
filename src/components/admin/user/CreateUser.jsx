import React, { useState } from "react";
import UserInput from "./UserInput";
// import CheckboxInput from "./CheckboxInput";
import axios from "../../../common/common";
import { useNavigate } from "react-router-dom";
const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState("customer");
  const [avatar, setAvatar] = useState(null); // State cho ảnh
  const [previewAvatar, setPreviewAvatar] = useState(null); // State cho xem trước ảnh
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file)); // Hiển thị ảnh xem trước
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (role === "customer") {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("phone", phone);
    formData.append("isAdmin", isAdmin);
    if (avatar) {
      formData.append("avatar", avatar); // Thêm file ảnh vào formData
    }

    try {
      const response = await axios.post("/user/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        navigate("/admin");
      } else {
        console.error("Failed to create user:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="create-user-container">
      <h2 className="create-user-title">Create User</h2>
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

          <UserInput
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <UserInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <UserInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <UserInput
            type="password"
            placeholder="ConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <UserInput
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="role-select">
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
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
