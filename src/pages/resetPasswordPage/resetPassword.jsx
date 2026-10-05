import { useState } from "react";
import AuthNavbar from "../../components/AuthNavbar/navbar";
import { Footer } from "../../components/footer/footer";
import styles from '../resetPasswordPage/resetPassword.module.css'
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
const ResetPassword = () => {

    const {resetLoading, resetPassword} = useAuth();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {token} = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(confirmPassword != password){
            toast.error("Password do not match");
            return;
        }
        await resetPassword({token: token, newPassword: password})
        setPassword('');
        setConfirmPassword('');
    }
    return(
        <div className={styles.appWrapper}>
            <AuthNavbar backTo="/signin" backToLabel={"Login"}/>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1>Set a new Password</h1>
                    <p>Choose a new password for your account.</p>
                </div>

                <div className={styles.formContainer}>

                    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="password">
                        New Password
                        <div className={styles.passwordContainer}>
                         <input 
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}</button>
                    </div>
                    </label>

                    <label htmlFor="confirmPassword">
                        Confirm Password
                        <div className={styles.passwordContainer}>
                         <input 
                    type={showConPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder='Min.8 character'
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowConPassword(prev => !prev)}>{showConPassword ? <Eye size={20}/> : <EyeOff size={20}/>}</button>
                    </div>
                    </label>

                    <div className={styles.btnContainer}>
                        <button type="submit">{resetLoading ? "Resetting" : "Reset Password"}</button>
                    </div>
                </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default ResetPassword;