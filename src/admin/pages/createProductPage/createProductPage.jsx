import CreateproductForm from "../../component/createproductForm/createProductForm";
import styles from '../createProductPage/createProductPage.module.css'
const CreateProductPage = () => {
    return(
        <div className={styles.container}>
              <div>
                <h1 className={styles.heroHeader}>Add product</h1>
                <p className={styles.heroText}>Fill in the details, then save.</p>
            </div>

             <CreateproductForm/>
        </div>
    )
}
export default CreateProductPage;