import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

import { Link } from "react-router-dom";
// import { apiUrl } from "../api";

//Import useState
//Paramter token, setToken

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     const newToken = await register(username, password);
  //     setToken(newToken);
  //   };

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
              "htttp://localhost:3000/api/users/register",
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
          <TextField
            //       <Link to="/login">Already had an account? Login here!</Link>
            helperText="Already have an account? Login Here"
            id="demo-helper-text-aligned"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button type="submit" form="registerForm" variant="contained">
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
