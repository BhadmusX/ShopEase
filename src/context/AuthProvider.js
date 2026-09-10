import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider ({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMe = async() => {
            try{
                setLoading(true);
                const response = await fetch('http://localhost:5000/getme');

                if(!response.ok){
                    setError(response);
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