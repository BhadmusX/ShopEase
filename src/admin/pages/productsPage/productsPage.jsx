import { useEffect } from "react";
import ProductCard from "../../component/productCard/adminProductCard";
import useFetchproduct from "../../../hooks/useFetchProduct";
import styles from '../productsPage/productsPage.module.css'
import { Link } from "react-router";
import { Plus } from "lucide-react";
import ProductFilter from "../../component/productFilter/productFilter";

const ProductsPage = () => {
    const categories = ["all", "clothing", "glasses", "watches", "shoes"];
const {fetchproduct, loading, filterProducts,  removeproduct, toggleFeaturedProduct, setActiveCategory, activeCategory, productCount} = useFetchproduct(categories);

    useEffect(() => {
        fetchproduct();
    }, [fetchproduct]);

    

    console.log(filterProducts);
    return(
        <>
            <div>
                <div className={styles.productHeader}>

                    <div className={styles.topHeader}>
                         <div className={styles.headerInfo}>
                        <h1>Products</h1>
                        <p>{filterProducts.length} products</p>
                    </div>

                    <div className={styles.headerBtnContainer}>
                        <Link className={styles.headerBtn} to='/admin/products/create'><Plus size={20} />Add Product</Link>
                    </div>
                    </div>

                    <ProductFilter setActiveCategory={setActiveCategory} activeCategory={activeCategory} categories={categories} count={productCount}/>
                </div>
                { loading ? <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div> : filterProducts.map(prod => {
                    return <ProductCard key={prod.id} product={prod} removeproduct={removeproduct} toggleFeaturedProduct={toggleFeaturedProduct}/>;
                })}
            </div>
        </>
    )
}

export default ProductsPage;