import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import fetchFromDb from "../../utils/fetchFromDb";
import { Navbar } from "../../components/navbar/navbar";
import {Footer} from'../../components/footer/footer';
import styles from '../successPage/success.module.css'

const API_URL = import.meta.env.VITE_API_URL;
const SucessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const [status, setStatus] = useState('loading');

    useEffect(( ) => {
        async function confirmOrder() {
            try{
                await fetchFromDb(`${API_URL}/payment/success`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({sessionId})
                });
                setStatus('success');
            }catch(err){
                console.log(err);
                setStatus('error');
            }
        }

        if(sessionId){
            confirmOrder();
        }
    }, [sessionId]);
    if(status === 'loading') return <div><div className={styles.spinnerContainer}><div className={styles.spinner}></div></div>
    <p>Confirming your order...</p></div>
    if(status === "error") return <p>Something went wrong confirming your payment.</p>
    return (
        <div className={styles.appWrapper}>
            <Navbar/>
             <div className={styles.main}><p className={styles.text}>payment Successful! Thank you for your order.</p></div>
             <Footer/>
        </div>
       
    )
    
}
export default SucessPage;