import fetchWithAuth from "../api/fetchwithAuth"

const fetchFromDb = async (url, options) => {
    try{
        const response  = await fetchWithAuth(url, options);

        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message);
        }

        return await response.json();
    }catch(err){
        throw err
    }
}

export default fetchFromDb;