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
    const [isPopupOpen, setIsPopupOpen] = useState(false);
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

    const [activePopup, setActivePopup] = useState(null); // "tagSelection" | "tagFilter" | null
    const [selectedOption, setSelectedOption] = useState(""); // 콘센트 선택 상태
    const [selectedFilters, setSelectedFilters] = useState({}); // 태그 필터 선택 상태

    const handleOptionSelect = (option) => {
        setSelectedOption(option); // 콘센트 옵션 업데이트
        setActivePopup(null); // 팝업 닫기
    };

    const handleFilterSelect = (filterGroup, option) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterGroup]: prev[filterGroup] === option ? null : option, // 필터 선택/해제
        }));
    };

    const handleReset = () => {
        setSelectedOption(""); // 콘센트 초기화
        setSelectedFilters({}); // 필터 초기화
    };

    const handleConfirm = () => {
        alert("확인 버튼이 눌렸습니다!");
        setIsPopupOpen(false);
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
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
                        <Tag
                            iconSrc="/img/filter.png"
                            popupType="filter"
                            selectedFilters={selectedFilters}
                            onFilterSelect={handleFilterSelect}
                            onReset={handleReset}
                            isPopupOpen={activePopup === "tagFilter"}
                            togglePopup={() =>
                                setActivePopup((prev) => (prev === "tagFilter" ? null : "tagFilter"))
                            }
                        />
                        <Tag
                            tagText="운영시간"
                            popupType="selection"
                            options={["영업중", "24시간"]}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                            onReset={handleReset}
                            isPopupOpen={activePopup === "tagSelection"}
                            togglePopup={() =>
                                setActivePopup((prev) =>
                                    prev === "tagSelection" ? null : "tagSelection"
                                )
                            }
                        />
                        <Tag tagText="와이파이"
                            popupType="selection"
                            options={["빠름", "보통", "없음"]}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                            onReset={handleReset}
                            isPopupOpen={activePopup === "tagSelection"}
                            togglePopup={() =>
                                setActivePopup((prev) =>
                                    prev === "tagSelection" ? null : "tagSelection"
                                )
                            }
                        />
                        <Tag tagText="콘센트"
                            popupType="selection"
                            options={["자리마다", "일부", "없음"]}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                            onReset={handleReset}
                            isPopupOpen={activePopup === "tagSelection"}
                            togglePopup={() =>
                                setActivePopup((prev) =>
                                    prev === "tagSelection" ? null : "tagSelection"
                                )
                            }
                        />
                        <Tag tagText="책상"
                            popupType="selection"
                            options={["넓음", "적당함", "좁음"]}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                            onReset={handleReset}
                            isPopupOpen={activePopup === "tagSelection"}
                            togglePopup={() =>
                                setActivePopup((prev) =>
                                    prev === "tagSelection" ? null : "tagSelection"
                                )
                            }
                        />
                        <Tag tagText="화장실"
                            popupType="selection"
                            options={["실내", "외부"]}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                            onReset={handleReset}
                            isPopupOpen={activePopup === "tagSelection"}
                            togglePopup={() =>
                                setActivePopup((prev) =>
                                    prev === "tagSelection" ? null : "tagSelection"
                                )
                            }
                        />
                        <Tag tagText="주차"
                            popupType="selection"
                            options={["가능(무료)", "가능(유료)", "가능(일부)", "불가능"]}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                            onReset={handleReset}
                            isPopupOpen={activePopup === "tagSelection"}
                            togglePopup={() =>
                                setActivePopup((prev) =>
                                    prev === "tagSelection" ? null : "tagSelection"
                                )
                            }
                        />
                        <Tag tagText="평점"
                            popupType="selection"
                            options={["5.0", "4.0 이상", "3.0 이상"]}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                            onReset={handleReset}
                            isPopupOpen={activePopup === "tagSelection"}
                            togglePopup={() =>
                                setActivePopup((prev) =>
                                    prev === "tagSelection" ? null : "tagSelection"
                                )
                            }
                        />

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