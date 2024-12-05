import React, { useState, useEffect } from "react";
import axios from "../../../common/common";
import { useParams } from "react-router-dom";
// import "./ViewProduct.css"; // Import CSS file mới

const ViewProduct = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    countInStock: 0,
    currentPrice: 0,
    oldPrice: "",
    imageUrl: "",
    config: [],
    description: "",
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/product/get-details/${productId}`);
        if (response.status === 200 && response.data.data) {
          const product = response.data.data;
          setProductData({
            name: product.name,
            countInStock: product.countInStock,
            currentPrice: product.currentPrice,
            oldPrice: product.oldPrice,
            config: Array.isArray(product.config)
              ? product.config
              : product.config.split(", "),
            description: product.description,
            imageUrl: `https://laptopshop-back-end-1.onrender.com${product.imageUrl}`,
          });
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [productId]);

  return (
    <div className="product-detail-container">
      <h2 className="product-detail-title">CHI TIẾT SẢN PHẨM</h2>
      <div className="product-detail-card">
        <div className="form-group">
          <label>Hình ảnh sản phẩm:</label>
          {productData.imageUrl && (
            <div className="image-preview">
              <img
                src={productData.imageUrl}
                alt="Product Preview"
                className="product-image-large"
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Tên sản phẩm:</label>
          <p className="view-only">{productData.name}</p>
        </div>
        <div className="form-group">
          <label>Số lượng trong kho:</label>
          <p className="view-only">{productData.countInStock}</p>
        </div>
        <div className="form-group">
          <label>Giá hiện tại:</label>
          <p className="view-only">{productData.currentPrice} VNĐ</p>
        </div>
        <div className="form-group">
          <label>Giá cũ:</label>
          <p className="view-only">{productData.oldPrice} VNĐ</p>
        </div>
        <div className="form-group">
          <label>Cấu hình sản phẩm:</label>
          <ul className="config-list view-only">
            {productData.config.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="form-group">
          <label>Mô tả:</label>
          <div
            className="view-only description"
            dangerouslySetInnerHTML={{ __html: productData.description }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
