import AnalyticsCard from "../../component/analyticsCard/analyticsCard";
import SalesChart from "../../component/salesChart/salesChart";
import styles from '../analyticsPage/analyticsPage.module.css';
const AnalyticsPage = () => {
    return(
        <div className={styles.container}>
            <div>
                <h1 className={styles.heroHeader}>Analytics</h1>
                <p className={styles.heroText}>Changes are compared with the previous period.</p>
            </div>
            <AnalyticsCard/>
            <SalesChart/>
        </div>
    )
}
export default AnalyticsPage;