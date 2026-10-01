import { useEffect, useState } from "react";
import AuthContext from "./AuthContext.jsx";
import fetchWithAuth from "../api/fetchwithAuth.js";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
export default function AuthProvider ({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [forgotLoading, setForgotLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [forgotModal, setForgotModal] = useState(false);

    useEffect(() => {
        const getMe = async() => {
            try{
                setLoading(true);
                const response = await fetchWithAuth(`${API_URL}/getme`, {credentials: 'include'});

                if(!response.ok){
                    const data = await response.json();
                    setError(data.message);
                    setUser(null);
                    return;
                }

                const data = await response.json();
                setUser(data);
            }catch(err){
                setError(err.message);
                setUser(null);
            }finally{
                setLoading(false);
            }
        }

        getMe();
    }, []);

    const logOut = async() => {
        await fetch(`${API_URL}/signout`, {method: "POST", credentials: 'include'});
        setUser(null);
    }

     useEffect(() => {
        function handleSessionExpired() {
            logOut();
        }

        window.addEventListener('auth:session-expired', handleSessionExpired);

        return () => {
            window.removeEventListener('auth:session-expired', handleSessionExpired);
        };
    }, []);

    const sendResetLink = async ({email}) => {
        try{
            setForgotLoading(true);
            const newBody = JSON.stringify({email});
            const response = await fetch(`${API_URL}/forgotpassword` ,{method: 'POST', body: newBody, headers: {"Content-type": "application/json"}, credentials: "include"});
            toast.success(response.message);
            setForgotModal(true);
        }catch(err){
            toast.error(err.message);
        }
        finally{
            setForgotLoading(false)
        }
    }

    const resetPassword = async ({token, newPassword}) => {
        try{
            setResetLoading(true);
            const newBody = JSON.stringify({token:token, newPassword: newPassword})
            const response = await fetch(`${API_URL}/resetpassword`, {method: 'POST',  headers: {'Content-Type': "application/json"}, body: newBody, credentials: "include"});
            toast.success(response.message);
        }catch(err){
            toast.error(err.message);
        }finally{
            setResetLoading(false)
        }
    }

    return(
        <AuthContext value={{user, loading, error, setUser, logOut, forgotLoading, sendResetLink, resetLoading, resetPassword, setForgotModal, forgotModal}}>
            {children}
        </AuthContext>
    )
}