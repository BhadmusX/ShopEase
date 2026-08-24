import styles from '../products/products.module.css'
import useFetchProducts from "../../hooks/fetchProducts";
import ProductCard from "../productCard/productCard.jsx";

export default function Products(){
    const [loading, error, products] = useFetchProducts();
  
    return (
        
            loading ? <div className={styles.spinnerContainer}><div className={styles.spinner}></div> </div>: error ? (
                <p>Something went Wrong: {error.message}</p>
            ):
        <div className={styles.container}>
        <div className={styles.textContainer}>
            <h1 className={styles.text}>All Products</h1>
            <p className={styles.p}>Discover our latest collection curated just for you.</p>
        </div>
        <div className={styles.products}>{
              products.map((prod) => {
                return <ProductCard key={prod.id} product={prod}/>
            })
        }
        </div>
        
        </div>
    )
}
