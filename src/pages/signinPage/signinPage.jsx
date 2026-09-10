import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
export default function SignInPage(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setUser} = useAuth();

    const handleSubmit = async(e) => {
        try{
            setLoading(true);
        e.preventDefault();

        const payload = {email, password}
        const response = await fetch('http://localhost:5000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(payload),
            credentials: 'include',
        })

        if(!response.ok){
            const data = await response.json();
            setError(data.message);
            return;
        }

        const data = await response.json();
        setUser(data.data);
        setData(data.message);
        setError(null);

        navigate('/', {replace: true});
        }catch(err){
            setError(err.message);
            setUser(null); 
        }finally{
            setLoading(false);
        }
    }

    return(
         <div>
            <form onSubmit={(e) => handleSubmit(e)}>
            <p>{data}</p>
            <p>{error}</p>

                <label htmlFor="email">
                    Email
                    <input type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label htmlFor="password">
                    Password
                    <input type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </label>

                <button type="submit">{loading ? "Signing In": "Sign In"}</button>
            </form>
        </div>
    )
}
