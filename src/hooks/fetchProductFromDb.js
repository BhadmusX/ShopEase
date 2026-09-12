import fetchProductFromDb from "../utils/fetchProductFromDb";
import { useState, useEffect } from "react";

const useFetchProductFromDb = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductFromDb("http://localhost:5000/product/get");

        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, []);

  return [loading, error, products];
};

export default useFetchProductFromDb;