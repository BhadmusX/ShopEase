import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router";
import { Navigate } from "react-router";
import styles from '../routes/routes.module.css'
export default function ProtectedRoute({adminOnly = false}){
    const {user, loading} = useAuth();
    if(loading){
        return <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div>

    }
    if(!user){
      return <Navigate to='/signin' replace/>  
    }

    if(adminOnly && user.role !== 'admin'){
       return  <Navigate to='/' replace/>
    }
    return(<Outlet/>)
}