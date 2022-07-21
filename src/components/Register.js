import React from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

import { Link } from "react-router-dom";

//Import useState
//Paramter token, setToken

const Register = () => {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");

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
      <form>
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
          />
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Password"
          />

          <Button variant="contained" component="label">
            Register
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
