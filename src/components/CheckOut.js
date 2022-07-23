import React from "react";
import { Container, Box, Stack, styled, Paper, Divider, TextField, Button } from "@mui/material";

const CheckOut = () => {

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

    let subtotal = 0;
    for(let i = 0; i < myCart.length; i++) {
        subtotal += myCart[i].price;
    }
    subtotal = parseFloat(subtotal.toFixed(2));
    let tax = parseFloat((subtotal * 0.09).toFixed(2));
    let total = subtotal + tax;

    return (
        <Container maxWidth="md">
            <h2 style={{textAlign: 'center'}}>Checkout</h2>
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Stack spacing={1} sx={{ width: '40%' }}>
                    <h3 style={{textAlign: 'center'}}>Summary</h3>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Tax: ${tax.toFixed(2)}</p>
                    <p>Free Shipping*</p>
                    <p>Total: ${total.toFixed(2)}</p>
                    <Divider />
                    <h3 style={{textAlign: 'center'}}>In your cart</h3>
                    {myCart.map((item, index) => {
                        return (
                            <Item key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <img src={item.image} alt={item.name} width="100" height="70" />
                                <div>
                                    <p>Name: {item.name}</p>
                                    <p>Brand: {item.brand}</p>
                                    <p>Price: ${item.price}</p>
                                    <p>Qty: 1</p>
                                </div>
                            </Item>
                        )
                    })}
                </Stack>
                <div style={{width: '55%'}}>
                    <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div style={{width: '100%'}}>
                            <h3 style={{textAlign: 'center'}}>Shipping Address</h3>
                            <TextField label="Name" variant="outlined" margin="normal" type="text" fullWidth required/>
                            <TextField label="Address" variant="outlined" margin="normal" type="text" fullWidth required/>
                            <TextField label="City" variant="outlined" margin="normal" type="text" sx={{ width: '35%' }} required/>
                            <TextField label="State" variant="outlined" margin="normal" type="text" sx={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} required/>
                            <TextField label="ZIP Code" variant="outlined" margin="normal" type="text" sx={{ width: '35%' }} required/>
                            <TextField label="E-mail" variant="outlined" margin="normal" type="text" fullWidth required/>
                            <TextField label="Phone" variant="outlined" margin="normal" type="text" fullWidth required/>
                        </div>
                        <div style={{width: '100%'}}>
                            <h3 style={{textAlign: 'center'}}>Payment Information</h3>
                            <TextField label="Card Holder" variant="outlined" margin="normal" type="text" fullWidth required/>
                            <TextField label="Card Number" variant="outlined" margin="normal" type="text" fullWidth required/>
                            <TextField label="Expiration Date" variant="outlined" margin="normal" sx={{ width: '30%', marginRight: '10px' }} required/>
                            <TextField label="Security Code" variant="outlined" margin="normal" sx={{ width: '30%' }} required/>
                        </div>
                        <div style={{width: '100%'}}>
                            <h3 style={{textAlign: 'center'}}>Billing Address</h3>
                            <TextField label="Name" variant="outlined" margin="normal" type="text" fullWidth required/>
                            <TextField label="Address" variant="outlined" margin="normal" type="text" fullWidth required/>
                            <TextField label="City" variant="outlined" margin="normal" type="text" sx={{ width: '35%' }} required/>
                            <TextField label="State" variant="outlined" margin="normal" type="text" sx={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} required/>
                            <TextField label="ZIP Code" variant="outlined" margin="normal" type="text" sx={{ width: '35%' }} required/>
                        </div>
                        <Button id='pay-button' variant="contained" size="large">Submit</Button>
                    </form>
                </div>
            </Box>
        </Container>
    )
}

export default CheckOut;