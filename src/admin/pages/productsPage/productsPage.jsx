import { useEffect } from "react";
import ProductCard from "../../component/productCard/adminProductCard";
import useFetchproduct from "../../../hooks/useFetchProduct";
import styles from '../productsPage/productsPage.module.css'
import { Link } from "react-router";
import { Plus } from "lucide-react";

const ProductsPage = () => {
const {fetchproduct, loading, products, removeproduct, toggleFeaturedProduct} = useFetchproduct();

    useEffect(() => {
        fetchproduct();
    }, [fetchproduct]);

    console.log(products);
    return(
        <>
            <div>
                <div className={styles.productHeader}>
                    <div className={styles.headerInfo}>
                        <h1>Products</h1>
                        <p>{products.length} products</p>
                    </div>

                    <div className={styles.headerBtnContainer}>
                        <Link className={styles.headerBtn} to='/admin/products/create'><Plus size={20} />Add Product</Link>
                    </div>
                </div>
                { loading ? <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div> : products.map(prod => {
                    return <ProductCard key={prod.id} product={prod} removeproduct={removeproduct} toggleFeaturedProduct={toggleFeaturedProduct}/>;
                })}
            </div>
        </>
    )
}

export default ProductsPage;