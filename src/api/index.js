// api functions goes here
const APIURL = 'https://localhost:3000/api'

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${APIURL}/products`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = response.json()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

export const getAllProductsInStock = async () => {
    try {
        const response = await fetch(`${APIURL}/products`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = response.json()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}