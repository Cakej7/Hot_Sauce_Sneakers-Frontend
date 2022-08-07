import React, { useState, useEffect } from "react";
import { Container, Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchBrands, fetchProductsByBrand, fetchAllProductsInStock } from "../api";


const Products = ({ products, setProducts }) => {
    
    const [brands, setBrands] = useState(JSON.parse(sessionStorage.getItem('brands') || '[]'));

    const fetchAllBrands = async () => {
        const allBrands = await fetchBrands();
        let defaultChecked = [];

        for(let i = 0; i < allBrands.length; i++) {
            defaultChecked.push([allBrands[i].id, allBrands[i].name, false]);
        }

        setBrands(defaultChecked);
        sessionStorage.setItem('brands', JSON.stringify(defaultChecked));
    }

    const fetchAllProducts = async () => {
        const allProducts = await fetchAllProductsInStock(); 
        setProducts(allProducts);
    }

    const handleBrandsCheck = (event) => {

        const copyBrands = [...brands];
        const index = event.target.value;

        copyBrands[index][2] = event.target.checked;
        
        setBrands(copyBrands);
        sessionStorage.setItem('brands', JSON.stringify(copyBrands));
        setFilteredProducts(copyBrands);
    }

    const setFilteredProducts = async (brandsArray) => {
        const filteredProducts = await Promise.all(brandsArray.map((brand) => {
            if(brand[2]) {
                return fetchProductsByBrand(brand[0]);
            }
            return [];
        }));

        if(filteredProducts.flat().length) {
            setProducts(filteredProducts.flat());
        }
        else {
            fetchAllProducts();
        }
    }

    useEffect(() => {
        if(brands.length) {
            setFilteredProducts(brands);
        }
        else {
            fetchAllProducts();
            fetchAllBrands();
        }
        // eslint-disable-next-line
    }, []);
    
    return (
        <Container maxWidth="lg">
            <Box sx={{ height: '100%' }}>
            <FormGroup row>
                {brands.map((brand, index) => {
                    return (
                        <FormControlLabel key={index} label={brand[1]}
                            control={<Checkbox checked={brand[2]} value={index} onChange={handleBrandsCheck}/>} 
                        />
                    )
                })}
            </FormGroup> 
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
            </Box>
        </Container>
    )
}

export default Products;