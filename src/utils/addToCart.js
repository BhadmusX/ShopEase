import fetchWithAuth from "../api/fetchwithAuth"

const addToCart = async (productId, qty =1) => {
        const response = await fetchWithAuth('http://localhost:5000/cart/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({productId:productId, qty:qty})
        });

        if(!response.ok){
            const error = await response.json();
            throw new Error(`message: ${error.message}`);
        }

        return await response.json();
}

export default addToCart;