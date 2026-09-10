import { useState } from "react";
import { useNavigate } from "react-router";
import AuthNavbar from "../../components/AuthNavbar/navbar";
import SignUpForm from "../../components/signUpForm/signUpForm";
import { Footer } from "../../components/footer/footer";
import styles from '../signupPage/signupPage.module.css'

export default function SignUpPage(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try{
            setLoading(true);
        e.preventDefault();
        const payload = {email, password, name};

        const response = await fetch('http://localhost:5000/signup',{
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        if(!response.ok){
            const data = await response.json();
            setError(data.message || "Something went wrong");
            return;
        }

        const data = await response.json();
        setError(null);
        setData(data);

        navigate('/signin', {replace: true});
    }catch(err){
        setError(err.message);
    }finally{
        setLoading(false);
    }
    }

    return(
        <div className={styles.container}>
            <div className={styles.navbar}>
                <AuthNavbar/>
            </div>

            <div className={styles.main}>
                <div className={styles.textContainer}>
                   <h1 className={styles.text}>Create an account</h1> 
                   <p className={styles.p}>Join ShopEase for curated modern essentials.</p>
                </div>
                <SignUpForm data={data} email={email} password={password} name={name} setEmail={setEmail} setPassword={setPassword} loading={loading} setName={setName} handleSubmit={handleSubmit} error={error}/>
            </div>

            <div>
                 <Footer/>
            </div>
        </div>  
    )
}