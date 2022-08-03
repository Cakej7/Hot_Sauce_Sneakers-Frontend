import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { Outlet } from "react-router-dom";

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
      <div style={{ display: "flex" }}>
        <Link to="/admin/new-product">Add New Product</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/products">Products</Link>
      </div>
      <Outlet />
    </>
  );
};

export default Admin;
