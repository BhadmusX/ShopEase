import styles from '../products/products.module.css';
import ProductCard from "../productCard/productCard.jsx";
import useFetchProductFromDb from '../../hooks/fetchProductFromDb.js';

export default function Products() {
  const [loading, error, products] = useFetchProductFromDb();
  const productList = Array.isArray(products) ? products : [];
  console.log(productList);

  if (loading) {
    return <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div>;
  }

  if (error) {
    return <p>Something went Wrong: {error.message}</p>;
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
