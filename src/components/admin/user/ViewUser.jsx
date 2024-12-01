import React, { useState, useEffect } from "react";
import axios from "../../../common/common";
import { useParams } from "react-router-dom";

const ViewUser = () => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/get-details/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (response.status === 200 && response.data.data) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);
  // console.log(`http://localhost:4000${userData.imageUrl}`);
  // console.log(`http://localhost:4000/uploads/images/avatarDefault.png`);

  return (
    <div className="view-user-container">
      <h2 className="view-user-title">User Details</h2>
      <div className="view-user-details">
        {userData ? (
          <>
            <div className="view-user-detail-row view-user-detail-row__avtar">
              <img
                src={
                  userData.imageUrl
                    ? `http://localhost:4000${userData.imageUrl}`
                    : `http://localhost:4000/uploads/images/avatarDefault.png` // Đường dẫn đến ảnh mặc định
                }
                className="admin-img"
                alt=""
              />
            </div>
            <div className="view-user-detail-row">
              <span className="view-user-detail-label">Username:</span>
              <span className="view-user-detail-value">{userData.name}</span>
            </div>
            <div className="view-user-detail-row">
              <span className="view-user-detail-label">Email:</span>
              <span className="view-user-detail-value">{userData.email}</span>
            </div>
            <div className="view-user-detail-row">
              <span className="view-user-detail-label">Phone:</span>
              <span className="view-user-detail-value">{userData.phone}</span>
            </div>
            <div className="view-user-detail-row">
              <span className="view-user-detail-label">Role:</span>
              <span className="view-user-detail-value">
                {userData.isAdmin ? "Admin" : "Customer"}
              </span>
            </div>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
