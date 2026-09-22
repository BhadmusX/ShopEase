import { Package, DollarSign, Users2, CreditCard} from "lucide-react"
import useFetchAnalytics from "../../../hooks/useFetchAnalytics";
import styles from '../analyticsCard/analyticsCard.module.css'
import { useEffect } from "react";
const AnalyticsCard = () => {
    const {fetchAnalytics, totalProducts, totalSale, totalRev, totalUsers, loading} = useFetchAnalytics();
    const formattedRevenue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact'
    }).format(Number(totalRev) || 0);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    return(
        <>
        {loading ? <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div> : <div>
            <div className={styles.analysisCardContainer}>
                <div className={styles.analysisCard}>
                    <span className={styles.analysisCardIcon}>
                        <Package size={20} color="#005236"/> 
                    </span>  

                    <div className={styles.analysisCardText}>
                        <h1>{totalProducts}</h1> 
                        <p>Products</p>
                    </div>
                </div>

                <div className={styles.analysisCard}>
                    <span className={styles.analysisCardIcon}>
                         <DollarSign size={20} color="#005236"/> 
                    </span>
                    <div className={styles.analysisCardText}>
                        <h1>{formattedRevenue}</h1>
                        <p>Revenue</p>
                    </div>
                </div>

                <div className={styles.analysisCard}>
                    <span className={styles.analysisCardIcon}>
                        <Users2 size={20} color="#005236"/> 
                    </span>    
                    <div className={styles.analysisCardText}>
                        <h1>{totalUsers}</h1>    
                        <p>Users</p>
                    </div>
                </div>

                <div className={styles.analysisCard}>
                    <span className={styles.analysisCardIcon}>
                        <CreditCard size={20} color="#005236"/> 
                    </span>

                    <div className={styles.analysisCardText}>
                        <h1>{totalSale}</h1>     
                        <p>Total sales</p>
                    </div>
                </div>
            </div>
            </div>}
        </>
    )
}

export default AnalyticsCard;