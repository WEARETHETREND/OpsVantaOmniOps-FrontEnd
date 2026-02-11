import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home, Settings, Mail, DollarSign, Key, Heart } from 'lucide-react';
import './Layout.css'; // assuming you will style your components separately

const Layout = () => {
    return (
        <div className="layout">
            <nav className="navbar">
                <Link to="/today" className={({ isActive }) => isActive ? 'active' : ''}>
                    <Home /> Today
                </Link>
                <Link to="/autopilot" className={({ isActive }) => isActive ? 'active' : ''}>
                    <Settings /> Autopilot
                </Link>
                <Link to="/inbox" className={({ isActive }) => isActive ? 'active' : ''}>
                    <Mail /> Inbox
                </Link>
                <Link to="/revenue" className={({ isActive }) => isActive ? 'active' : ''}>
                    <DollarSign /> Revenue
                </Link>
                <Link to="/api-keys" className={({ isActive }) => isActive ? 'active' : ''}>
                    <Key /> API Keys
                </Link>
                <Link to="/health" className={({ isActive }) => isActive ? 'active' : ''}>
                    <Heart /> Health
                </Link>
            </nav>
            <Outlet />
        </div>
    );
};

export default Layout;