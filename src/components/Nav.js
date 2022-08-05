import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Nav = ({ cart, token, setToken }) => {
    
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");

  const logout = () => {
    setToken(null);
    localStorage.clear();
    navigate("/login");
  };

  // display different links based on token
  return (
    <div id="nav-bar">
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      {cart.length ? <Link to='/checkout'>Check Out</Link> : null}
      {token ? (
        <>
          <Link to="/orders">Orders</Link>
          <Link to="/" onClick={logout}>Logout</Link>
          {isAdmin === true ? 
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
