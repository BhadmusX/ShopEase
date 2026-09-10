import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import SignInForm from "../../components/signInForm/signInForm";
import AuthNavbar from "../../components/AuthNavbar/navbar";
import { Footer } from "../../components/footer/footer";
import styles from '../signinPage/signinPage.module.css'
export default function SignInPage(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setUser} = useAuth();

    const handleSubmit = async(e) => {
        try{
            setLoading(true);
        e.preventDefault();

        const payload = {email, password}
        const response = await fetch('http://localhost:5000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(payload),
            credentials: 'include',
        })

        if(!response.ok){
            const data = await response.json();
            setError(data.message);
            return;
        }

        const data = await response.json();
        setUser(data.data);
        setData(data.message);
        setError(null);

        navigate('/', {replace: true});
        }catch(err){
            setError(err.message);
            setUser(null); 
        }finally{
            setLoading(false);
        }
    }

    return(
         <div className={styles.container}>

            <div><AuthNavbar/></div>

            <div className={styles.main}>
                <div className={styles.textContainer}>
                <h1 className={styles.text}>Welcome back</h1> 
                <p className={styles.p}>Please enter your details to sign in.</p>
                </div>
                <SignInForm data={data} email={email} password={password} setEmail={setEmail} setPassword={setPassword} loading={loading} handleSubmit={handleSubmit} error={error}/></div>

            <div><Footer/></div>
        </div>
    )
}
