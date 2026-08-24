const  fetchProducts = async (url, signal=null) => {
    const response = await fetch(url, {signal});

    if(!response.ok){
        throw new Error(`Response Status: ${response.status}`);
    }

    return response.json();
}

export default fetchProducts;