import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
        .then((response) => {
            // console.log(response.data)
            setProducts(response.data)
        })
    }, [])

    return (
        <>
            {
                products.map(({ id, name, brand, image, price }) => {
                    return (
                        <div key={id}
                            style={{
                                border: '1px solid black',
                                margin: '5px',
                            }}
                        > 
                            <Link to={`/products/${id}`}>
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