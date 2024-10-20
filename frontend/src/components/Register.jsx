import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const navigate = useNavigate(); 

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, { username, password, email, mobile });
            alert('Registration successful! ');
            navigate('/login'); 
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed: ' + error.response.data); 
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                <input type="text" placeholder="Mobile Number" onChange={(e) => setMobile(e.target.value)} value={mobile} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
