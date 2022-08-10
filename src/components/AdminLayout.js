import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { Outlet } from "react-router-dom";
import { Button } from "@mui/material";

const Admin = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/users", { replace: true });
    }

    if (!token) {
      navigate("/login", { replace: true });
    }

    if (isAdmin === "false") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: 'center', margin: '10px' }}>
        <Button style={{fontSize: '25px'}}>
          <Link to="/admin/new-product">Add New Product</Link>
        </Button>
        <Button style={{fontSize: '25px'}}>
          <Link to="/admin/users">Users</Link>
        </Button>
        <Button style={{fontSize: '25px'}}>
          <Link to="/admin/products">Products</Link>
        </Button>
        
      </div>
      <Outlet />
    </>
  );
};

export default Admin;
