import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Nav = ({ token, setToken }) => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");

  // log out button clicked, clear local storage, set token to null
  // const handleClick = () => {
  //     window.localStorage.clear();
  //     setToken(null);
  //     // back to home page
  //     navigate("/products", { replace: true });
  // }

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
      <Link to="/checkout">Check Out</Link>
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
