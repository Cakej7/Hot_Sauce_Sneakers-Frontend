import React, { useEffect, useState } from "react";
import { Container, Box, Paper, Stack, styled, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminUsers = ({ token }) => {

  let navigate = useNavigate()
  

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
      // console.log(result);
      setUsers(result);
    } catch (err) {
      console.error(err);
    }
  };

  const userDeleteFetch = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/deactivate/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const result = await response.json()
      console.log(result)
      userInfoFetch()
      return result
    } catch (err) {
      console.error(err)
    }
  }

  const userUpgradeToAdminFetch = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/upgrade/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const result = await response.json()
      console.log(result)
      userInfoFetch()
      return result
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    userInfoFetch();
  }, []);

  return (
    <Container maxWidth="md">
      <h2 className='page-title' style={{ textAlign: "center", marginBottom: '25px', color: 'black' }}>User Information</h2>
      <Box sx={{ height: "100%" }}>
        <Stack spacing={2}>
          {users.map((user) => {
            return (
              <Item
                key={user.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h2 className="sub-title">Email: {user.email}</h2>
                  <p className="small-title">{`Is Admin: ${user.isAdmin}`}</p>
                  <p className="small-title">{`Is Active User: ${user.isActive}`}</p>
                </div>
                <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center" }}>
                    {user.isAdmin === false ?
                      <Button
                        onClick={async (e) => {
                          e.preventDefault()
                          Swal.fire({
                            title: 'Are you sure you want to upgrade this user to admin?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, upgrade user'
                        }).then((result) => {
                            if (result.isConfirmed) {
                            Swal.fire(
                                'Upgraded!',
                                'User upgraded to admin.',
                                'success'
                            )
                            userUpgradeToAdminFetch(user.id)
                            console.log(user.id)
                            navigate('/admin/users')
                            }
                          })
                        }}
                        >Upgrade user to Admin
                      </Button>
                    :
                    null
                  }
                  
                  {user.isActive === true ? 
                    <Button
                    onClick={async (e) => {
                      e.preventDefault()
                      Swal.fire({
                        title: 'Are you sure you want to deactivate this user?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, deactivate user'
                    }).then((result) => {
                        if (result.isConfirmed) {
                        Swal.fire(
                            'Deleted!',
                            'User deleted.',
                            'success'
                        )
                        userDeleteFetch(user.id)
                        console.log(user.id)
                        navigate('/admin/users')
                        }
                    })
                    }}
                    >Deactivate user</Button>
                    :
                    null
                  }

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
