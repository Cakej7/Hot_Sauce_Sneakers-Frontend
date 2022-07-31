import React, { useEffect, useState } from "react";
import { styled, Paper, Stack } from "@mui/material";

const Orders = () => {
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([1, 2, 3]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}/orderhistory`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({
            //   email: email,
            //   password: password,
            // }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          //   setErrorMessage(data.message);
          throw new Error(data.message);
        } else {
          // setOrders(data.data);
        }

        console.log(data);
      } catch (error) {
        // TODO: Show the error message on the page
        console.log(error);
      }
    };

    fetchOrderHistory();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <Stack
      spacing={1}
      sx={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}
    >
      <p>Current User: {userId}</p>
      {orders.map((order, index) => {
        return <p key={index}>{order.orderId}</p>;
      })}
      {orders.map((order, index) => {
        return (
          <Item
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              src="https://cdn.flightclub.com/3000/TEMPLATE/299069/1.jpg"
              alt="product image"
              width="100"
              height="70"
            />
            <div>
              <p>Name:Jordan Shoes</p>
              <p>Brand: Jordan</p>
              <p>Price: $100</p>
              <p>Qty: 1</p>
            </div>
          </Item>
        );
      })}
    </Stack>
  );
};

export default Orders;
