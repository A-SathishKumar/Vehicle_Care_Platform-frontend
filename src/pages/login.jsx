import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import { loginAPI } from '../apis';

const Login = () => {
    const isAuthenticated = Boolean(localStorage.getItem('user'));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAPI({ email, password });
            alert(response.msg);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            if(response.role === 'admin'){
                localStorage.setItem('role', JSON.stringify(response.role));
                localStorage.setItem('token', JSON.stringify(response.token));
                navigate('/admin')
            }else{
                localStorage.setItem('token', JSON.stringify(response.token));
                navigate('/profile');
            }
        } catch (e) {
            console.log(e);
            alert(e.message);
        }
        // Add authentication logic here

    };
    if (isAuthenticated) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card p-4">
                            <h2 className="text-center mb-4">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                            </form>
                            <div className="text-center">
                                <p>
                                    
                                    <Link to="/forget-password" className="text-decoration-none">
                                        Forget Password?{' '}
                                    </Link>
                                </p>
                                <p>
                                    Don't have an account?{' '}
                                    <Link to="/register" className="text-decoration-none">
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="vcp__footer-copyright">
                <p>@2024 Vehicle Care Platform. All rights reserved.</p>
            </div>
        </>

    );
};

export default Login;
