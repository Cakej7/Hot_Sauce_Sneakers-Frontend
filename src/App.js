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
  //const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTY1ODk4NjE2NCwiZXhwIjoxNjU5NTkwOTY0fQ.WyCszIHPohOHfTGaBbPhIQ0802tJzosk7p9sEDNBu18');
  
  //junweiuser
  //const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqdW53ZWlAdXNlci5jb20iLCJpYXQiOjE2NTkxOTI3NTQsImV4cCI6MTY1OTc5NzU1NH0.KqJgMLVr33W34vao4RizVxCMYl2AwJ6l8vkcMh-1Sac');
  //const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout cart={cart} token={token} setToken={setToken}/>}>

          <Route index element={<Products products={products} setProducts={setProducts}/>} />

          <Route path='/products' element={<Products products={products} setProducts={setProducts} />} />

          <Route path='/products/:productId' element={<SingleProduct token={token} cart={cart} setCart={setCart}/>} />

          <Route path='/createNewProductForm' element={<CreateNewProductForm products={products} setProducts={setProducts} />} />

          {/* Only display when user is logged in as admin */}
          <Route path='/admin' element={<Admin />} />

          <Route path='/cart' element={<Cart token={token} cart={cart} setCart={setCart}/>} />

          {cart.length ? <Route path='/checkout' element={<CheckOut token={token} cart={cart} setCart={setCart}/>} /> : null}

          {token ? null : <Route path='/login' element={<Login setToken={setToken}/>} />}

          {token ? null : <Route path='/register' element={<Register setToken={setToken}/>} />}
          
          <Route path="*" element={<Navigate to="/" replace={true} />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
