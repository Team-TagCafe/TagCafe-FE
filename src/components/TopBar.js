import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // 페이지 전환을 위한 useNavigate 훅
import "./TopBar.css";
import Tag from './Tag'
// import SideMenu from "../start/SideMenu"; // 로그인 시
// import SideMenu_un from "../start/SideMenu_un"; // 비로그인 시

const TopBar = ({
    title = "# TagCafe",
    subtitle = "",
    showSearch = false,
    showTags = false,
    showHamburger = true,
    showClose = false,
    isLoggedIn = true,
    onSearchPlaceChange
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate(); // useNavigate 훅 사용

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
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
    
    useEffect(() => {
        const topBarHeight = showSearch && showTags ? "185px" : "141px";
        
        // body padding-top 설정
        document.body.style.paddingTop = topBarHeight;
    
        // .top-bar height 동적으로 설정
        const topBarElement = document.querySelector('.top-bar');
        if (topBarElement) {
            topBarElement.style.height = topBarHeight;
        }
    
        return () => {
            document.body.style.paddingTop = "0"; // 초기화
            if (topBarElement) {
                topBarElement.style.height = "0"; // 초기화
            }
        };
    }, [showSearch, showTags]);
    

    return (
        <>
            {/* TopBar */}
            <div className="top-bar">
                {/* 제목 */}
                <div className="title">{title}</div>

                {/* 부제목 */}
                {subtitle && <div className="subtitle">{subtitle}</div>}

                {/* 검색창 */}
                {showSearch && (
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

                {/* 태그 선택 */}
                {showTags && (
                    <div className="tag-select-group">
                        <Tag tagText="방문여부"/>
                        <Tag tagText="운영시간"/>
                        <Tag tagText="와이파이"/>
                        <Tag tagText="콘센트"/>
                        <Tag tagText="책상"/>
                        <Tag tagText="화장실"/>
                        <Tag tagText="주차"/>
                        <Tag tagText="평점"/>
                    </div>
                )}

                {/* 햄버거 메뉴 버튼 */}
                {showHamburger && (
                    <button className="hamburger-button" onClick={toggleMenu}>
                        <img className="hamburger-menu" src="../img/hamburger_menu.png" alt="Menu" />
                    </button>
                )}

                {/* 닫기 버튼 */}
                {showClose && (
                    <button className="close-button" onClick={() => window.history.back()}>
                        ×
                    </button>
                )}
            </div>

            {/* 사이드 메뉴 */}
            {isMenuOpen && (
                <>
                    <div className="topbar-overlay" onClick={closeMenu}></div>
                    {/* {isLoggedIn ? <SideMenu closeMenu={closeMenu} /> : <SideMenu_un closeMenu={closeMenu} />} */}
                </>
            )}
        </>
    );
};

export default TopBar;