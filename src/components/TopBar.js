import React, { useState, useEffect } from "react";
import "./TopBar.css";
import SideMenu from "../start/SideMenu"; // 로그인 시
import SideMenu_un from "../start/SideMenu_un"; // 비로그인 시

const TopBar = ({
  title = "# TagCafe",
  subtitle = "",
  showSearch = false,
  showTags = false,
  showHamburger = true,
  showClose = false,
  isLoggedIn = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // 조건에 따라 body 패딩 설정
    if (showSearch || showTags) {
      document.body.style.paddingTop = "185px";
    } else {
      document.body.style.paddingTop = "141px";
    }

    return () => {
      document.body.style.paddingTop = "0"; // 초기화
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
            <input type="text" className="search-input" placeholder="지역, 카페 이름으로 검색" />
            <button className="search-button">
              <img src="../img/search.png" alt="Search" />
            </button>
          </div>
        )}

        {/* 태그 선택 */}
        {showTags && (
          <div className="tag-selection">
            <button>운영시간</button>
            <button>와이파이</button>
            <button>콘센트</button>
            <button>책상</button>
            <button>화장실</button>
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
          <div className="overlay" onClick={closeMenu}></div>
          {isLoggedIn ? <SideMenu closeMenu={closeMenu} /> : <SideMenu_un closeMenu={closeMenu} />}
        </>
      )}
    </>
  );
};

export default TopBar;