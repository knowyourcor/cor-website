import React, { useState, useContext, createContext } from "react";

const FilterContext = createContext();

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [filterContext, setFilterContext] = useState(null);

  // console.log("FilterContext: ", filterContext);

  const value = {
    filterContext,
    setFilterContext,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
