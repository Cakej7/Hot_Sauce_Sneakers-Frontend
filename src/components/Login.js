import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <h2>Login Page</h2>
            <Link to='/register'>Don't have an account? Sign up now!</Link>
        </>
    )
}

export default Login;