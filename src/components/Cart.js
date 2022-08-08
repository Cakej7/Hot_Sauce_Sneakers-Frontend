import React, { useState, useEffect } from "react";
import { Container, Box, Paper, Stack, styled, Button,
         FormControl, InputLabel, NativeSelect, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchCartItems, updateCartItem, deleteCartItem, getInventoryByProductIdAndSizeId } from "../api";

const Cart = ({ token, cart, setCart }) => {

    let navigate = useNavigate();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [openStockAlert, setOpenStockAlert] = useState(false);
    const [stock, setStock] = useState(0);

    const handleStockAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenStockAlert(false);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    }

    const handleQuantityChange = async (event, count, inventoryId, productId, sizeId) => {
        const inventory = await getInventoryByProductIdAndSizeId(productId, sizeId);
        if(inventory.stock >= event.target.value) {
            if(token) {
                const updatedCartItems = await updateCartItem(token, inventoryId, event.target.value);
                const inStockCartItems = await inStockCheck(updatedCartItems);
                setCart(inStockCartItems);
            }
            else {
                const items = [...cart];

                for(let i = 0; i < items.length; i++) {
                    if(items[i].inventoryId === inventoryId) {
                        items[i].count = event.target.value;
                    }
                }
                setCart(items);
                localStorage.setItem('cart', JSON.stringify(items));
            }
        }
        else {
            setStock(inventory.stock);
            setOpenStockAlert(true);
            event.target.value = count;
        }
    }

    const handleDeleteItem = async (inventoryId) => {
        if(token) {
            const updatedCartItems = await deleteCartItem(token, inventoryId);
            const inStockCartItems = await inStockCheck(updatedCartItems);
            setCart(inStockCartItems);
        }
        else {
            const items = [...cart];
            let index = 0;

            for(let i = 0; i < items.length; i++) {
                if(items[i].inventoryId === inventoryId) {
                    index = i;
                }
            }

            items.splice(index, 1);
            setCart(items);
            localStorage.setItem('cart', JSON.stringify(items));

            if(items.length === 0) {
                localStorage.removeItem('cart');
            }
        }
    }

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
        <Container maxWidth="md" style={{minHeight: '50vh', display: 'relative'}}>
            <h2 className='page-title' style={{textAlign: 'center', margin: '25px'}}>Cart</h2>
            {cart.length ? 
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
                <Stack spacing={2} sx={{width: '100%'}}>
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
                                    {item.inStock ?
                                    <FormControl sx={{ width: '100px' }}>
                                        <InputLabel variant="standard" htmlFor="select-quantity">Quantity</InputLabel>
                                        <NativeSelect
                                            defaultValue={item.count}
                                            inputProps={{name: 'quantity', id: 'select-quantity'}}
                                            onChange={(event) => handleQuantityChange(event, item.count, item.inventoryId, item.productId, item.sizeId)}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </NativeSelect>
                                    </FormControl>
                                    : <p style={{color: 'red'}}>Out of Stock</p>
                                    }
                                    <DeleteIcon id='remove-button' fontSize="large" onClick={() => handleDeleteItem(item.inventoryId)}/>
                                </div>
                            </Item>
                        )
                    })}
                </Stack>
                <Button id='checkout-button' variant="contained" sx={{width: '40%'}} size="large" onClick={handleCheckout}>
                    Checkout
                </Button>
                <Snackbar open={openStockAlert} autoHideDuration={6000} onClose={handleStockAlertClose}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleStockAlertClose} severity="error" sx={{ width: '100%' }}>
                        Only {stock} left in stock!
                    </Alert>
                </Snackbar>
            </Box>
            : <h3 className='small-title' style={{textAlign: 'center', margin: '50px'}}>Your cart is empty! Check out the products page to add items to your cart!</h3>
            }
        </Container>
    )
}

export default Cart;