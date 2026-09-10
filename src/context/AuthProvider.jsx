import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import fetchWithAuth from "../api/fetchwithAuth";

export default function AuthProvider ({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(user);

    useEffect(() => {
        const getMe = async() => {
            try{
                setLoading(true);
                const response = await fetchWithAuth('http://localhost:5000/getme', {credentials: 'include'});

                if(!response.ok){
                    const data = await response.json();
                    setError(data.message);
                    setUser(null)
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

    return(
        <AuthContext value={{user, loading, error, setUser}}>
            {children}
        </AuthContext>
    )
}