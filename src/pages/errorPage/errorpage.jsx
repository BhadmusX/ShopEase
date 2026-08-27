import { Link } from "react-router";
import styles from '../errorPage/errorPage.module.css';
export function ErrorPage(){
    return(
    <div className={styles.container}>
        <h1 className={styles.header}>Looks like you're lost.</h1>
        <Link to="/" className={styles.link}>Head back home</Link>
    </div>
    )
}