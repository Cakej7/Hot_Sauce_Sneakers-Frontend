import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import Swal from "sweetalert2";
import { addInventory, fetchBrands, updateInventory } from "../api";

const CreateNewProductForm = ({ token, products, setProducts }) => {

  let navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [name, setProductName] = useState("");
  const [price, setProductPrice] = useState(null);
  const [brand, setProductBrand] = useState(null);
  const [image, setProductImage] = useState("");

  const createProductFetch = async () => {
    try {
      const response = await fetch(`https://blooming-coast-91378.herokuapp.com/api/products`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
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

  const addProductToInventory = async () => {
    try {
      const response = await fetch(`https://blooming-coast-91378.herokuapp.com/api/inventory`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    fetchBrands()
      .then((response) => {
        setBrands(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const onCreateProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://blooming-coast-91378.herokuapp.com/api/products", {
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
        addInventory(token, data.id, 1, 10)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        navigate("/admin/products")
      }

      console.log(data, "daata");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <h1 className='page-title' style={{ textAlign: "center", marginBottom: '25px', color: 'black' }}>Add New Product</h1>
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
              onSubmit={(e) => {onCreateProductSubmit(e)
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Product added',
                  showConfirmButton: false,
                  timer: 2000
              })}
              }
            >
              <div style={{ width: "100%" }}>
                <h3 className="small-title" style={{ textAlign: "center" }}>Product Name</h3>
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
                <h3 className="small-title" style={{ textAlign: "center" }}>Product Price</h3>
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
                <h3 className="small-title" style={{ textAlign: "center" }}>Product Image</h3>
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
                <h3 className="small-title" style={{ textAlign: "center" }}>Brand</h3>
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
    </>
  );
};

export default CreateNewProductForm;
