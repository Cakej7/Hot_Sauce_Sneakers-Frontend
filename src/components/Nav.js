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
  
  return (
    <div id="nav-bar">
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      {token ? (
        <>
          <Link to="/orders">Order History</Link>
          <Link to="/" onClick={logout}>Logout</Link>
          {isAdmin === 'true' ? 
          <Link to="/admin/users">Admin</Link>
            :
            null
          }
        </>
      ) : (
        <Link to="/login">Sign In</Link>
      )}
    </div>
  );
};

export default Nav;
