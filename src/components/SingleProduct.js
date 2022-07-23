import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const products = [
    {
        name: `AIR JORDAN 1 RETRO HIGH OG 'STAGE HAZE'`,
        brand: `Air Jordan`,
        image: `https://cdn.flightclub.com/3000/TEMPLATE/299069/1.jpg`,
        price: 190.00
    },
]

const SingleProduct = () => {
    const [quantity, setQuantity] = useState(0)
    const [size, setSize] = useState('Size')
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

                            {/* Size menu */}
                            

                            <form>
                                {/* <label>Size: </label>
                                <input
                                    type='number'
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                /> */}

                                <label>Quantity: </label>
                                <input
                                    type='number'
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
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