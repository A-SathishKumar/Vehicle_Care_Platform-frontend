import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import './UserPage.css';

import Navbar from '../../Components/Navbar/Navbar';
import ProfilePage from '../Service/Service';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        } else {
            navigate('/login');
        }
    }, [history]);
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <ProfilePage />
            <div className="vcp__footer-copyright">
                <p>@2024 Vehicle Care Platform. All rights reserved.</p>
            </div>
        </>
    )
}
export default UserPage;