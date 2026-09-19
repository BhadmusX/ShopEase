import { useState } from "react"
import styles from '../createproductForm/createProductForm.module.css'
import fetchWithAuth from "../../../api/fetchwithAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const CreateproductForm = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Clothing");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    // let formdata = new FormData();
    // formdata.append("title", title);
    // formdata.append("category", category);
    // formdata.append("imageUrl", imageUrl);
    // formdata.append("price", price);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("category", category);
        formdata.append("imageUrl", imageUrl);
        formdata.append("price", price);
        try{
            setLoading(true);
            const response = await fetchWithAuth(`${API_URL}/product/create`, {
                method: 'POST',
                body: formdata
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || 'Failed to create product');
            }

            toast.success(data.message);
            setTitle('');
            setImageUrl('');
            setPrice('');
            navigate('/admin/products');

        }catch(err){
            toast.error(err.message)
        }finally{
            setLoading(false)
        }
    }
    const handleCancel = () => {
        navigate('/admin/products');
    }
    return(
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="title">
                    Product name
                    <input type="text"
                    name="title"
                    id="title"
                    placeholder="Nike T-Shirt"
                    value={title} 
                    className={styles.input}
                    onChange={(e) => setTitle(e.target.value)}/>
                </label>

                 <label htmlFor="category">
                    Category
                   <select name="category" id="category"
                   value={category}
                   className={styles.select}
                   onChange={(e) => setCategory(e.target.value)}>
                    <option value="clothing" >Clothing</option>
                    <option value="glasses">Glasses</option>
                    <option value="watches">Watches</option>
                    <option value="shoes">Shoes</option>
                   </select>
                </label>

                 <label htmlFor="price">
                    Price
                    <input type="Number"
                    className={styles.input}
                    placeholder="0.00"
                    name="price"
                    id="price"
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}/>
                </label>

                 <label htmlFor="image">
                    <input type="file"
                    className={styles.input}
                    name="file"
                    id="image"
                    onChange={(e) => setImageUrl(e.target.files[0])}/>
                </label>
                <div className={styles.btnContainer}>
                    <button className={styles.cancelBtn} type="button" onClick={handleCancel}>Cancel</button>
                    <button className={styles.saveBtn} type="submit">{loading? "Saving" : "Save product"}</button>
                </div>
            </form>
        </div>
    )
}

export default CreateproductForm;