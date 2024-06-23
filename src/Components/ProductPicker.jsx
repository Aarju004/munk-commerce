import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductPicker = ({ onClose }) => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search input
  const [loading, setLoading] = useState(false); // Loading state for fetching products
  const [selectedProducts, setSelectedProducts] = useState(new Set()); // State to manage selected products

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  // Function to fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://stageapi.monkcommerce.app/task/products/search?search=Hat&page=2&limit=1`,
        {
          headers: {
            "x-api-key": "shared via email", // Replace with actual API key
          },
        }
      );
      setProducts(response.data.products); // Update products state with fetched data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error); // Log error if API request fails
      setLoading(false);
    }
  };

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery state on input change
    setProducts([]); // Clear products when search query changes
  };

  // Handler for selecting/deselecting products
  const handleSelection = (productName, variantIndex) => {
    const key = `${productName}-${variantIndex}`;
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(key)) {
        newSelected.delete(key); // Deselect product variant if already selected
      } else {
        newSelected.add(key); // Select product variant if not already selected
      }
      return newSelected;
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-200 bg-opacity-80 z-50">
      <div className="p-4 bg-white rounded-lg shadow-lg w-96 mx-auto">
        <h2 className="text-lg font-semibold mb-4">Select Products</h2>
        <input
          type="text"
          placeholder="Search product"
          className="w-full mb-4 p-2 border rounded"
          value={searchQuery}
          onChange={handleSearchChange} // Attach search input handler
        />
        <div>
          {products.map((product, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={product.variants.every((_, i) =>
                    selectedProducts.has(`${product.name}-${i}`)
                  )}
                  onChange={() => {
                    const allSelected = product.variants.every((_, i) =>
                      selectedProducts.has(`${product.name}-${i}`)
                    );
                    setSelectedProducts((prevSelected) => {
                      const newSelected = new Set(prevSelected);
                      product.variants.forEach((_, i) => {
                        const key = `${product.name}-${i}`;
                        if (allSelected) {
                          newSelected.delete(key);
                        } else {
                          newSelected.add(key);
                        }
                      });
                      return newSelected;
                    });
                  }}
                  className="mr-2"
                />
                <img
                  src="path/to/image.png"
                  alt={product.name}
                  className="w-10 h-10 mr-2"
                />
                <span>{product.name}</span>
              </div>
              {product.variants.map((variant, variantIndex) => (
                <div key={variantIndex} className="flex items-center ml-6 mt-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(
                      `${product.name}-${variantIndex}`
                    )}
                    onChange={() => handleSelection(product.name, variantIndex)} // Attach variant selection handler
                    className="mr-2"
                  />
                  <span className="flex-grow">
                    {variant.size} / {variant.color} / {variant.material}
                  </span>
                  <span className="mr-4">{variant.available} available</span>
                  <span>${variant.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <span>{selectedProducts.size} product(s) selected</span>
          <div>
            <button
              className="bg-gray-300 px-4 py-2 rounded mr-2"
              onClick={() => onClose([])} // Close modal and pass empty array on Cancel
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => onClose([...selectedProducts])} // Close modal and pass array of selected products on Add
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPicker;
