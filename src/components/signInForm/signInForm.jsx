import styles from '../signInForm/signInForm.module.css'
import { Link } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
export default function SignInForm({handleSubmit, password, email, setEmail, setPassword, loading}){
    const [showPassword, setShowPassword] = useState(false);
    return(
             <div className={styles.formContainer}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.labelContainer}>

                <label htmlFor="email">
                    Email
                    <input type="email"
                    id="email"
                    value={email}
                    placeholder='name@example.com'
                    onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label htmlFor="password">
                    Password
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
                <Link className={styles.forgotPassword} to="/forgotpassword">Forgot password?</Link>

                <div>
                    <button type="submit" className={styles.signinbtn} disabled={loading}>{loading ? "Signing In": "Sign In"}</button>
                </div>
                </div>
            </form>

            <div className={styles.signUpDiv}>
               <p className={styles.signUpText}>Don't have an account? </p><Link to='/signup' className={styles.signUp}>Sign Up</Link>
            </div>
        </div>
    )
}