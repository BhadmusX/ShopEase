import styles from '../products/products.module.css';
import ProductCard from "../productCard/productCard.jsx";
import useFetchProducts from '../../hooks/useFetchproducts.jsx';
import { useEffect } from 'react';

export default function Products() {
  const {fetchProduct, productData, productError, productLoading} = useFetchProducts();
  const productList = Array.isArray(productData) ? productData : [];

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (productLoading) {
    return <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div>;
  }

  if (productError) {
    return <p>Something went Wrong: {productError.message}</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.text}>All Products</h1>
        <p className={styles.p}>Discover our latest collection curated just for you.</p>
      </div>
      <div className={styles.products}>
        {productList.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
