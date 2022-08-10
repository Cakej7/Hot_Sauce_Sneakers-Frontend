import React from 'react';
import Nav from './Nav';

const Header = ({ setCart, token, setToken }) => {
    return (
        <div id='header'>
            <h1>Hot Sauce Sneakers</h1>
            <Nav setCart={setCart} token={token} setToken={setToken}/>
        </div>
    )
}

export default Header;