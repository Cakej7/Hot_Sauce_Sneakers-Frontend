import React, { useState, useEffect } from "react";
import { Container, Box, Paper, Stack, styled, Button,
         FormControl, InputLabel, NativeSelect } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchCartItems, updateCartItem, deleteCartItem } from "../api";

const Cart = () => {

    const [cart, setCart] = useState([]);
    let navigate = useNavigate();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    // const myCart = [
    //     {
    //         name: `AIR JORDAN 1 RETRO HIGH OG 'STAGE HAZE'`,
    //         brand: `Air Jordan`,
    //         image: `https://cdn.flightclub.com/3000/TEMPLATE/299069/1.jpg`,
    //         price: 190.00
    //     },
    //     {
    //         name: `AIR JORDAN 3 RETRO 'UNC'`,
    //         brand: `Air Jordan`,
    //         image: `https://cdn.flightclub.com/3000/TEMPLATE/149377/1.jpg`,
    //         price: 450.00
    //     },
    //     {
    //         name: `AIR JORDAN 4 RETRO OG 'FIRE RED' 2020`,
    //         brand: `Air Jordan`,
    //         image: `https://cdn.flightclub.com/3000/TEMPLATE/178193/1.jpg`,
    //         price: 275.00
    //     },
    //     {
    //         name: `AIR JORDAN 6 RETRO OG 'CARMINE' 2021`,
    //         brand: `Air Jordan`,
    //         image: `https://cdn.flightclub.com/3000/TEMPLATE/186762/1.jpg`,
    //         price: 142.00
    //     }
    // ];

    const handleCheckout = () => {
        navigate('/checkout');
    }

    const handleQuantityChange = async (event, inventoryId) => {
        const updatedCartItems = await updateCartItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTY1ODk4NjE2NCwiZXhwIjoxNjU5NTkwOTY0fQ.WyCszIHPohOHfTGaBbPhIQ0802tJzosk7p9sEDNBu18',
                                                       inventoryId, event.target.value);
        setCart(updatedCartItems);
    }

    const handleDeleteItem = async (inventoryId) => {
        const updatedCartItems = await deleteCartItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTY1ODk4NjE2NCwiZXhwIjoxNjU5NTkwOTY0fQ.WyCszIHPohOHfTGaBbPhIQ0802tJzosk7p9sEDNBu18',
                                                      inventoryId);
        setCart(updatedCartItems);
    }

    const fetchCart = async () => {
        const cartItems = await fetchCartItems('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTY1ODk4NjE2NCwiZXhwIjoxNjU5NTkwOTY0fQ.WyCszIHPohOHfTGaBbPhIQ0802tJzosk7p9sEDNBu18');
        setCart(cartItems);
    }

    useEffect(() => {
        fetchCart();
        // eslint-disable-next-line
    }, []);

    console.log(cart);
    return (
        <Container maxWidth="md">
            <h2 style={{textAlign: 'center'}}>Cart</h2>
            {cart.length ? 
            <Box sx={{ height: '100%' }}> 
                <Stack spacing={2}>
                    {cart.map((item, index) => {
                        return (
                            <Item key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <img src={item.image} alt={item.name} width="140" height="100" />
                                    <div>
                                        <p>Name: {item.name}</p>
                                        <p>Brand: {item.brand}</p>
                                        <p>Size: {item.gender} {item.size}</p>
                                        <p>Price: {item.price}</p>
                                    </div>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <FormControl sx={{ width: '100px' }}>
                                        <InputLabel variant="standard" htmlFor="select-quantity">Quantity</InputLabel>
                                        <NativeSelect
                                            defaultValue={item.count}
                                            inputProps={{name: 'quantity', id: 'select-quantity'}}
                                            onChange={(event) => handleQuantityChange(event, item.inventoryId)}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </NativeSelect>
                                    </FormControl>
                                    <DeleteIcon id='remove-button' fontSize="large" onClick={() => handleDeleteItem(item.inventoryId)}/>
                                </div>
                            </Item>
                        )
                    })}
                </Stack>
                <Button id='checkout-button' variant="contained" size="large" onClick={handleCheckout}>Checkout</Button>
            </Box>
            : <h3>Your cart is empty!</h3>
            }
        </Container>
    )
}

export default Cart;