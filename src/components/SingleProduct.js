import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const products = [
    {
        name: `AIR JORDAN 1 RETRO HIGH OG 'STAGE HAZE'`,
        brand: `Air Jordan`,
        image: `https://cdn.flightclub.com/3000/TEMPLATE/299069/1.jpg`,
        price: 190.00,
        stock: 5,
        size: 11,
        addedToCart: false
    },
]

const SingleProduct = () => {
    const [stock, setStock] = useState(0)
    const [size, setSize] = useState(0)
    let navigate = useNavigate()
    
    return (
        <>
            {
                products.map(({ name, brand, image, price }) => {
                    return (
                    <div key={name}>
                        <img src={image} alt="" width="500" height="400"></img>
                        <h1>{brand}</h1>
                        <h3>{name}</h3>
                        <h2>${price}</h2>

                        <form>
                            <label>Size: </label>
                            <input
                                type='number'
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            />

                            <label>Stock: </label>
                            <input
                                type='number'
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                            <button
                                onClick={(e) => {
                                e.preventDefault();
                                // addProductToCart()
                                navigate('../cart')
                                }}
                                >Add to cart
                            </button>
                        </form>
                        

                    </div>
            )
                    
                })
            }
        </>
    )
}

export default SingleProduct;