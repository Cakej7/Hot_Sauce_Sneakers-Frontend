import React, { useState, useEffect } from "react";
import { Container, Box, Paper, Stack, styled, Button,
         FormControl, InputLabel, NativeSelect } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchCartItems, updateCartItem, deleteCartItem } from "../api";

const Cart = ({ token }) => {

    const [cart, setCart] = useState([]);
    let navigate = useNavigate();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const handleCheckout = () => {
        navigate('/checkout');
    }

    const handleQuantityChange = async (event, inventoryId) => {
        const updatedCartItems = await updateCartItem(token, inventoryId, event.target.value);
        setCart(updatedCartItems);
    }

    const handleDeleteItem = async (inventoryId) => {
        const updatedCartItems = await deleteCartItem(token, inventoryId);
        setCart(updatedCartItems);
    }

    const fetchCart = async () => {
        const cartItems = await fetchCartItems(token);
        setCart(cartItems);
    }

    useEffect(() => {
        fetchCart();
        // eslint-disable-next-line
    }, []);

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