import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addCartItem } from "../api";
import Swal from 'sweetalert2'

const Login = ({ cart, setToken }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            const response = await fetch(
              "https://blooming-coast-91378.herokuapp.com/api/users/login",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email,
                  password,
                }),
              }
            );

            const data = await response.json();
          
            if (!response.ok || data?.error || data?.name === "TypeError") {
              throw new Error(data.message);
            } else {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login succesful!',
                showConfirmButton: false,
                timer: 1500
              })
              setToken(data.token);
              localStorage.setItem("token", data.token);
              localStorage.setItem("email", data.user.email);
              localStorage.setItem("userId", data.user.id);
              localStorage.setItem("isAdmin", data.user.isAdmin);
              setEmail("");
              setPassword("");

              if(cart.length) {
                await Promise.all(cart.map((item) => addCartItem(data.token, item.inventoryId, item.count)));
              }

              localStorage.removeItem('cart');

              navigate("/products");
            }

          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Email and password didn't match our records, try again.`
            })
            console.error(error);
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            maxWidth: "100%",
          }}
        >
          <TextField
            helperText=" "
            id="demo-helper-text-aligned"
            label="Email"
            autoComplete="off"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Password"
            value={password}
            required
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button type="submit" variant="contained">
            Login
          </Button>
          <Link to="/register">Don't have an account? Register Here!</Link>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
