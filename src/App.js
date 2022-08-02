import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  Layout,
  Products,
  Cart,
  CheckOut,
  Login,
  Register,
  SingleProduct,
  Admin,
  CreateNewProductForm,
  Orders,
  AdminProducts,
} from "./components";

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [products, setProducts] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout token={token} setToken={setToken} />}>
          <Route
            index
            element={<Products products={products} setProducts={setProducts} />}
          />
          <Route
            path="/products"
            element={<Products products={products} setProducts={setProducts} />}
          />
          <Route path="/products/:productId" element={<SingleProduct />} />
          {/* Only display when user is logged in as admin */}
          <Route path="/admin" element={<Admin token={token} />} />
          <Route
            path="/admin/new-product"
            element={
              <CreateNewProductForm
                products={products}
                setProducts={setProducts}
              />
            }
          />
          <Route
            path="/admin/products"
            element={<AdminProducts token={token} />}
          />

          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          {token ? null : (
            <Route path="/login" element={<Login setToken={setToken} />} />
          )}
          {token ? null : (
            <Route
              path="/register"
              element={<Register setToken={setToken} />}
            />
          )}
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
