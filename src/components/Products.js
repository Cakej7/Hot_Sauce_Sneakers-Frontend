import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const Products = ({ products, setProducts }) => {
    
    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
        .then((response) => {
            // console.log(response.data)
            setProducts(response.data)
        })
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
            {
                products.map(({ id, name, brand, image, price }) => {
                    return (
                        <div key={id} >
                            <Card  sx={{ maxWidth: 550, minHeight: '65vh', margin: '10px'}}>
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
    )
}

export default Products;