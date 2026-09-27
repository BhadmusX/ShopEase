import styles from '../productFilter/productFilter.module.css';
const ProductFilter = ({setActiveCategory, activeCategory, categories}) => {
    return(
        <div className={styles.filterBtnContainer}>
            {categories.map(c => (
                <button onClick={() => setActiveCategory(c)} className={activeCategory === c ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn}>{c}</button>
            ))}
        </div>
    )
}
export default ProductFilter;