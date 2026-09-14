import { useEffect, useState } from "react";
import AuthContext from "./AuthContext.jsx";
import fetchWithAuth from "../api/fetchwithAuth.js";

export default function AuthProvider ({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMe = async() => {
            try{
                setLoading(true);
                const response = await fetchWithAuth('http://localhost:5000/getme', {credentials: 'include'});

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
        await fetch('http://localhost:5000/signout', {credentials: 'include'});
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

    return(
        <AuthContext value={{user, loading, error, setUser, logOut}}>
            {children}
        </AuthContext>
    )
}