import { Link } from "react-router";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import styles from '../homePage/homePage.module.css';
import { Truck, BadgeCheck, PackageCheck, Star, ShieldCheck, Lock, Repeat1} from "lucide-react";
import logo from '../../assert/shopImage.jpg';
import FeaturedProduct from "../../components/featuredProduct/featuredProduct";
export default function Homepage (){
    return (
        <div className={styles.appWrapper}>
            <Navbar/>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.hero}>

                        <div className={styles.heroTopContainer}>
                             <div className={styles.heroBadgeContainer}>
                            <span className={styles.heroBadge}></span>
                            <h1>Autumn / Winter Edition</h1></div>
                        <h1 className={styles.heroHeader}>Modern Essentials for Your Everyday</h1>
                    <p className={styles.heroText}>Discover our curated collection of high-quality products designed to elevate your lifestyle. Clean lines, premium materials, and unparalleled craftsmanship.</p>

                    <div className={styles.CTAContainer}><Link to="/shop" className={styles.heroBtn}>Shop Now</Link></div>

                    <div>

                    </div>
                    <div className={styles.reviewContainer}>
                        <div className={styles.reviewTextContainer}><Star size={15} style={{color: "#005236"}}></Star> 
                        <div>
                            <p>4.8 / 5 <span>(2,000+ Reviews)</span></p>
                        </div> 
                        </div>

                        <div className={styles.reviewTextContainer}><ShieldCheck size={15} style={{color: "#005236"}}></ShieldCheck> 
                        <div><p>Certified Sustainable</p></div></div>
                        </div>
                    </div>
                     <div className={styles.heroImg}><img className={styles.img} src={logo} alt="Shop image" /></div>
                     </div>

                     <div className={styles.badgeContainer}>
                        <div className={`${styles.badge} ${styles.review}`}>
                            <Star size={15} style={{color: "#005236"}}/>
                            <p>4.8 / 5 <span>—Over 2,000+ verified customer reviews</span></p>
                        </div>

                        <div className={`${styles.badge} ${styles.privacy}`}>
                            <Lock size={15} style={{color: "#005236"}}/>
                            <p>Secure SSL checkut & privacy Guaranteed</p>
                        </div>

                        <div className={`${styles.badge} ${styles.payment}`}>
                            <h1>PAYMENTS</h1>
                            <div>
                            <span>Visa</span>
                            <span>MasterCard</span>
                            </div>
                        </div>

                        <div className={`${styles.badge} ${styles.return}`}>
                            <Repeat1 size={15} style={{color: "#005236"}}/>
                            <p>30-day effortless returns</p>
                        </div>
                     </div>

                     <FeaturedProduct/>

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