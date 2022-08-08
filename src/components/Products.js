import React, { useState, useEffect } from "react";
import { Container, Box, FormGroup, FormControlLabel, Checkbox, styled,
         Paper, Grid, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchBrands, fetchProductsByBrand, fetchAllProductsInStock } from "../api";

const Products = ({ products, setProducts }) => {
    
    const [brands, setBrands] = useState(JSON.parse(sessionStorage.getItem('brands') || '[]'));
    let navigate = useNavigate();

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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleOnClick = (id) => {
        navigate(`/products/${id}`);
    }
    
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
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{alignItems: 'stretch'}}>
                    {products.map(({ id, name, brand, image, price }, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Item style={{height: '100%', cursor: 'pointer'}} onClick={() => handleOnClick(id)}>
                                    <CardMedia
                                        component='img'
                                        image={image}
                                        alt={name}
                                    />
                                    <CardContent sx={{textAlign: 'left'}}>
                                        <Typography gutterBottom variant='h6' sx={{color: 'black'}}>
                                        {name}
                                        </Typography>
                                        <Typography gutterBottom variant='h6'>
                                        {brand}
                                        </Typography>
                                        <Typography variant='h6' >
                                        {price}
                                        </Typography>
                                    </CardContent>
                                </Item>
                            </Grid>
                        )
                    })}
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Products;