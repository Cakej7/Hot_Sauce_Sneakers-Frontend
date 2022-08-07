import React, { useState, useEffect } from "react";
import { Container, Box, FormControl, InputLabel, NativeSelect, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useParams } from "react-router-dom";
import axios from "axios";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getInventoryByProductIdAndSizeId, addCartItem } from "../api";

const SingleProduct = ({ token, cart, setCart }) => {
    const [singleProduct, setSingleProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState(0);

    const {productId} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3000/api/products/${productId}`)
        .then((response) => {
            setSingleProduct(response.data);
            setSizes(response.data.sizes);
            setSize(response.data.sizes[0].sizeId);
        })
        // eslint-disable-next-line
    }, [])

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [openCartAlert, setOpenCartAlert] = useState(false);
    const [addedItem, setAddedItem] = useState(1);

    const handleCartAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAddedItem(1);
        setOpenCartAlert(false);
    };

    const [openStockAlert, setOpenStockAlert] = useState(false);
    const [stock, setStock] = useState(0);

    const handleStockAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenStockAlert(false);
    };

    const handleQuantityChange = async (event) => {
        const inventory = await getInventoryByProductIdAndSizeId(productId, size);
        if(inventory.stock >= event.target.value) {
            setQuantity(event.target.value);
        }
        else {
            setStock(inventory.stock);
            setOpenStockAlert(true);
            setQuantity(1);
            event.target.value = 1;
        }
    }

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    }

    const handleAddToCart = async (singleProduct) => {
        const inventory = await getInventoryByProductIdAndSizeId(productId, parseInt(size));
        if(token) {
            setAddedItem(await addCartItem(token, inventory.id, parseInt(quantity)));
        }
        else {
            let itemExisted = false;
            const items = [...cart];

            for(let i = 0; i < items.length; i++) {
                if(items[i].inventoryId === inventory.id) {
                    setAddedItem(undefined);
                    itemExisted = true;
                }
            }
            if(!itemExisted) {
                let sizeNum = '';
                let sizeGen = '';
                for(let i = 0; i < singleProduct.sizes.length; i++) {
                    if(singleProduct.sizes[i].sizeId === parseInt(size)) {
                        sizeNum = singleProduct.sizes[i].size;
                        sizeGen = singleProduct.sizes[i].gender;
                    }
                }
                
                items.push(
                    {
                        productId: singleProduct.id,
                        brand: singleProduct.brand,
                        price: singleProduct.price,
                        name: singleProduct.name,
                        image: singleProduct.image,
                        sizeId: parseInt(size),
                        size: sizeNum,
                        gender: sizeGen,
                        inventoryId: inventory.id,
                        count: parseInt(quantity)
                    }
                )
                setCart(items);
                localStorage.setItem('cart', JSON.stringify(items));
            }
        }
        setOpenCartAlert(true);
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{marginTop: '15px'}}>{singleProduct.name}</h2>
                <img src={singleProduct.image} alt={singleProduct.name} width="100%" height="395px"></img>
                <h3 style={{marginTop: '15px'}}>Brand: {singleProduct.brand}</h3>
                <h3 style={{marginTop: '15px', marginBottom: '15px'}}>Price: {singleProduct.price}</h3>
                <div style={{width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <FormControl sx={{ width: '100px' }}>
                        <InputLabel variant="standard" htmlFor="select-quantity">Quantity</InputLabel>
                        <NativeSelect
                            defaultValue={quantity}
                            inputProps={{name: 'quantity', id: 'select-quantity'}}
                            onChange={(event) => handleQuantityChange(event)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={30}>30</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl sx={{ width: '130px' }}>
                        <InputLabel variant="standard" htmlFor="select-size">Size</InputLabel>
                        {sizes.length ?
                        <NativeSelect
                            defaultValue={sizes[0].sizeId}
                            inputProps={{name: 'size', id: 'select-size'}}
                            onChange={(event) => handleSizeChange(event)}>
                            {sizes.map((size, index) => {
                                return <option key={index} value={size.sizeId}>{size.gender} {size.size}</option>
                            })}
                        </NativeSelect>
                        : null}
                    </FormControl>      
                </div>
                <Button id='add-to-cart-button' variant="contained" size="large" 
                        onClick={() => handleAddToCart(singleProduct)} endIcon={<ShoppingCartIcon/>}>
                    Add To Cart
                </Button>
                <Snackbar open={openCartAlert} autoHideDuration={6000} onClose={handleCartAlertClose}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    {addedItem ? 
                    <Alert onClose={handleCartAlertClose} severity="success" sx={{ width: '100%' }}>
                        Item added to cart!
                    </Alert>
                    :
                    <Alert onClose={handleCartAlertClose} severity="error" sx={{ width: '100%' }}>
                        Item existed in cart!
                    </Alert>
                    }
                </Snackbar>
                <Snackbar open={openStockAlert} autoHideDuration={6000} onClose={handleStockAlertClose}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleStockAlertClose} severity="error" sx={{ width: '100%' }}>
                        Only {stock} left in stock!
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    )
}

export default SingleProduct;