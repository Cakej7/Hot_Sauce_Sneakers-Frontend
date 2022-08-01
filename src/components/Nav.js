import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ cart, token, setToken }) => {
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
        <div id='nav-bar'>
            <Link to='/products'>Products</Link>
            <Link to='/cart'>Cart</Link>
            {cart.length ? <Link to='/checkout'>Check Out</Link> : null}
            <Link to='/login'>Login/Register</Link>
            <Link to='/admin'>Admin</Link>
        </div>
    )
}

export default Nav;