import React, { useState, useEffect } from "react";
import { Container, Box, Stack, styled, Paper, Divider, TextField, Button, Modal } from "@mui/material";
import { deleteCartItem, updateInventory, fetchCartItems, getInventoryByProductIdAndSizeId } from "../api";
import { useNavigate } from "react-router-dom";

const CheckOut = ({token, cart, setCart}) => {

    let navigate = useNavigate();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = async () => {
        setModalOpen(false);
        setName('');
        setAddress('');
        setCity('');
        setState('');
        setZip('');
        setEmail('');
        setPhone('');

        await Promise.all(cart.map((item) => updateInventory(item.productId, item.sizeId, item.count)));

        if(token) {
            await Promise.all(cart.map((item) => deleteCartItem(token, item.inventoryId)));
        }

        setCart([]);
        localStorage.removeItem('cart');

        navigate("/products", { replace: true });
    }

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setModalOpen(true);
    }

    let subtotal = 0;
    for(let i = 0; i < cart.length; i++) {
        subtotal += parseFloat(cart[i].price.slice(1)) * cart[i].count;
    }
    let tax = parseFloat((subtotal * 0.09).toFixed(2));
    let total = subtotal + tax;

    const [disabledCheckout, setDisabledCheckout] = useState(false);

    const fetchCart = async () => {
        const cartItems = await fetchCartItems(token);
        const inStockCartItems = await inStockCheck(cartItems);
        setCart(inStockCartItems);
    }

    const inStockCheckHelper= async () => {
        const items = [...cart];
        const inStockCartItems = await inStockCheck(items);
        setCart(inStockCartItems);
    }

    const inStockCheck = async (cartItems) => {
        return await Promise.all(cartItems.map(async (item) => {
            const inventory = await getInventoryByProductIdAndSizeId(item.productId, item.sizeId);
            if(inventory.stock > 0) {
                item.inStock = true;
            }
            else {
                item.inStock = false;
                setDisabledCheckout(true);
            }
            return item;
        }))
    }

    useEffect(() => {
        if(token) {
            fetchCart();
        }
        else {
            inStockCheckHelper();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="md">
            <h2 style={{textAlign: 'center'}}>Checkout</h2>
            {disabledCheckout ? 
            <h3 style={{textAlign: 'center', color: 'red'}}>
                Sorry, some items in you cart are currently out of stock. 
                Please remove them from your cart.
            </h3>
            : null
            }
            {cart.length ?
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Stack spacing={1} sx={{ width: '40%' }}>
                    <h3 style={{textAlign: 'center'}}>Summary</h3>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Tax: ${tax.toFixed(2)}</p>
                    <p>Free Shipping*</p>
                    <p>Total: ${total.toFixed(2)}</p>
                    <Divider />
                    <h3 style={{textAlign: 'center'}}>In your cart</h3>
                    {cart.map((item, index) => {
                        return (
                            <Item key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <img src={item.image} alt={item.name} width="100" height="70" />
                                <div>
                                    {item.inStock ? null : <p style={{color: 'red'}}>Out of Stock</p>}
                                    <p>Name: {item.name}</p>
                                    <p>Brand: {item.brand}</p>
                                    <p>Price: {item.price}</p>
                                    <p>Qty: {item.count}</p>
                                </div>
                            </Item>
                        )
                    })}
                </Stack>
                <div style={{width: '55%'}}>
                    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div style={{width: '100%'}}>
                            <h3 style={{textAlign: 'center'}}>Shipping Address</h3>
                            <TextField label="Name" variant="outlined" margin="normal" type="text" fullWidth required
                                        value={name} onChange={(e) => setName(e.target.value)}/>
                            <TextField label="Address" variant="outlined" margin="normal" type="text" fullWidth required
                                        value={address} onChange={(e) => setAddress(e.target.value)}/>
                            <TextField label="City" variant="outlined" margin="normal" type="text" sx={{ width: '35%' }} required
                                        value={city} onChange={(e) => setCity(e.target.value)}/>
                            <TextField label="State" variant="outlined" margin="normal" type="text" sx={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} required
                                        value={state} onChange={(e) => setState(e.target.value)}/>
                            <TextField label="ZIP Code" variant="outlined" margin="normal" type="text" sx={{ width: '35%' }} required
                                        value={zip} onChange={(e) => setZip(e.target.value)}/>
                            <TextField label="E-mail" variant="outlined" margin="normal" type="text" fullWidth required
                                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <TextField label="Phone" variant="outlined" margin="normal" type="text" fullWidth required
                                        value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div style={{width: '100%'}}>
                            <h3 style={{textAlign: 'center'}}>Payment Information</h3>
                            <TextField label="Card Holder" variant="outlined" margin="normal" type="text" fullWidth disabled/>
                            <TextField label="Card Number" variant="outlined" margin="normal" type="text" fullWidth disabled/>
                            <TextField label="Expiration Date" variant="outlined" margin="normal" sx={{ width: '30%', marginRight: '10px' }} disabled/>
                            <TextField label="Security Code" variant="outlined" margin="normal" sx={{ width: '30%' }} disabled/>
                        </div>
                        <div style={{width: '100%'}}>
                            <h3 style={{textAlign: 'center'}}>Billing Address</h3>
                            <TextField label="Name" variant="outlined" margin="normal" type="text" fullWidth disabled/>
                            <TextField label="Address" variant="outlined" margin="normal" type="text" fullWidth disabled/>
                            <TextField label="City" variant="outlined" margin="normal" type="text" sx={{ width: '35%' }} disabled/>
                            <TextField label="State" variant="outlined" margin="normal" type="text" sx={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} disabled/>
                            <TextField label="ZIP Code" variant="outlined" margin="normal" type="text" sx={{ width: '35%' }} disabled/>
                        </div>
                        <Button disabled={disabledCheckout} id='pay-button' variant="contained" size="large" type="submit">Submit</Button>
                    </form>
                </div>
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="confirmation"
                    aria-describedby="confirmation modal"
                >
                    <Box sx={modalStyle}>
                        <h2 style={{textAlign: 'center'}}>Confirmation</h2>
                        <h3>Thank you! Your order is on the way!</h3>
                        <h3>Shipping Address:</h3>
                        <p>{name}</p>
                        <p>{address}</p>
                        <p>{city}, {state} {zip}</p>
                        <h3>Contact Information:</h3>
                        <p>e-mail: {email}</p>
                        <p>Phone: {phone}</p>
                        <h3>Order Details: </h3>
                        <Stack spacing={1} sx={{ width: '100%' }}>
                            {cart.map((item, index) => {
                                return (
                                    <Item key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <img src={item.image} alt={item.name} width="80" height="60" />
                                        <div style={{width: '50%'}}>
                                            <p>Name: {item.name}</p>
                                            <p>Brand: {item.brand}</p>
                                            <p>Price: {item.price}</p>
                                            <p>Qty: {item.count}</p>
                                        </div>
                                    </Item>
                                )
                            })}
                        </Stack>
                        <h3>Total: ${total.toFixed(2)}</h3>
                    </Box>
                </Modal>
            </Box>
            : <h3>Nothing to checkout!</h3>
            }
        </Container>
    )
}

export default CheckOut;