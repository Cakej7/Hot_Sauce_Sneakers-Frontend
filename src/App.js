import React, { useState } from "react";
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
  AdminUsers
} from "./components";

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || "[]"));

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout setCart={setCart} token={token} setToken={setToken}/>}>

          <Route index element={<Products products={products} setProducts={setProducts}/>} />

          <Route path='/products' element={<Products products={products} setProducts={setProducts} />} />

          <Route
            path="/products/:productId"
            element={
              <SingleProduct token={token} cart={cart} setCart={setCart} />
            }
          />

          <Route
            path="/createNewProductForm"
            element={
              <CreateNewProductForm
                token={token}
                products={products}
                setProducts={setProducts}
              />
            }
          />

          {/* Only display when user is logged in as admin */}
          <Route path="/admin" element={<Admin token={token} />}>
            <Route
              path="/admin/new-product"
              element={
                <CreateNewProductForm
                  token={token}
                  products={products}
                  setProducts={setProducts}
                />
              }
            />
            <Route
              path="/admin/products"
              element={<AdminProducts token={token} />}
            />
            <Route path="/admin/users" element={<AdminUsers token={token} />} />
          </Route>

          <Route
            path="/cart"
            element={<Cart token={token} cart={cart} setCart={setCart} />}
          />

          <Route path='/checkout' element={<CheckOut token={token} cart={cart} setCart={setCart}/>} />

          <Route path="/orders" element={<Orders />} />

          {token ? null : (
            <Route path="/login" element={<Login cart={cart} setToken={setToken} />} />
          )}
          {token ? null : (
            <Route
              path="/register"
              element={<Register setToken={setToken} />}
            />
          )}

          <Route path="*" element={<Navigate to="/" replace={true}  />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;