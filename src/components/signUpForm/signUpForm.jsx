import styles from '../signUpForm/signUpForm.module.css'
import { Link } from 'react-router'
export default function SignUpForm({data, error, handleSubmit, password, email, name, setName, setEmail, setPassword, loading}){
    return(
             <div className={styles.formContainer}>
            <p>{data}</p>
            <p>{error}</p>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.labelContainer}>
                     <label htmlFor="name">
                    Full name
                    <input type="text"
                    id="name"
                    value={name}
                    placeholder='Jane Doe'
                    onChange={(e) => setName(e.target.value)} />
                </label>

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
                    placeholder='Min. 8 characters'
                    onChange={(e) => setPassword(e.target.value)} />
                </label>

                <div>
                    <button type="submit" className={styles.createbtn}>{loading ? "Creating Account": "Create Account"}</button>
                </div>
                </div>
            </form>

            <div className={styles.signinDiv}>
               <p className={styles.signinText}>Already have an account? </p><Link to='/signin' className={styles.signin}>Sign in</Link>
            </div>
        </div>
    )
}