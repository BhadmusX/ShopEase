import styles from '../footer/footer.module.css'
export function Footer() {
    return(
        <div className={styles.container}>
            <h1 className={styles.appname}>ShopEase</h1>
            <div className={styles.footerInfo}>
                <p>Privacy Policy</p>
                <p>Terms of service</p>
                <p>Shipping Info</p>
                <p>Contact Us</p>
            </div>

            <p className={styles.footerInfo2}>&copy; 2026 ShopEase. All rights reserved.</p>
        </div>   
    )
}