import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { Link } from "react-router-dom";
// import { apiUrl } from "../api";

//Import useState
//Paramter token, setToken

const Register = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form
        id="registerForm"
        onSubmit={async (e) => {
          console.log("SUBMIT");
          e.preventDefault();

          try {
            // const response = await fetch(apiUrl + "api/users/register", {
            const response = await fetch(
              "http://localhost:3000/api/users/register",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: email,
                  password: password,
                }),
              }
            );

            const data = await response.json();

            if (!response.ok) {
              setErrorMessage(data.message);
              throw new Error(data.message);
            }

            console.log(data);
          } catch (error) {
            // TODO: Show the error message on the page
            console.log(error);
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            //   alignItems: "center",
            flexDirection: "column",
            maxWidth: "100%",
          }}
        >
          {errorMessage && <Typography>{errorMessage}</Typography>}
          <TextField
            //       <Link to="/login">Already had an account? Login here!</Link>
            // helperText="Already have an account? Login Here"
            helperText=" "
            id="demo-helper-text-aligned"
            label="Email"
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
          <Link to="/login">Login Here</Link>
          <Button type="submit" form="registerForm" variant="contained">
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
