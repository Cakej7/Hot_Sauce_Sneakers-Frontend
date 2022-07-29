// api functions goes here
const BASE_URL = 'http://localhost:3000/api';

// fetch cart items for logged in user
export const fetchCartItems = async (token) => {
    const url = `${BASE_URL}/cart`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.cart;
    }
    catch(e) {
        console.error(e);
    }
}

// update cart item for logged in user
export const updateCartItem = async (token, inventoryId, count) => {
    const url = `${BASE_URL}/cart`;
    
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                inventoryId,
                count
            })
        });
        const data = await response.json();
        return data.cart;
    }
    catch(e) {
        console.error(e);
    }
}

// delete cart item for logged in user
export const deleteCartItem = async (token, inventoryId) => {
    const url = `${BASE_URL}/cart`;
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                inventoryId
            })
        });
        const data = await response.json();
        return data.cart;
    }
    catch(e) {
        console.error(e);
    }
}