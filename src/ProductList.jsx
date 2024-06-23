import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Navbar from "./Components/Navbar.jsx";
import DragButton from "/drag-button.svg";
import EditButton from "/edit-pencil.svg";
import ProductPicker from "./Components/ProductPicker.jsx";

const Home = () => {
  const [products, setProducts] = useState([{ name: "", variants: [] }]);
  const [showOptions, setShowOptions] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Function to add a new product row
  const handleAddProduct = () => {
    setProducts([...products, { name: "", variants: [] }]);
    setShowOptions([...showOptions, false]);
  };

  // Function to initiate editing of a product
  const handleEditProduct = (index) => {
    setEditIndex(index);
    setPickerOpen(true); // Open product picker for editing
  };

  // Function to handle changes in product name input
  const handleProductNameChange = (e, index) => {
    const newProducts = [...products];
    newProducts[index].name = e.target.value;
    setProducts(newProducts);
  };

  // Function to handle drag-and-drop reordering of products
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProducts(items);
  };

  // Function to toggle display of discount options
  const toggleOptions = (index) => {
    const newShowOptions = [...showOptions];
    newShowOptions[index] = !newShowOptions[index];
    setShowOptions(newShowOptions);
  };

  // Function to handle closing of product picker and updating products
  const handleProductPickerClose = (selectedProducts) => {
    if (selectedProducts.length > 0) {
      const newProducts = [...products];
      newProducts.splice(editIndex, 1, ...selectedProducts);
      setProducts(newProducts);
    }
    setPickerOpen(false); // Close product picker after updating products
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center max-h-screen cursor-default mt-20">
        <p className="font-bold text-xl">Add Products</p>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="products">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className="flex gap-5 my-4">
                  <div className="flex-1 font-semibold text-center">
                    Product
                  </div>
                  <div className="flex-1 font-semibold text-center">
                    Discount
                  </div>
                </div>
                {products.map((product, index) => (
                  <Draggable
                    key={index}
                    draggableId={`product-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex gap-5 mb-4"
                      >
                        <div className="flex-1 flex flex-col">
                          <div className="relative flex gap-3 justify-center items-center">
                            <img
                              className="h-5 w-5 cursor-move"
                              src={DragButton}
                              alt="Drag Button"
                            />
                            <span>{index + 1}.</span>
                            <input
                              className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-1 pl-4"
                              type="search"
                              placeholder="Select Product"
                              name="select-product"
                              id="select-product"
                              value={product.name}
                              onChange={(e) =>
                                handleProductNameChange(e, index)
                              }
                            />
                            <img
                              className="cursor-pointer absolute right-3 h-6 w-6 p-1 hover:bg-slate-200 "
                              src={EditButton}
                              alt="Edit Button"
                              onClick={() => handleEditProduct(index)}
                            />
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <button
                            className={`bg-[#008060] rounded-md text-white px-8 py-1
                                    ${showOptions[index] ? "hidden" : "block"}`}
                            type="button"
                            onClick={() => toggleOptions(index)}
                          >
                            Add Discount
                          </button>

                          {showOptions[index] && (
                            <div className="flex gap-4">
                              <input
                                className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-16 p-1 pl-4"
                                type="number"
                                name="discount"
                                id="discount"
                                defaultValue="0"
                              />
                              <select
                                className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-1 pl-2"
                                name="discountType"
                                id="discountType"
                              >
                                <option value="percentage">% off</option>
                                <option value="flat">flat off</option>
                              </select>
                              <button
                                className="bg-[#008060] rounded-md text-white px-4 py-1"
                                type="button"
                                onClick={() => toggleOptions(index)}
                              >
                                Done
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button
          className="border-2 border-[#008060] text-[#008060] rounded-md my-4 px-14 py-2"
          type="button"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
      {pickerOpen && <ProductPicker onClose={handleProductPickerClose} />}
    </div>
  );
};

export default Home;
