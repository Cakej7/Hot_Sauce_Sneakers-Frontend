import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Layout,
  Products,
  Cart,
  CheckOut,
  Login,
  Register,
  SingleProduct,
  Admin,
  CreateNewProductForm
} from './components';

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [products, setProducts] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout token={token} setToken={setToken}/>}>

          <Route index element={<Products />} />

          <Route path='/products' element={<Products products={products} setProducts={setProducts} />} />

          <Route path='/products/:productId' element={<SingleProduct />} />

          <Route path='/createNewProductForm' element={<CreateNewProductForm products={products} setProducts={setProducts} />} />

          {/* Only display when user is logged in as admin */}
          <Route path='/admin' element={<Admin />} />

          <Route path='/cart' element={<Cart />} />

          <Route path='/checkout' element={<CheckOut />} />

          {token ? null : <Route path='/login' element={<Login setToken={setToken}/>} />}

          {token ? null : <Route path='/register' element={<Register setToken={setToken}/>} />}
          
          <Route path="*" element={<Navigate to="/" replace={true} />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
