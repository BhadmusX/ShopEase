import { Link } from "react-router"
import styles from '../AuthNavbar/navbar.module.css'
export default function AuthNavbar({backTo, backToLabel, backToIcon}){
    return(
        <div className={styles.navContainer}>
            <h1 className={styles.appname}>ShopEase</h1>
            <Link to={backTo} className={styles.navLink}>{backToLabel} {backToIcon}</Link>
        </div>
    )
}