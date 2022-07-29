import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

//Import useState
//Paramter token, setToken

const Login = ({ setToken }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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
        onSubmit={async (e) => {
          console.log("SUBMIT");
          e.preventDefault();

          try {
            // const response = await fetch(apiUrl + "api/users/register", {
            const response = await fetch(
              "http://localhost:3000/api/users/login",
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
            console.log(data);
            console.log(response);

            if (!response.ok || data?.error || data?.name === "TypeError") {
              throw new Error(data.message);
            } else {
              setToken(data.token);
              localStorage.setItem("token", data.token);
              localStorage.setItem("username", data.user.username);
              setEmail("");
              setPassword("");
              navigate("/products");
            }

            console.log(data);
          } catch (error) {
            // TODO: Show the error message on the page
            setErrorMessage(error.message);
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
          {/* {errorMessage && <Typography>{errorMessage}</Typography>} */}
          <TextField
            //       <Link to="/login">Already had an account? Login here!</Link>
            // helperText="Don't have an account? Register Here"
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
          <Link to="/register">Register Here</Link>
          {/* <Button variant="contained" component="label">
            Log In
            <input hidden accept="image/*" multiple type="file" />
          </Button> */}
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
