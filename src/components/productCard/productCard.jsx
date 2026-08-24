// components/ProductCard.jsx
import styles from '../productCard/productCard.module.css'
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Plus, Minus, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
    const [qty, setQty] = useState(1);
    const { addToCart } = useCart();

    const increment = () => setQty((prev) => prev + 1);
    const decrement = () => setQty((prev) => Math.max(1, prev - 1));

    const handleAddToCart = () => {
        addToCart(product, qty);
        setQty(1);
    };

    return (
        <div className={styles.productContainer} key={product.id}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src={product.image} alt={product.title} />
            </div>
            <div className={styles.infoContainer}>
                <p className={styles.text}>{product.title}</p>
                <p className={styles.price}>${product.price}</p>
                <div className={styles.btnContainer}>
                    <button className={styles.btn} type="button" onClick={decrement}><Minus size={20}/></button>
                    <input className={styles.input} type="number" value={qty} min={1} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}/>
                    <button className={styles.btn} type="button" onClick={increment}><Plus size={20}/></button>
                </div>
                <div className={styles.addbtnContainer}>
                    <button className={styles.addbtn} onClick={handleAddToCart}><ShoppingCart size={20}/>Add</button>
                </div>
            </div>
        </div>
    );
}