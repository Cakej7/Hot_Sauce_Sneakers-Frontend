import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ token, setToken }) => {
  //let navigate = useNavigate();

  // log out button clicked, clear local storage, set token to null
  // const handleClick = () => {
  //     window.localStorage.clear();
  //     setToken(null);
  //     // back to home page
  //     navigate("/products", { replace: true });
  // }

  // display different links based on token
  return (
    <div id="nav-bar">
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/checkout">Check Out</Link>
      {/* <Link to='/login'>Login/Register</Link> */}
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Nav;
