import styles from '../productFilter/productFilter.module.css';
const ProductFilter = ({setActiveCategory, activeCategory, categories, count}) => {
    return(
        <div className={styles.filterBtnContainer}>
            {categories.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)} className={activeCategory === c ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn}>
                    {c}
                    {count && count[c] !== undefined && <span className={styles.orderCount}>{count[c]}</span>}
                </button>
            ))}
        </div>
    )
}
export default ProductFilter;