import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router";
import { Navigate } from "react-router";
import styles from '../routes/routes.module.css'
export default function ProtectedRoute(){
    const {user, loading} = useAuth();
    if(loading){
        return <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div>

    }
    console.log('we hit here', user)
    return(
    user ? <Outlet/> : <Navigate to='/signin' replace/>)
}