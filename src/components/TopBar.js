import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 전환을 위한 useNavigate 훅
import './TopBar.css';

const TopBar = ({ showSearchAndFilter, onSearchPlaceChange }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate(); // useNavigate 훅 사용

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onSearchPlaceChange(event.target.value);
    };

    // 검색 필드에 포커스 시 Search 페이지로 이동
    const handleInputFocus = () => {
        navigate('/search'); // Search 페이지로 이동
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
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus} // 포커스 시 페이지 이동
                            className="search-input"
                            placeholder="지역, 카페 이름으로 검색"
                        />
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
