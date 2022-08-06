import React, { useEffect, useState } from "react";
import { Container, Box, Paper, Stack, styled, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminProducts = ({ token }) => {

  let navigate = useNavigate()

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      console.error(err);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  const onDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.id) {
        fetchProducts();
      }
      // navigate(`../products`)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <h2 style={{ textAlign: "center" }}>Product Information</h2>
        <Box sx={{ height: "100%" }}>
          <Stack spacing={2}>
            {products.map((product) => {
              return (
                <Item
                  key={product.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <img src={product.image} width="150" />
                    </div>
                    <div>
                      <h2>Product Name: {product.name}</h2>
                      <h4>Price: {product.price}</h4>
                      <p>Brand: {product.brand}</p>
                      {/* <p>Is Active User: ${user.isActive}</p>  */}
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Button>
                      <Link to="/admin/editproduct/:productid">Edit</Link>
                    </Button>
                    <Button onClick={async(e) => {
                      e.preventDefault()
                      Swal.fire({
                        title: 'Are you sure you want to delete this product?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Product deleted',
                            showConfirmButton: false,
                            timer: 1000
                          })
                        onDeleteProduct(product.id)
                        navigate('/admin/products')
                        }
                    })
                      }}>
                      Delete
                    </Button>
                  </div>
                </Item>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default AdminProducts;
