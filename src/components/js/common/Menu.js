import React from 'react';
import {Link} from 'react-router-dom';

function Menu() {

    return (
        <nav className="nav">
            <div className="non-member-area">
                <p>비회원</p>
                <div className="menus">
                    <Link className="link" to="/">Home</Link>
                    <Link className="link" to="/signin">Sign-In</Link>
                    <Link className="link" to="/signup">Sign-Up</Link>
                </div>
            </div>
            <div className="member-area">
                <p>회원</p>
                <div className="menus">
                    <Link className="link" to="/todo">todo</Link>
                    <Link className="link" to="/todo">todo</Link>
                    <Link className="link" to="/todo">todo</Link>
                    <Link className="link" to="/todo">todo</Link>
                </div>
            </div>
        </nav>
    );
}

export default Menu;