import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Box,
  Stack,
  styled,
  Paper,
  Divider,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";

const CreateNewProductForm = ({ products, setProducts }) => {
  const tempToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJqYWNvYkBhZG1pbi5jb20iLCJpYXQiOjE2NTkwNjQ3NzQsImV4cCI6MTY1OTY2OTU3NH0.IJACOJ5HzOhu9u9972Lm2vpJp6x1eSaIBcYDIWs9vRU";
  let navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [name, setProductName] = useState("");
  const [price, setProductPrice] = useState(null);
  const [brand, setProductBrand] = useState(null);
  const [image, setProductImage] = useState("");

  const createProductFetch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/products`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tempToken}`,
        },
        body: JSON.stringify({
          name,
          price,
          brandId: brand,
          image,
        }),
      });
      const result = await response.json();
      console.log(result);
      // navigate(`../products`)
    } catch (err) {
      console.log(err);
    }
  };

  // post method for api/inventory to add new product to stock
  const addProductToInventory = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/inventory`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tempToken}`,
        },
        body: JSON.stringify({
          name,
          price,
          brandId: brand,
          image,
        }),
      });
      const result = await response.json();
      console.log(result);
      // navigate(`../products`)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      setBrands(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const onCreateProductSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch(apiUrl + "api/users/register", {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          brandId: brand,
          price: price,
          image: image,
        }),
      });

      const data = await response.json();

      if (!response.ok || data?.error) {
        throw new Error(data.message);
      } else {
        setProductName("");
        setProductBrand("");
        setProductPrice("");
        setProductImage("");
      }

      console.log(data, "daata");
    } catch (error) {
      // TODO: Show the error message on the page
      console.log(error);
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <h2 style={{ textAlign: "center" }}>Add New Product</h2>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100%" }}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={(e) => onCreateProductSubmit(e)}
            >
              <div style={{ width: "100%" }}>
                <h3 style={{ textAlign: "center" }}>Product Name</h3>
                <TextField
                  label="Product Name"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  fullWidth
                  required
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                />
              </div>
              <div style={{ width: "100%" }}>
                <h3 style={{ textAlign: "center" }}>Product Price</h3>
                <TextField
                  label="Product Price"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  fullWidth
                  required
                  onChange={(e) => {
                    setProductPrice(e.target.value);
                  }}
                />
              </div>
              <div style={{ width: "100%" }}>
                <h3 style={{ textAlign: "center" }}>Product Image</h3>
                <TextField
                  label="Image URL"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  fullWidth
                  required
                  onChange={(e) => {
                    setProductImage(e.target.value);
                  }}
                />
              </div>
              <div style={{ width: "100%" }}>
                <h3 style={{ textAlign: "center" }}>Brand</h3>
                <FormControl sx={{ width: "100%", marginBottom: "10px" }}>
                  <InputLabel variant="standard" htmlFor="select-quantity">
                    Select Brand
                  </InputLabel>
                  <NativeSelect
                    inputProps={{ name: "quantity", id: "select-quantity" }}
                    fullWidth
                    onChange={(e) => {
                      setProductBrand(e.target.value);
                    }}
                  >
                    <option>Select Brand</option>
                    {brands.map((brand) => {
                      return (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </FormControl>
              </div>
              <Button
                type="submit"
                id="pay-button"
                variant="contained"
                size="large"
              >
                Submit
              </Button>
            </form>
          </div>
        </Box>
      </Container>

      {/* <form
        onSubmit={(e) => {
            e.preventDefault()
            createProductFetch()
        }}
        >
                <label>Product name: </label>
                <input
                    type="text"
                    required
                    onChange={(e) => { setProductName(e.target.value) }}
                />

                <label>Product price: </label>
                <input
                    type="number"
                    required
                    onChange={(e) => { setProductPrice(e.target.value) }}
                />

                <label>Product brand: </label>
                map through the brands and display them as a dropdown menu

                <label>Product image: </label>
                <input
                    type="text"
                    required
                    onChange={(e) => { setProductImage(e.target.value) }}
                />  

                <button
                onClick={async (e) => {
                    e.preventDefault();
                    const productToAdd = await createProductFetch();
                    setProducts([...products, productToAdd]);
                    console.log(products)
                    await addProductToInventory(productToAdd)
                }}>
                    Submit
                </button>
            </form> */}
    </>
  );
};

export default CreateNewProductForm;
