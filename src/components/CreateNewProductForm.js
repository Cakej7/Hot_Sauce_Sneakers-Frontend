import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateNewProductForm = ({ products, setProducts }) => {
    let navigate = useNavigate()
    const [name, setProductName] = useState('')
    const [price, setProductPrice] = useState(null)
    const [brand, setProductBrand] = useState('')
    const [image, setProductImage] = useState('')

    const createProductFetch = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/products`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name,
                    price,
                    brandId: brand,
                    image
                })
            })
            const result = response.json()
            console.log(result)
            // navigate(`../products`)
            
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
        <form
        // onSubmit={(e) => {
        //     e.preventDefault()
        //     createProductFetch()
        // }}
        >
                <label>Product name: </label>
                <input
                    type="text"
                    required
                    onChange={(e) => { setProductName(e.target.value) }}
                />

                <label>Product price: </label>
                <input
                    type="number"
                    required
                    onChange={(e) => { setProductPrice(e.target.value) }}
                />

                <label>Product brand: </label>
                {/* map through the brands and display them as a dropdown menu */}

                <label>Product image: </label>
                <input
                    type="text"
                    required
                    onChange={(e) => { setProductImage(e.target.value) }}
                />  

                <button
                onClick={async (e) => {
                    e.preventDefault();
                    const productToAdd = await createProductFetch();
                    setProducts([...products, productToAdd]);
                }}>
                    Submit
                </button>
            </form>
        </>
    )
}

export default CreateNewProductForm