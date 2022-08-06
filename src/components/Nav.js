import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Nav = ({ setCart, token, setToken }) => {
    
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");

  const logout = () => {
    setToken(null);
    localStorage.clear();
    setCart([]);
    navigate("/login");
  };

  // display different links based on token
  return (
    <div id="nav-bar">
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      {token ? (
        <>
          <Link to="/orders">Orders</Link>
          <button onClick={logout}>Logout</button>
          {isAdmin && <Link to="/admin/users">Admin</Link>}
        </>
      ) : (
        <Link to="/login">Login/Register</Link>
      )}
    </div>
  );
};

export default Nav;
