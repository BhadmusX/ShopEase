import fetchWithAuth from "../api/fetchwithAuth";

const fetchProductFromDb = async (url, signal = null) => {
  const response = await fetchWithAuth(url, { signal });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

export default fetchProductFromDb;