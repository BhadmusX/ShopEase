import { Link } from "react-router";
import { Navbar } from "../../../components/navbar/navbar";
import { Footer } from "../../../components/footer/footer";
import styles from '../admindashboard/admindashboard.module.css'
import useAuth from "../../../hooks/useAuth";
import { ChartColumn, Package, DollarSign, Plus} from "lucide-react";
import { Outlet } from "react-router";
const AdminDashboard = () => {
    const { user } = useAuth();

    return(
        <div className={styles.appWrapper}>
            <Navbar/>
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.heroText}>Welcome Back {user.name}</h1>
                <div className={styles.heroBtnContainer}>
                    <Link className={styles.heroLink}><ChartColumn size={20}/>Analytics</Link> 
                    <Link className={styles.heroLink} to='products'><Package size={20}/>Products</Link> 
                    <Link className={styles.heroLink} to='products/create'><Plus size={20}/>Add product</Link> 
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