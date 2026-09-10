import { useState } from "react";
import { useNavigate } from "react-router";

export default function SignUpPage(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try{
            setLoading(true);
        e.preventDefault();
        const payload = {email, password, name};

        const response = await fetch('http://localhost:5000/signup',{
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        if(!response.ok){
            const data = await response.json();
            setError(data.message || "Something went wrong");
            return;
        }

        const data = await response.json();
        setError(null);
        setData(data);

        navigate('/signin', {replace: true});
    }catch(err){
        setError(err.message);
    }finally{
        setLoading(false);
    }
    }

    return(
        <div>
            <p>{data}</p>
            <p>{error}</p>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">
                    FullName
                    <input type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                </label>

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

                <button type="submit">{loading ? "Signing Up": "Sign up"}</button>
            </form>
        </div>
    )
}