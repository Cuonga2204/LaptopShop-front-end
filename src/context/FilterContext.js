import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
    const [sortBy, setSortBy] = useState("");

    const handleSort = (type) => {
        setSortBy(type); // "priceAsc" hoặc "priceDesc"
    };

    return (
        <FilterContext.Provider value={{ sortBy, handleSort }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    return useContext(FilterContext);
}
