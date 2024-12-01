import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ProductTable = ({ products, onDelete, onEdit, onView }) => {
  const navigate = useNavigate();
  const { getListProduct } = useAdmin();
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`/product/delete/${productId}`);
      if (response.status === 200) {
        console.log("User delete successfully");
        getListProduct();
        navigate("/admin/product");
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error delete user:", error);
    }
  };
  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>
                <img
                  src={`http://localhost:4000${product.imageUrl}`}
                  alt={product.name}
                  className="product-image"
                />
              </td>
              <td>{product.price}đ</td>
              <td>
                <td>
                  <Link to={`${product.id}`}>
                    <button className="view-button">
                      <FontAwesomeIcon icon={faEye} />{" "}
                    </button>
                  </Link>
                  <Link to={`update/${product.id}`}>
                    <button className="edit-button">
                      <FontAwesomeIcon icon={faEdit} />{" "}
                    </button>
                  </Link>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />{" "}
                    {/* Icon thùng rác để xóa */}
                  </button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
