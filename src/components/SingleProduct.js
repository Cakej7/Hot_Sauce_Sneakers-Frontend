import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
    const [singleProduct, setSingleProduct] = useState({})
    const [quantity, setQuantity] = useState([])
    // const [size, setSize] = useState([])
    let navigate = useNavigate()

    const {productId} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3000/api/products/${productId}`)
        .then((response) => {
            // console.log(response.data)
            setSingleProduct(response.data)
            // console.log(singleProduct)
        })
    }, [])
    
    return (
        <>
            <div >
                <img src={singleProduct.image} alt="" width="500" height="400"></img>
                <h1>{singleProduct.brand}</h1>
                <h3>{singleProduct.name}</h3>
                <h2>{singleProduct.price}</h2>

                {/* Size menu */}
                <Box sx={{ maxWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Size
                        </InputLabel>
                        <NativeSelect 
                        defaultValue={30}
                        inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                        }}
                        >
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                        </NativeSelect>
                    </FormControl>
                </Box>

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
        </>
    )
}

export default SingleProduct;