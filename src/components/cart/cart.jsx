import { useCart } from "../../hooks/useCart.js"
import { Trash, Plus, Minus } from "lucide-react";
import styles from '../cart/cart.module.css'
import { Link } from "react-router";
import { useState } from "react";

export function Cart(){
    const {cartItems, removeCartItem, checkOut} = useCart();


    const subtotal = (item) => {
        const result = item.price * item.qty;
        return result.toFixed(2)
    }

    const removeCartitem = (cartId) => {
        removeCartItem(cartId);
    }

    const checkOutItems = () => {
        checkOut();
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    const [showModal, setShowModal] = useState(false);




    return (
        <>
        <div className={styles.container}>
            <h1 className={styles.text}>Your Shopping Cart</h1>
            <div className={styles.cartContainer}>
                <div className={styles.cartItems}>
            {
                cartItems.map((item) => {
                    return <div className={styles.itemContainer} key={item.id}>


                            <div className={styles.itemTopContainer}>
                                <div>
                                  <img src={item.imageUrl || item.image} alt={item.title} />
                                <h1 className={styles.title}>{item.title}</h1>  
                                </div>
                                <div><h1 className={styles.price}>${item.price}</h1></div>
                            </div>

                            <div className={styles.itemBottomContainer}>
                                 <div className={styles.btnContainer}>
                                       <button className={styles.btn} type="button" onClick={() => decreaseqty(item.id)}><Minus size={20}/></button>
                                       <input className={styles.input} type="number" value={item.qty} min={1} onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}/>
                                       <button className={styles.btn} type="button" onClick={() => increaseqty(item.id)}><Plus size={20}/></button>
                                 </div>
                                 <div><button className={styles.removeBtn} onClick={() => removeCartitem(item._id)}><Trash size={20}/>Remove</button></div>
                            </div>

                            <div className={styles.subtotal}><p>Subtotal:</p>${subtotal(item)}</div>

                    </div>
                })
            }
            </div>

            <div className={styles.checkoutCard}>
                <h1 className={styles.orderSummary}>Order Summary</h1>
                <div className={styles.subtotalTextContainer}><p>subtotal ({cartItems.length} items)</p> <p>${total.toFixed(2)}</p></div>
                <div className={styles.shipping }><p>Shipping</p> <p>Calculated at checkout</p></div>
                <div className={styles.tax}><p>Tax</p> <p>calculated at checkout</p></div>

                <div className={styles.total}><h1 className={styles.totalText}>Total</h1> <p className={styles.totalPrice}>${total.toFixed(2)}</p></div>

                <div className={styles.checkoutBtnContainer}>
                    <button className={styles.checkoutBtn} onClick={checkOutItems}>Proceed to Checkout</button>
                    <Link to="/shop" className={styles.continueShopping}>Continue Shopping</Link></div>
            </div>
        </div>
        </div>

        { showModal && ( <div className={styles.overlay} >
    <div className={styles.modal}>
      <h2 className={styles.successText}>Payment Successful!</h2>
      <p className={styles.successText2}>Thank you for your order.</p>
      
    </div>
  </div>)}
    </>
    )
}

// onClick={handleCloseModal}
// <button onClick={handleCloseModal} className={styles.closeBtn}>Close</button>