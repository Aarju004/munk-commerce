import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./ProductList"; // Import ProductList component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
    </Routes>
  );
};

export default App;
