import React from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';

function Header() {
    const navigate = useNavigate();

    return (
        <header id="header">
            <h1 className="logo">Todo Application</h1>
            <Menu />
        </header>
    );
}

export default Header;