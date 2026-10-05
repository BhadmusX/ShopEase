import styles from '../signUpForm/signUpForm.module.css'
import { Link } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
export default function SignUpForm({data, error, handleSubmit, password, email, name, setName, setEmail, setPassword, loading}){
    const [showPassword, setShowPassword] = useState(false);
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

                <div>
                    <button type="submit" className={styles.createbtn} disabled={loading}>{loading ? "Creating Account": "Create Account"}</button>
                </div>
                </div>
            </form>

            <div className={styles.signinDiv}>
               <p className={styles.signinText}>Already have an account? </p><Link to='/signin' className={styles.signin}>Sign in</Link>
            </div>
        </div>
    )
}