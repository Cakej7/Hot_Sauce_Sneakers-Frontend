import React from "react";
import { Container, Box, Paper, Stack, styled, Button,
         FormControl, InputLabel, NativeSelect } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {

    let navigate = useNavigate();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const myCart = [
        {
            name: `AIR JORDAN 1 RETRO HIGH OG 'STAGE HAZE'`,
            brand: `Air Jordan`,
            image: `https://cdn.flightclub.com/3000/TEMPLATE/299069/1.jpg`,
            price: 190.00
        },
        {
            name: `AIR JORDAN 3 RETRO 'UNC'`,
            brand: `Air Jordan`,
            image: `https://cdn.flightclub.com/3000/TEMPLATE/149377/1.jpg`,
            price: 450.00
        },
        {
            name: `AIR JORDAN 4 RETRO OG 'FIRE RED' 2020`,
            brand: `Air Jordan`,
            image: `https://cdn.flightclub.com/3000/TEMPLATE/178193/1.jpg`,
            price: 275.00
        },
        {
            name: `AIR JORDAN 6 RETRO OG 'CARMINE' 2021`,
            brand: `Air Jordan`,
            image: `https://cdn.flightclub.com/3000/TEMPLATE/186762/1.jpg`,
            price: 142.00
        }
    ];

    const handleCheckout = () => {
        navigate('/checkout');
    }

    return (
        <Container maxWidth="md">
            <h2>Cart</h2>
            <Box sx={{ height: '100vh' }}>
                <Stack spacing={2}>
                    {myCart.map((item, index) => {
                        return (
                            <Item key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <img src={item.image} alt={item.name} width="140" height="100" />
                                    <div>
                                        <p>Name: {item.name}</p>
                                        <p>Brand: {item.brand}</p>
                                        <p>Price: {item.price}</p>
                                    </div>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <FormControl sx={{ width: '100px' }}>
                                        <InputLabel variant="standard" htmlFor="select-quantity">Quantity</InputLabel>
                                        <NativeSelect
                                            defaultValue={1}
                                            inputProps={{name: 'quantity', id: 'select-quantity'}}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </NativeSelect>
                                    </FormControl>
                                    <DeleteIcon id='remove-button' fontSize="large"/>
                                </div>
                            </Item>
                        )
                    })}
                </Stack>
                <Button id='checkout-button' variant="contained" size="large" onClick={handleCheckout}>Checkout</Button>
            </Box>
        </Container>
    )
}

export default Cart;