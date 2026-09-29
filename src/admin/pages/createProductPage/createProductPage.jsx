import CreateproductForm from "../../component/createproductForm/createProductForm";
import styles from '../createProductPage/createProductPage.module.css'
import fetchFromDb from "../../../utils/fetchFromDb";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

const CreateProductPage = () => {
    const onSubmit = async(formdata) => {
        await fetchFromDb(`${API_URL}/product/create`, {method: 'POST', body: formdata });
        navigate('/admin/products');
        toast.success('Product Created');
    }
    const navigate = useNavigate();

    const onCancel = () => {
        navigate('/admin/products');
    };
    return(
        <div className={styles.container}>
              <div>
                <h1 className={styles.heroHeader}>Add product</h1>
                <p className={styles.heroText}>Fill in the details, then save.</p>
            </div>

             <CreateproductForm onSubmit={onSubmit} onCancel={onCancel}/>
        </div>
    )
}
export default CreateProductPage;