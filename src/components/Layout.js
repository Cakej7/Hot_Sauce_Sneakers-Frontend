import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const Layout = ({ cart, token, setToken }) => {
  // basic layout header, content, footer  
  return (
        <>
          <Header cart={cart} token={token} setToken={setToken}/>
          <Outlet />
          <Footer />
        </>
    )
}

export default Layout;
