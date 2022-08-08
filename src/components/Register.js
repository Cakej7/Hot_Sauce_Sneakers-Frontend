import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const Register = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();

  const handlePasswordError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Passwords don't match!`
    })
  }
  const RegisterFetch = async (e) => {
    e.preventDefault();

    if (password.length < 5) {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password must be at least 5 characters.'
        })
    } 
    else {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password,
            }),
          });
    
        const data = await response.json();

        if (!response.ok || data?.error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Email already in use.`
          })
          throw new Error(data.message);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'New user created! Welcome!',
            showConfirmButton: false,
            timer: 2000
          })
          setEmail("");
          setPassword("");
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

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
        id="registerForm"
        onSubmit={RegisterFetch}
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
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Password"
            required
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper2"
            label="Confirm Password"
            required
            value={confirmedPassword}
            type="password"
            onChange={(e) => {
              setConfirmedPassword(e.target.value);
            }}
          />

          {password === confirmedPassword ? 
            <Button type="submit" form="registerForm" variant="contained">
              Register
            </Button>
            :
            <Button variant="contained" onClick={handlePasswordError}>
              Register
            </Button>
          }
          
          <Link to="/login">Already have an account? Login Here!</Link>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
