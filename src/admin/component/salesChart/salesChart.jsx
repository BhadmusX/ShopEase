import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import fetchFromDb from "../../../utils/fetchFromDb";
import styles from "./salesChart.module.css";

const API_URL = import.meta.env.VITE_API_URL;

const formatCurrency = (value) => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
}).format(value);

const SalesChart = () => {
    const [dailySales, setDailySales] = useState([]);

    useEffect(() => {
        const loadDailySales = async () => {
            try {
                const data = await fetchFromDb(`${API_URL}/analytics/get/dailysales`, {method: "GET"});
                setDailySales(data);
            } catch (err) {
                toast.error(err.message);
            }
        };

        loadDailySales();
    }, []);

    const maximumRevenue = Math.max(...dailySales.map((day) => day.revenue), 1);
    const totalRevenue = dailySales.reduce((total, day) => total + day.revenue, 0);

    return (
        <section className={styles.chartSection}>
            <div className={styles.chartHeader}>
                <div>
                    <h2>Daily revenue</h2>
                    <p>Revenue from the last seven days</p>
                </div>
                <strong>{formatCurrency(totalRevenue)}</strong>
            </div>
            <div className={styles.barChart}>
                {dailySales.map((day) => (
                    <div className={styles.barColumn} key={day.date}>
                        <span className={styles.barValue}>{formatCurrency(day.revenue)}</span>
                        <div className={styles.barTrack}>
                            <div
                                className={styles.bar}
                                style={{height: `${(day.revenue / maximumRevenue) * 100}%`}}
                            />
                        </div>
                        <span className={styles.barLabel}>{day.date.slice(5)}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SalesChart;