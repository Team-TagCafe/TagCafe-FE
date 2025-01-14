import React, { useState, useEffect } from "react";
import "./TopBar.css";
import SideMenu from "../start/SideMenu"; // 로그인 시
import SideMenu_un from "../start/SideMenu_un"; // 비로그인 시

const TopBar = ({ showSearchAndFilter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 상태
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 여부

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 동적 body 스타일링
  useEffect(() => {
    document.body.classList.toggle("with-filter-body", showSearchAndFilter);
    document.body.classList.toggle("no-filter-body", !showSearchAndFilter);

    return () => {
      document.body.classList.remove("with-filter-body", "no-filter-body");
    };
  }, [showSearchAndFilter]);

  return (
    <>
      {/* TopBar (상단 바) */}
      <div className={`top-bar ${showSearchAndFilter ? "with-filter" : "no-filter"}`}>
        {/* 탭 타이틀 */}
        <div className="title"># TagCafe</div>
        {/* 햄버거 메뉴 버튼 */}
        <button className="hamburger-button" onClick={toggleMenu}>
          <img className="hamburger-menu" src="../img/hamburger_menu.png" alt="Menu" />
        </button>

        {/* 검색 및 필터 */}
        {showSearchAndFilter && (
          <div className="search-filter">
            <input type="text" className="search-input" placeholder="지역, 카페 이름으로 검색" />
            <button className="search-button">
              <img src="../img/search.png" alt="Search" />
            </button>
          </div>
        )}
      </div>

      {/* 사이드 메뉴 */}
      {isMenuOpen && (
        <>
          <div className="overlay" onClick={closeMenu}></div>
          {isLoggedIn ? <SideMenu closeMenu={closeMenu} /> : <SideMenu_un closeMenu={closeMenu} />}
        </>
      )}
    </>
  );
};

export default TopBar;