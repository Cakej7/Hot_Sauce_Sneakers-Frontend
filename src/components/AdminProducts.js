import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Stack,
  styled,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { fetchBrands, updateProduct } from "../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminProducts = ({ token }) => {

  let navigate = useNavigate()

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(null);
  const [productBrand, setProductBrand] = useState(null);
  const [productImage, setProductImage] = useState("");
  const [editProductModal, setEditProductModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    } catch (err) {
      console.log(err);
    }
  };

  const onEditProductModalOpen = (product) => {
    fetchBrands()
      .then((response) => {
        setBrands(response);
      })
      .catch((err) => console.log(err));
    setEditProductId(product.id);
    setProductName(product.name);
    setProductPrice(product.price);
    setProductImage(product.image);
    setProductBrand(product.brandId);
    setEditProductModal(true);
  };

  const onEditProductModalClose = () => {
    setEditProductModal(false);
  };

  const onEditProductSubmit = () => {
    updateProduct(
      editProductId,
      productName,
      productPrice,
      productBrand,
      productImage
    )
      .then((response) => {
        onEditProductModalClose();
        fetchProducts();
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  return (
    <>
      <Container maxWidth="md">
        <h1 className='page-title' style={{ textAlign: "center", marginBottom: '25px', color: 'black' }}>Product Information</h1>
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
                      <h2 className="sub-title">Product Name: {product.name}</h2>
                      <h4 className="small-title">Price: {product.price}</h4>
                      <p className="small-title">Brand: {product.brand}</p>
                      {/* <p>Is Active User: ${user.isActive}</p>  */}
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>

                    <Button onClick={() => onEditProductModalOpen(product)}>
                      Edit
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

        {/* Edit Product Dialog */}
        <Dialog
          fullWidth
          maxWidth="md"
          open={editProductModal}
          onClose={onEditProductModalClose}
        >
          <DialogTitle sx={{textAlign: 'center', fontFamily: 'Kanit', fontSize: '2.5em' }}>Edit Product</DialogTitle>
          <DialogContent>
            <div>
              <Stack spacing={2}>
                {errorMessage && <Typography>{errorMessage}</Typography>}
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <h3 className="small-title" style={{ textAlign: "center" }}>Product Name</h3>
                    <TextField
                      label="Product Name"
                      variant="outlined"
                      margin="normal"
                      type="text"
                      fullWidth
                      value={productName}
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
                      value={productPrice}
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
                      value={productImage}
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
                        value={productBrand}
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
                    id="pay-button"
                    variant="contained"
                    size="large"
                    onClick={async () => {
                      onEditProductSubmit()
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Product updated',
                        showConfirmButton: false,
                        timer: 2000
                      })
                    }}
                  >
                    Update Product
                  </Button>
                </form>
              </Stack>
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default AdminProducts;
