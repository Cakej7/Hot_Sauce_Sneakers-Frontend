// api functions goes here
const BASE_URL = "https://blooming-coast-91378.herokuapp.com/api";
// https://fathomless-tor-90916.herokuapp.com

// fetch cart items for logged in user
export const fetchCartItems = async (token) => {
  const url = `${BASE_URL}/cart`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.cart;
  } catch (e) {
    console.error(e);
  }
};

// update cart item for logged in user
export const updateCartItem = async (token, inventoryId, count) => {
  const url = `${BASE_URL}/cart`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        inventoryId,
        count,
      }),
    });
    const data = await response.json();
    return data.cart;
  } catch (e) {
    console.error(e);
  }
};

// delete cart item for logged in user
export const deleteCartItem = async (token, inventoryId) => {
  const url = `${BASE_URL}/cart`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        inventoryId,
      }),
    });
    const data = await response.json();
    return data.cart;
  } catch (e) {
    console.error(e);
  }
};

// add cart item for logged in user
export const addCartItem = async (token, inventoryId, count) => {
  const url = `${BASE_URL}/cart`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        inventoryId,
        count,
      }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

// get inventory by product id and size id
export const getInventoryByProductIdAndSizeId = async (productId, sizeId) => {
  const url = `${BASE_URL}/inventory/${productId}/${sizeId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

// add inventory
export const addInventory = async (token, productId, sizeId, stock) => {
  const url = `${BASE_URL}/inventory/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        sizeId,
        stock,
      }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

// update inventory for checkout
export const updateInventory = async (productId, sizeId, count) => {
    const url = `${BASE_URL}/inventory/${productId}`;
    
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sizeId,
                count
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// create order when checkout
export const createOrder = async (token) => {
    const url = `${BASE_URL}/orders`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// add items to order history
export const addItemToOrderHistory = async (token, orderId, inventoryId, count, price) => {
    const url = `${BASE_URL}/orders/${orderId}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                inventoryId,
                count,
                price
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// fetch product brands
export const fetchBrands = async () => {
  const url = `${BASE_URL}/brands`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

// update product
export const updateProduct = async (productId, name, price, brand, image) => {
  const url = `${BASE_URL}/products/${productId}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        image,
        brandId: brand,
      }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

// get products of selected brand
export const fetchProductsByBrand = async (brandId) => {
  const url = `${BASE_URL}/products/brands/${brandId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

// get all products
export const fetchAllProductsInStock = async () => {
  const url = `${BASE_URL}/products`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};