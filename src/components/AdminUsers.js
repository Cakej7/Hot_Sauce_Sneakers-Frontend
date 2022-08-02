import React, { useEffect, useState } from "react";
import { Container, Box, Paper, Stack, styled } from "@mui/material";

const AdminUsers = ({ token }) => {
  const [users, setUsers] = useState([]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  const userInfoFetch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      setUsers(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    userInfoFetch();
  }, []);

  return (
    <Container maxWidth="md">
      <h2 style={{ textAlign: "center" }}>User Information</h2>
      <Box sx={{ height: "100%" }}>
        <Stack spacing={2}>
          {users.map((user) => {
            return (
              <Item
                key={user.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <h2>Username: {user.username}</h2>
                    <h4>Email: {user.email}</h4>
                    <p>Is Admin: ${user.isAdmin}</p>
                    <p>Is Active User: ${user.isActive}</p>
                  </div>
                </div>
              </Item>
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
};

export default AdminUsers;
