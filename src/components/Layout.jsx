import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navigation from './Navigation';

const Footer = () => (
    <footer>
        <p>&copy; {new Date().getFullYear()} MyDGCards. All rights reserved.</p>
    </footer>
);

const Layout = (props) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <header>
                <Navigation />
            </header>
            <main style={{ flex: 1}}>
                {props.children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;