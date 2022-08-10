import React, { useEffect, useState } from "react";
import { styled, Paper, Stack } from "@mui/material";

const Orders = () => {
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(
          `https://fathomless-tor-90916.herokuapp.com/api/users/${userId}/orderhistory`,
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
          throw new Error(data.message);
        } else {
          setOrders(data.data);
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
    <div>
      <h2 className='page-title' style={{textAlign: 'center', margin: '25px'}}>Order History</h2>
      {orders ? 
      <Stack
      spacing={1}
      sx={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}
    >
      {/* <p>Current User: {userId}</p> */}
      {orders.map((order, index) => {
        let orderTotal = 0;

        return (
          <Item
            key={index}
            sx={{
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Stack spacing={2}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <h3 style={{ marginBottom: "0px" }}>Order Id: {order.id}</h3>
                <p style={{ marginBottom: "0px" }}>Status: {order.status}</p>
              </div>
              <Stack spacing={2}>
                {order.items.map((item, index) => {
                  const priceCurrency = item.purchasePrice.slice(0, 1);
                  const productPrice = parseInt(
                    item.purchasePrice.slice(1, -1)
                  );
                  orderTotal += productPrice * item.count;

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between"
                      }}
                    >
                      <img
                        src={item.image}
                        alt="product"
                        width="100"
                        height="70"
                      />
                      <div style={{width: '20%'}}>
                        <h4>{item.name}</h4>
                        <p>Brand: {item.brand}</p>
                        <p>Size: {item.size}</p>
                      </div>
                      <div>
                        <p>Unit Price: {item.purchasePrice}</p>
                        <p>Quantity: {item.count}</p>
                      </div>
                      <div>
                        <p>
                          Total: {priceCurrency}
                          {productPrice * item.count}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <h2 style={{ textAlign: "right" }}>
                  Order Total: ${orderTotal}
                </h2>
              </Stack>
            </Stack>
          </Item>
        );
      })}
    </Stack>
      :
      <h3 style={{textAlign: 'center', margin: '50px'}}>You don't have any orders yet!</h3>
      }
    
    </div>
    
  );
};

export default Orders;
