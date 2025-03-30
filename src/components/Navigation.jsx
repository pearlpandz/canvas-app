import React from 'react';
import './Navigation.css'; // Optional: Add styles here or in a separate CSS file
import { Link } from 'react-router';

const Navigation = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="logo">
                <a href="/" >
                    MyDGCards
                </a>
                </div>
                <div className="nav-links">
                    <ul>
                        <li>
                            <Link to="/profile" className="profile-link">
                                Profile Page
                            </Link>    
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-right">
                <img
                    src="https://picsum.photos/200/300"
                    alt="Profile"
                    className="profile-pic"
                />
                <span className="username">John Doe</span>
            </div>
        </nav>
    );
};

export default Navigation;