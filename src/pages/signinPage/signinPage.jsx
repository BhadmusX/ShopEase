import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import SignInForm from "../../components/signInForm/signInForm";
import AuthNavbar from "../../components/AuthNavbar/navbar";
import { Footer } from "../../components/footer/footer";
import styles from '../signinPage/signinPage.module.css'
import toast from "react-hot-toast";
import imageWrapper from "../../assert/ImageWrapper.jpg";
import { Sparkle } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;
export default function SignInPage(){

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setUser} = useAuth();

    const handleSubmit = async(e) => {
        try{
            setLoading(true);
        e.preventDefault();

        const payload = {email, password}
        const response = await fetch(`${API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(payload),
            credentials: 'include',
        })

        if(!response.ok){
            const data = await response.json();
            throw Error(data.message || 'Error while signing in');
        }

        const data = await response.json();
        setUser(data.data);
        toast.success(data.message);

        navigate('/', {replace: true});
        }catch(err){
            toast.error(err.message);
            setUser(null); 
        }finally{
            setLoading(false);
        }
    }

    return(
         <div className={styles.container}>
            <div className={styles.authContainer}>
                 <div><AuthNavbar/></div>

            <div className={styles.main}>
                    <div className={styles.textContainer}>
                       <h1 className={styles.text}>Welcome back</h1> 
                        <p className={styles.p}>Please enter your details to sign in.</p>
                    </div>

                <SignInForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} loading={loading} handleSubmit={handleSubmit}/>
                </div>


            <div>
                <Footer/>
            </div>
            </div>

              <div className={styles.imageWrapper}>
                    <img src={imageWrapper} alt="BackgroundImage" />
                    <div className={styles.imgTopBadge}>
                        <span className={styles.topBadge}></span>
                        <h1>Autumn / Winter Edition</h1></div>
                    <div className={styles.imgBottomBadge}>
                        <h1> <Sparkle size={20}/> THE EDITORIAL STANDARD</h1>
                        <p>"Curated everyday essentials for modern living"</p>
                        </div>
                </div>
        </div>
    )
}
