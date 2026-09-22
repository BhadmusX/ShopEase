import { useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import fetchFromDb from "../../utils/fetchFromDb";
import { Navbar } from "../../components/navbar/navbar";
import {Footer} from'../../components/footer/footer';
import styles from '../successPage/success.module.css'
import { useCart } from "../../hooks/useCart";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;
const SucessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState('loading');
    const hasConfrimed = useRef(false);
    const {clearCart} = useCart()

    useEffect(( ) => {
        if(hasConfrimed.current) return;
        hasConfrimed.current = true
        async function confirmOrder() {
            try{
                await fetchFromDb(`${API_URL}/payment/success`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({sessionId})
                });
                setStatus('success');
                clearCart();
            }catch(err){
                console.log(err);
                setStatus('error');
            }
        }

        if(sessionId){
            confirmOrder();
        }
    }, [sessionId]);
    if(status === 'loading') return <div className={styles.confirmOrder}><div className={styles.spinnerContainer}><div className={styles.spinner}></div></div>
    <p className={styles.confirmOrderText}>Confirming your order</p></div>
    if(status === "error") return <div className={styles.paymentError}><p className={styles.paymentErrorText}>Something went wrong confirming your payment.</p></div>
    return (
        <div className={styles.appWrapper}>
            <Navbar/>
             <div className={styles.main}>
                <div className={styles.paymentSuccessCard}>
                    <CheckCircle size={40}  color="#005236"/>
                     <div className={styles.text}><h1>payment Successful!</h1> <p>Thank you for your order.</p></div>
                     <Link to="/shop" className={styles.ShopLink}>Continue Shopping</Link>
                </div>
                </div>
             <Footer/>
        </div>
       
    )
    
}
export default SucessPage;