import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token); 
            alert('Login successful! Redirecting to your posts...');
            navigate('/posts'); 
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + error.response.data); 
        }
    };

    return (
        
        <div className="container" >
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
               
            </form>
            <Link to='/register'>don't have account click to register</Link>
        </div>
    );
};

export default Login;
