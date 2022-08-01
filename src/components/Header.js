import React from 'react';
import Nav from './Nav';

const Header = ({ cart, token, setToken }) => {
    return (
        <div id='header'>
            <h1>Hot Sauce Sneakers</h1>
            {/* pass token to set the link and log out button */}
            <Nav cart={cart} token={token} setToken={setToken}/>
        </div>
    )
}

export default Header;