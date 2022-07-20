import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ token, setToken }) => {
  // basic layout header, content, footer  
  return (
        <>
          <Header token={token} setToken={setToken}/>
          <Outlet />
          <Footer />
        </>
    )
}

export default Layout;