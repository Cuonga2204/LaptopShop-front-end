import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ContainerEvent from "./ContainerEvent";
import ImageSlider from "./ImageSlider";
import CategoryFilter from "./CategoryFilter";
import OrderLapList from "./OrderLapList";
import HomeFilter from "./HomeFilter";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import { FilterProvider } from "../../context/FilterContext";
import { FilterPriceProvider } from "../../context/FilterPriceContext";
import { useMemo } from "react";
import { useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useSearch } from "../../context/SearchContext";
export default function Container({ filter }) {
  const { products } = useContext(ProductContext);
  const { page = 1 } = useParams(); // Lấy số trang từ URL, mặc định là 1
  const { searchTerm } = useSearch(); // Lấy từ khóa tìm kiếm từ SearchContext
  const images = [
    "/img/slideShow1.png",
    "/img/slideShow4.png",
    "/img/slideShow3.png",
  ];

  const PRODUCTS_PER_PAGE = 9; // Số sản phẩm trên mỗi trang
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Lọc theo từ khóa tìm kiếm từ Navbar
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo filter (ví dụ HP, DELL, ASUS)
    if (filter && filter !== "TẤT CẢ") {
      filtered = filtered.filter((product) => product.name.includes(filter));
    }

    return filtered;
  }, [products, searchTerm, filter]);

  // Tính tổng số trang dựa trên số sản phẩm đã lọc
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Tính toán vị trí bắt đầu và kết thúc của sản phẩm trên mỗi trang
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <FilterPriceProvider>
        <FilterProvider>
          <div className="container">
            <div className="grid">
              <ContainerEvent />
              <ImageSlider images={images} />
              <div className="grid__row">
                <div className="grid__row-column-3">
                  <CategoryFilter />
                </div>
                <div className="grid__row-column-9">
                  <div className="order-lap">
                    <div className="order-lap-header">
                      <OrderLapList />
                    </div>
                  </div>
                  <div className="home-page">
                    <HomeFilter />
                    <ProductList
                      products={paginatedProducts}
                      filter={filter}
                      page={parseInt(page)}
                    />
                  </div>
                  <Pagination
                    totalPages={totalPages}
                    currentPage={parseInt(page)}
                  />
                </div>
              </div>
            </div>
          </div>
        </FilterProvider>
      </FilterPriceProvider>
    </>
  );
}
