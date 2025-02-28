import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./TopBar.css";
import Tag from './Tag';
import SideMenu from "../start/SideMenu";
import SideMenu_un from "../start/SideMenu_un";


const TopBar = ({
    title = "# TagCafe",
    subtitle = "",
    showSearch = false,
    showTags = false,
    showHamburger = true,
    showClose = false,
    isLoggedIn = true,
    searchValue,
    isSearchMode,
    onSearchPlaceChange,
    onSearchClick,
    onClearSearch,
    onFilterChange
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [selectedFilters, setSelectedFilters] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({
        "운영시간": "",
        "와이파이": "",
        "콘센트": "",
        "책상": "",
        "화장실": "",
        "주차": "",
        "평점": ""
    });

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleInputChange = (event) => {
        onSearchPlaceChange(event.target.value);
    };

    // 검색 필드에 포커스 시 Search 페이지로 이동
    const handleInputFocus = () => {
        navigate('/search'); // Search 페이지로 이동
    };

    const handleFilterSelect = (filterGroup, option) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = {
                ...prevFilters,
                [filterGroup]: prevFilters[filterGroup] === option ? null : option,
            };
            console.log('🔵 [필터 선택] updatedFilters:', updatedFilters);
            return updatedFilters;
        });
    };

    useEffect(() => {
        console.log("🟡 [필터 변경 감지] selectedFilters:", selectedFilters);
        if (onFilterChange) {
            onFilterChange(selectedFilters);
        }
    }, [selectedFilters, onFilterChange]);
    
      

    const handleOptionSelect = (tagText, option) => {
        setSelectedOptions((prevOptions) => {
            const updatedOptions = {
                ...prevOptions,
                [tagText]: prevOptions[tagText] === option ? "" : option,
            };
            console.log('Option selected:', updatedOptions);
            return updatedOptions;
        });
    
        // **TagFilter랑 동기화되도록 selectedFilters도 업데이트**
        setSelectedFilters((prevFilters) => {
            const updatedFilters = {
                ...prevFilters,
                [tagText]: prevFilters[tagText] === option ? null : option,
            };
            console.log('Updated selectedFilters:', updatedFilters);
            return updatedFilters;
        });
    };
    

    const handleReset = () => {
        setSelectedOptions({
            "운영시간": "",
            "와이파이": "",
            "콘센트": "",
            "책상": "",
            "화장실": "",
            "주차": "",
            "평점": ""
        });
        setSelectedFilters({});
        console.log('Resetting selections');  // Debugging line
    };

    useEffect(() => {
        // 조건별로 TopBar 높이 설정
        const topBarHeight =
            showSearch && showTags ? "185px" :
            showSearch || showTags ? "141px" :
            (!showSearch && !showTags && title && showHamburger) ? "110px" : "100px";
    

        const tagSelectGroupHeight = showSearch && showTags ? "65px" : "45px";

        // body padding-top 설정
        document.body.style.paddingTop = topBarHeight;
    
        // .top-bar height 동적으로 설정
        const topBarElement = document.querySelector('.top-bar');
        if (topBarElement) {
            topBarElement.style.height = topBarHeight;
        }


        // .tag-select-group top 동적으로 설정
        const tagSelectGroupElement = document.querySelector('.tag-select-group');
        if (tagSelectGroupElement) {
            tagSelectGroupElement.style.top = tagSelectGroupHeight;
        }

        return () => {
            // 초기화
            document.body.style.paddingTop = "0";
            if (topBarElement) {
                topBarElement.style.height = "";
            }
        };
    }, [showSearch, showTags, title, showHamburger]);


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
                            value={searchValue} // 검색어 유지
                            onChange={handleInputChange}
                            onFocus={handleInputFocus} // 포커스 시 페이지 이동
                            className="search-input"
                            placeholder="지역, 카페 이름으로 검색"
                        />
                        {isSearchMode ? (
                            <button className="search-clear-button" onClick={onClearSearch}>
                                X
                            </button>
                        ) : (
                            <button className="search-button" onClick={onSearchClick}>
                                <img src="/img/search.png" alt="Search" />
                            </button>
                        )}
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
                        />
                        <Tag
                            tagText="운영시간"
                            popupType="selection"
                            options={["영업중", "24시간"]}
                            selectedOption={selectedOptions["운영시간"]}
                            onOptionSelect={(option) => handleOptionSelect("운영시간", option)}
                            onReset={handleReset}
                        />
                        <Tag tagText="와이파이"
                            popupType="selection"
                            options={["빠름", "보통", "없음"]}
                            selectedOption={selectedOptions["와이파이"]}
                            onOptionSelect={(option) => handleOptionSelect("와이파이", option)}
                            onReset={handleReset}
                        />
                        <Tag tagText="콘센트"
                            popupType="selection"
                            options={["자리마다", "일부", "없음"]}
                            selectedOption={selectedOptions["콘센트"]}
                            onOptionSelect={(option) => handleOptionSelect("콘센트", option)}
                            onReset={handleReset}
                        />
                        <Tag tagText="책상"
                            popupType="selection"
                            options={["넓음", "적당함", "좁음"]}
                            selectedOption={selectedOptions["책상"]}
                            onOptionSelect={(option) => handleOptionSelect("책상", option)}
                            onReset={handleReset}
                        />
                        <Tag tagText="화장실"
                            popupType="selection"
                            options={["실내", "외부"]}
                            selectedOption={selectedOptions["화장실"]}
                            onOptionSelect={(option) => handleOptionSelect("화장실", option)}
                            onReset={handleReset}
                        />
                        <Tag tagText="주차"
                            popupType="selection"
                            options={["가능(무료)", "가능(유료)", "가능(일부)", "불가능"]}
                            selectedOption={selectedOptions["주차"]}
                            onOptionSelect={(option) => handleOptionSelect("주차", option)}
                            onReset={handleReset}
                        />
                        <Tag tagText="평점"
                            popupType="selection"
                            options={["5.0", "4.0 이상", "3.0 이상"]}
                            selectedOption={selectedOptions["평점"]}
                            onOptionSelect={(option) => handleOptionSelect("평점", option)}
                            onReset={handleReset}
                        />
                    </div>
                )}

                {/* 햄버거 메뉴 버튼 */}
                {showHamburger && (
                    <button className="hamburger-button" onClick={toggleMenu}>
                        <img className="hamburger-menu" src="/img/hamburger_menu.png" alt="Menu" />
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
                    {isLoggedIn ? <SideMenu closeMenu={closeMenu} /> : <SideMenu_un closeMenu={closeMenu} />}
                </>
            )}
        </>
    );
};

export default TopBar;