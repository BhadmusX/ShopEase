import styles from '../signInForm/signInForm.module.css'
import { Link } from 'react-router'
export default function SignInForm({data, error, handleSubmit, password, email, setEmail, setPassword, loading}){
    return(
             <div className={styles.formContainer}>
            <p>{data}</p>
            <p>{error}</p>

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
                    <input type="password"
                    id="password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)} />
                </label>

                <div>
                    <button type="submit" className={styles.signinbtn}>{loading ? "Signing In": "Sign In"}</button>
                </div>
                </div>
            </form>

            <div className={styles.signUpDiv}>
               <p className={styles.signUpText}>Don't have an account? </p><Link to='/signup' className={styles.signUp}>Sign Up</Link>
            </div>
        </div>
    )
}