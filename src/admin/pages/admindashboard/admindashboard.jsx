import { Link } from "react-router";
import { Navbar } from "../../../components/navbar/navbar";
import { Footer } from "../../../components/footer/footer";
import styles from '../admindashboard/admindashboard.module.css'
import useAuth from "../../../hooks/useAuth";
import { ChartColumn, Package, DollarSign, Plus} from "lucide-react";
const AdminDashboard = () => {
    const { user } = useAuth();

    return(
        <div className={styles.appWrapper}>
            <Navbar/>
            <div className={styles.main}>
                <div>
                    <h1 className={styles.heroText}>Welcome Back {user.name}</h1>
                <div className={styles.heroBtnContainer}>
                    <Link className={styles.heroLink}><ChartColumn size={20}/>Analytics</Link> 
                    <Link className={styles.heroLink}><Package size={20}/>Products</Link> 
                    <Link className={styles.heroLink}><Plus size={20}/>Add product</Link> 
                </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default AdminDashboard;