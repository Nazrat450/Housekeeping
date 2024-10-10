import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/StorySoFar">Story So Far</Link></li>
                    <li><Link to="/characters">Characters</Link></li>
                    <li><Link to="/encounter">Battle</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;