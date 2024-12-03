import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "../homepage/ProductImage";
import ProductInfo from "../homepage/ProductInfo";
export default function ProductConnectItem({ product }) {
  console.log(product);

  return (
    <>
      <li className="product-connect-item">
        <Link className="product-link" to={`/products/${product._id}`}>
          <ProductImage
            imageUrl={product.imageUrl}
            backgroundUrl={product.backgroundUrl}
          />
          <ProductInfo
            name={product.name}
            currentPrice={product.currentPrice}
            oldPrice={product.oldPrice}
          />
        </Link>
      </li>
    </>
  );
}
