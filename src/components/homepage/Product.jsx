import React from "react";
import ProductImage from "./ProductImage";
import ProductConfig from "./ProductConfig";
import ProductInfo from "./ProductInfo";
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", { maximumSignificantDigits: 3 }).format(
    price
  );
}
export default function Product({ product }) {
  return (
    <>
      <div className="grid__row-column-9-3">
        <Link className="product-link" to={`/products/${product.id}`}>
          <ProductImage
            imageUrl={product.imageUrl}
            backgroundUrl={product.backgroundUrl}
          />
          <ProductInfo
            name={product.name}
            currentPrice={formatPrice(product.currentPrice)}
            oldPrice={formatPrice(product.oldPrice)}
          />
          <ProductConfig
            config={product.config}
            className={"product-config-param"}
          />
        </Link>
        <AddProduct product={product} />
      </div>
    </>
  );
}
