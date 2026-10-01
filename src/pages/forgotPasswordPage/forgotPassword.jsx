import { useState } from "react"
import useAuth from "../../hooks/useAuth";
import AuthNavbar from "../../components/AuthNavbar/navbar";
import { Footer } from "../../components/footer/footer";
import styles from '../forgotPasswordPage/forgotPassword.module.css';
import { Link } from "react-router";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const {sendResetLink, forgotLoading, setForgotModal, forgotModal} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendResetLink({email});
        setEmail('');
    }
    return(
        <div className={styles.appWrapper}>
            <AuthNavbar backTo="/signin" backToLabel={"Login"}/>

            <div className={styles.main}>
                <div className={styles.header}>
                    <h1>Reset Password</h1>
                </div>

                <div className={styles.formContainer}>

                 <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <label htmlFor="email">
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={email}
                    placeholder='name@example.com' 
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <div className={styles.btnContainer}>
                    <button type="submit" disabled={forgotLoading} >{forgotLoading ? "sending" : "Send Reset Link"}</button>
                </div>
            </form>

              <div className={styles.signinContainer}>
               <p className={styles.signinText}>Remembered it? </p><Link to='/signin' className={styles.signin}>Sign In</Link>  
            </div>

            </div>
            {forgotModal && 
            <div className={styles.overlay} onClick={() => setForgotModal(false)}>
                <div className={styles.modal}>
                    <p>
                        Check your email<br/>
                   If an account exists for that email,
                   we've sent a password reset link.
                    </p> 

                    <Link to="/signin" className={styles.modalLink}>Back to Sign in</Link>
                </div>
            </div>
            }
            </div>

            <Footer/>
        </div>
    )
}

export default ForgotPassword;