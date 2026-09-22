import { NavLink, Outlet, useLocation } from "react-router";
import { Navbar } from "../../../components/navbar/navbar";
import { Footer } from "../../../components/footer/footer";
import styles from '../admindashboard/admindashboard.module.css'
import useAuth from "../../../hooks/useAuth";
import { ChartColumn, Package, Plus} from "lucide-react";
const AdminDashboard = () => {
    const { user } = useAuth();
    const { pathname } = useLocation();
    const productsActive = pathname.startsWith('/admin/products') && !pathname.startsWith('/admin/products/create');

    return(
        <div className={styles.appWrapper}>
            <Navbar/>
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.heroText}>Welcome Back {user.name}</h1>
                <div className={styles.heroBtnContainer}>
                    <NavLink end className={({isActive}) => isActive ? `${styles.heroLink} ${styles.active}` : styles.heroLink} to="analytics"><ChartColumn size={20}/>Analytics</NavLink>
                    <NavLink className={productsActive ? `${styles.heroLink} ${styles.active}` : styles.heroLink} to="products"><Package size={20}/>Products</NavLink>
                    <NavLink className={({isActive}) => isActive ? `${styles.heroLink} ${styles.active}` : styles.heroLink} to="products/create"><Plus size={20}/>Add product</NavLink>
                </div>
                <div className={styles.outletContainer}>
                    <Outlet/>
                </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default AdminDashboard;