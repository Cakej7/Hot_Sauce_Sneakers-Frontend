import React, { useEffect} from "react";
import { Link, useResolvedPath } from "react-router-dom";
import axios from "axios";

const Admin = () => {

    // fetch call to get user info. need an api route from get user info by email
    // useEffect(() => {
    //     axios.get(`http://localhost:3000/api/users`)
    //     .then((response) => {
    //         setUser(response.data)
    //     })
    // })


    return (
        <>
            <Link to='/CreateNewProductForm'>
                <button>Add New Product</button>
            </Link>

            <h2>Users information:</h2>
            {/* {users.map(user =>
                    <div key={id}>
                        <h2>{`Username: ${user.username}`}</h2>
                        <h2>{`Email: ${user.email}`}</h2>
                        <p>{`Is Admin: ${user.isAdmin}`}</p>
                        <p>{`Is Active User: ${user.isActive}`}</p>
                    </div>
                    
            )} */}

        </>
    )
}

export default Admin;