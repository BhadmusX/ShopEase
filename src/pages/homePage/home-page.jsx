import { Link } from "react-router";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import styles from '../homePage/homePage.module.css';
import { Truck, BadgeCheck, PackageCheck } from "lucide-react";
import logo from '../../assert/shopImage.jpg'
export default function Homepage (){
    return (
        <div className={styles.appWrapper}>
            <Navbar/>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.hero}>
                        <div className={styles.heroTopContainer}>
                        <h1 className={styles.heroHeader}>Modern Essentials for Your Everyday</h1>
                    <p className={styles.heroText}>Discover our curated collection of high-quality products designed to elevate your lifestyle. Clean lines, premium materials, and unparalleled craftsmanship.</p>

                    <div><Link to="/shop" className={styles.heroBtn}>Shop Now</Link></div>
                    </div>
                     <div className={styles.heroImg}><img className={styles.img} src={logo} alt="Shop image" /></div>
                     </div>

                     <div className={styles.whyShop}>
                        <h1 className={styles.whyShopHeader}>Why Shop With Us</h1>

                        <div className={styles.cardContainer}>
                            <div className={styles.card}>
                                <div className={styles.icon}><Truck size={30} style={{color: "#005236"}}/></div> 
                                <h1 className={styles.cardHeader}>Fast Shipping</h1>
                                <p className={styles.cardText}>Reliable delivery to your door within 2 business days, guaranteed.</p>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.icon}><BadgeCheck size={30} style={{color: "#005236"}}/></div>
                                <h1 className={styles.cardHeader}>Quality Products</h1>
                                <p className={styles.cardText}>Every items is handpicked for excellence and built to last.</p>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.icon} ><PackageCheck size={30} style={{color: "#005236"}}/></div>
                                <h1 className={styles.cardHeader}>Easy Returns</h1>
                                <p className={styles.cardText}>Enjoy peace of mind with our 30-day hassle-free return policy.</p>
                            </div>
                        </div>
                     </div>
                </div>
                    </main>
            <Footer/>
        </div>
    )
}