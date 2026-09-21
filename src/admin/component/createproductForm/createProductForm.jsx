import { useEffect, useMemo, useState } from "react"
import styles from '../createproductForm/createProductForm.module.css'
const API_URL = import.meta.env.VITE_API_URL;
const CreateproductForm = ({
    initialValues = {},
    onSubmit,
    onCancel,
    submitLabel = "Save Product",
}) => {
    const [title, setTitle] = useState(initialValues.title || "");
    const [price, setPrice] = useState(initialValues.price || "");
    const [category, setCategory] = useState(initialValues.category || "clothing");
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const preview = useMemo(
        ()=> {
            if(imageUrl){
                return URL.createObjectURL(imageUrl)
            }
            if(initialValues?.imageUrl){
              return `${API_URL}/${initialValues?.imageUrl}`  
            }

            return null;
        },
        [imageUrl, initialValues]
    );

    useEffect(()=> {
        return () => {
            if(imageUrl) URL.revokeObjectURL(preview);
        };
    }, [imageUrl, preview]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("category", category);
        formdata.append("price", price);

        if(imageUrl) formdata.append('imageUrl', imageUrl);

        try{
            setLoading(true);
            await onSubmit(formdata);
        }finally{
            setLoading(false);
        }
    };
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
                    Image
                    {preview  &&(
                        <img
                        src={preview}
                        alt="Product Preview"
                        className={styles.preview}
                        />
                    )}
                    <input type="file"
                    className={styles.input}
                    name="file"
                    id="image"
                    onChange={(e) => setImageUrl(e.target.files[0] ?? null)}/>
                </label>
                <div className={styles.btnContainer}>
                    <button className={styles.cancelBtn} type="button" onClick={onCancel}>Cancel</button>
                    <button className={styles.saveBtn} type="submit" disabled={loading}>{loading? "Saving" : submitLabel}</button>
                </div>
            </form>
        </div>
    )
}

export default CreateproductForm;