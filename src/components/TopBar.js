import React, { useState } from 'react';
import './TopBar.css';
import SideMenu from "../start/SideMenu"; //로그인시
import SideMenu_un from "../start/SideMenu_un"; //비로그인시


const TopBar = ({ showSearchAndFilter }) => {
    // 메뉴 열기/닫기 상태 관리
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    const closeMenu = () => {
        setIsMenuOpen(false);
    };


    return (
        <>
            {/* TopBar (상단 바) */}
            <div className={`top-bar ${showSearchAndFilter ? 'with-filter' : 'no-filter'}`}>
                {/* 탭 타이틀 */}
                <div className="title">#TagCafe</div>
                {/* 햄버거 메뉴 버튼 */}
                <button className="hamburger-button" onClick={toggleMenu}>
                    <img className="hamburger-menu" src="../img/hamburger_menu.png" alt="Menu" />
                </button>

                {/* 검색 및 필터 표시 여부 확인 */}
                {showSearchAndFilter && (
                    <div className="search-filter">
                        {/* 검색 필드 */}
                        <input type="text" className="search-input" placeholder="지역, 카페 이름으로 검색" />
                        {/* 검색 버튼 */}
                        <button className="search-button">
                            <img src="../img/search.png" alt="Search" />
                        </button>
                    </div>
                )}
            </div>


            {isMenuOpen && (
                <>
                <div className="overlay" onClick={closeMenu}></div>
                {isLoggedIn ? (
                    <SideMenu closeMenu={closeMenu} />
                ) : (
                    <SideMenu_un closeMenu={closeMenu} />
                )}
                </>
            )}
        </>
    );
};

export default TopBar;
