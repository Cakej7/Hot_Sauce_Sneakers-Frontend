import React, { useEffect, useState } from "react";
import { Container, Box, Paper, Stack, styled } from "@mui/material";

const AdminProducts = ({ token }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/admin`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        console.log(result);
        setProducts(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

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
