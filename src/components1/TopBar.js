import React, { useState } from 'react';
import './TopBar.css';

const TopBar = ({ showSearchAndFilter }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className={`top-bar ${showSearchAndFilter ? 'with-filter' : 'no-filter'}`}>
                <div className="title">#TagCafe</div>
                <button className="hamburger-button" onClick={toggleMenu}>
                    <img className="hamburger-menu" src="../img/hamburger_menu.png" alt="Menu" />
                </button>
                {showSearchAndFilter && (
                    <div className="search-filter">
                        <input type="text" className="search-input" placeholder="지역, 카페 이름으로 검색" />
                        <button className="search-button">
                            <img src="../img/search.png" alt="Search" />
                        </button>
                    </div>
                )}
            </div>

            {isMenuOpen && (
                <>
                    <div className="overlay" onClick={closeMenu}></div>
                    <div className="side-menu">
                        <ul>
                            <li>Home</li>
                            <li>Saved Cafes</li>
                            <li>Settings</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                </>
            )}
        </>
    );
};

export default TopBar;
