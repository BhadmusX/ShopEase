// components/ProductCard.jsx
import styles from '../productCard/productCard.module.css'
import { useEffect, useState } from "react";
import { Plus, Minus, ShoppingCart, Heart} from "lucide-react";
import useAddToCart from '../../hooks/useAddToCart.js';
import toast from 'react-hot-toast';
import useAddToWish from '../../hooks/useAddToWish.js';
import useGetWishList from '../../hooks/useGetWishList.js';
import useRemoveFromWish from '../../hooks/useRemoveFromWish.js';

export default function ProductCard({ product }) {
    const [qty, setQty] = useState(1);
    const [wishListIds, setwishListIds] = useState(new Set());
    const {cartloading, carterror, addtocart} = useAddToCart();
    const {getWishList} = useGetWishList()
    const {addToWish} = useAddToWish();
    const {removeFromWish} = useRemoveFromWish()
    const productId = String(product.id);

    useEffect(() => {
        async function loadWishList() {
            const wishList = await getWishList();
            setwishListIds(new Set(wishList.map(favorite =>
                String(favorite.productId._id)
            )));
        }
        loadWishList();
    }, [getWishList]);

    const isWishListed = wishListIds.has(productId);

    const increment = () => setQty((prev) => prev + 1);
    const decrement = () => setQty((prev) => Math.max(1, prev - 1));

    const handleAddToCart = async () => {
        try{
        await addtocart(productId, qty ); 
        toast.success('Item Added') 
        }catch{
            toast.error(carterror)
        } 
    };

    const handleAddToWish = async () => {
        const isWishListed = wishListIds.has(productId);

        try{
            if(isWishListed){
                await removeFromWish(productId);
                 setwishListIds(prev => {
                const next = new Set(prev);
                next.delete(productId);
                return next;
            });
                toast.success('Item Removed');
            }else{
            await addToWish(productId);
            setwishListIds(prev => new Set(prev).add(productId));
            toast.success('Item Added')
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    return (
        <div className={styles.productContainer} key={product.id}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src={product.image} alt={product.title} />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.info}> 
                     <p className={styles.text}>{product.title}</p>
                <p className={styles.price}>${product.price}</p>
                <div className={styles.btnContainer}>
                    <button className={styles.btn} type="button" onClick={decrement}><Minus size={20}/></button>
                    <input className={styles.input} type="number" value={qty} min={1} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}/>
                    <button className={styles.btn} type="button" onClick={increment}><Plus size={20}/></button>
                </div>
                <div className={styles.addbtnContainer}>
                    <button className={styles.addbtn} onClick={handleAddToCart}><ShoppingCart size={20}/>{cartloading ? "Adding" : "Add"}</button> <div><Heart className={isWishListed? styles.filledHeart : styles.heart} size={30} onClick={handleAddToWish}/> </div>
                </div>
                </div>
            </div>
        </div>
    );
}