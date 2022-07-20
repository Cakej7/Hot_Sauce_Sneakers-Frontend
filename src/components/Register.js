import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <>
            <h2>Register Page</h2>
            <Link to='/login'>Already had an account? Login here!</Link>
        </>
    )
}

export default Register;