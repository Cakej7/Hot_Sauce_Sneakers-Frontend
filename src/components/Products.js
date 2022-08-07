import React, { useState, useEffect } from "react";
import { Container, Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchBrands, fetchProductsByBrand, fetchAllProductsInStock } from "../api";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



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
            <FormGroup style={{display: 'flex', justifyContent: 'center'}} row>
                {brands.map((brand, index) => {
                    return (
                        <FormControlLabel key={index} label={brand[1]}
                            control={<Checkbox checked={brand[2]} value={index} onChange={handleBrandsCheck}/>} 
                        />
                    )
                })}
            </FormGroup> 

        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>

            {
                products.map(({ id, name, brand, image, price }) => {
                    return (
                        <div key={id} >
                            <Card  sx={{ maxWidth: 550, minHeight: '100vh', margin: '10px'}}>
                                <Link to={`/products/${id}`}>
                                    <CardMedia
                                        component="img"
                                        height='auto'
                                        image={image}
                                        alt="green iguana"

                                    />
                                    <CardContent style={{textAlign: 'center'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {name}
                                        </Typography>
                                        <Typography style={{margin: '10px'}} variant="h5" color="black">
                                        {brand}
                                        </Typography>
                                        <Typography variant="h5" color="black">
                                        {price}
                                        </Typography>
                                    </CardContent>
                                </Link>
                            </Card>
                        </div>
                        
                    )
                })
            }
        </div>

            </Box>
        </Container>
    )
}

export default Products;