import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import { CreateUserAPI } from '../apis';

const Register = () => {
    const isAuthenticated = Boolean(localStorage.getItem('user'));
    const [data, SetData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password !== data.confirmpassword) {
            console.log(data);
            alert("Passwords do not match");
            return;
        }
        try {
            delete data.confirmpassword;
            await CreateUserAPI(data)
            alert("User Creation Success");
            navigate('/login');
        } catch (e) {
            alert("Something Went Wrong!")
            console.log("Error: ", e);
        }
        // Add registration logic her
    };
      if(isAuthenticated){
        return <Navigate to="/profile"/>
      }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card p-4">
                            <h2 className="text-center mb-4">Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Enter Your Full Name'
                                        name={"name"}
                                        value={data.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone:</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder='Enter Your Phone Number'
                                        name={"phone"}
                                        value={data.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder='Enter Your Email'
                                        name={"email"}
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder='Enter your Password'
                                        name={"password"}
                                        value={data.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder='Enter your Password'
                                        name={"confirmpassword"}
                                        value={data.confirmpassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-success w-100 mb-3">Register</button>
                            </form>
                            <div className="text-center">
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-decoration-none">
                                        Login here
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

export default Register;
