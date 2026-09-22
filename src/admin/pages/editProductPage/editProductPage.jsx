import { useEffect, useState } from "react";
import CreateproductForm from "../../component/createproductForm/createProductForm";
import styles from '../editProductPage/editProductPage.module.css';
import fetchFromDb from "../../../utils/fetchFromDb";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

const EditProductPage = () => {
    const {id} = useParams();
      const navigate = useNavigate();

    const onSubmit = async(formdata) => {
        try{
        await fetchFromDb(`${API_URL}/product/update/${id}`, {method: 'PUT', body: formdata });
        toast.success('Product Update');
        navigate('/admin/products');
        }catch(err){
            toast.error(err.message);
        }
    }

    const onCancel = () => {
        navigate('/admin/products');
    };
    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            try{
                const response = await fetchFromDb(`${API_URL}/product/get/${id}`, {
                    method: 'GET',
                });
                console.log(response);
                setInitialValues(response);
            }catch(err){
                toast.error(err.message);
                navigate('/admin/products');
            }finally{
                setLoading(false);
            };
        };

        loadProduct();
    }, [id, navigate]);

    return(
        <div className={styles.container}>
              <div>
                <h1 className={styles.heroHeader}>Edit product</h1>
                <p className={styles.heroText}>Update the details, then save your changes.</p>
            </div>
             {loading ? <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div>:<CreateproductForm onSubmit={onSubmit} onCancel={onCancel} initialValues={initialValues} submitLabel="Save Changes"/>}
        </div>
    )
}
export default EditProductPage;