import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { products } from "../test_data";
// import { getAllProductsInStock } from "../api";


const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
        .then((response) => {
            console.log(response.data)
            setProducts(response.data)
        })
    }, [])

    return (
        <>
            {
                // Call the api to fetch all products then map through that data
                products.map(({ name, brand, image, price }) => {
                    return (
                        // change key value to id once backend is setup
                        <div key={name}
                            style={{
                                border: '1px solid black',
                                margin: '5px',
                            }}
                        > 
                            {/* send the product id through as a prop to click over to the correct product */}
                            <Link to={'/products/:productId'}>
                                <img src={image} alt="" width="250" height="200"></img>
                                <h1>{brand}</h1>
                                <h3>{name}</h3>
                                <h2>{price}</h2>
                            </Link>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Products;