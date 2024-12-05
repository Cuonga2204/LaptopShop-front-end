import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

// Provider để bọc toàn bộ ứng dụng
export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState(""); // Lưu trữ từ khóa tìm kiếm

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook để sử dụng SearchContext
export const useSearch = () => useContext(SearchContext);
