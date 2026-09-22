import { Link } from "react-router"
import styles from '../AuthNavbar/navbar.module.css'
export default function AuthNavbar({backTo, backToLabel}){
    return(
        <div className={styles.navContainer}>
            <nav>
            <h1 className={styles.appname}>ShopEase</h1>
            <Link to={backTo} className={styles.backLabel}>{backToLabel}</Link>
        </nav>
        </div>
    )
}