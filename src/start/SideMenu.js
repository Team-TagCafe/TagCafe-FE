import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SideMenu.css";
import SideMenuButton from "../components/SideMenuButton";
import Popup from "../components/Popup";

const SideMenu = ({  }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true); 
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  const handleNicknameChange = () => {
    navigate("/nickname-change");
  };

  const handleLogoutClick = () => {
    setIsLogoutPopupOpen(true);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutPopupOpen(false);
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setIsLogoutPopupOpen(false);
  };

  const handleDelete = () => {
    navigate("/delete")
  }

  const handlePrivacyPolicy = () => {
    navigate("/privacy-policy"); 
  };

  const handleServicePolicy = () => {
    navigate("/service-policy"); 
  };

  const handleLocationPolicy = () => {
    navigate("/location-policy"); 
  };



  const handleOverlayClick = (event) => {
    // 클릭한 대상이 오버레이 자신인지 확인
    if (event.target === event.currentTarget) {
      setIsMenuOpen(false); // 메뉴 닫기
    }
  };


  // 사이드 메뉴가 닫힌 경우 null 반환
  if (!isMenuOpen) {
    return null;
  }

  return (
    <>
      {/* 오버레이 클릭 시 메뉴 닫기 */}
      <div className="overlay" onClick={handleOverlayClick}>
        {/* 사이드 메뉴 */}
        <div className="side-menu">
          <div className="side-menu-header">
            {/* 프로필 정보 */}
            <div className="profile-picture">
              <img src="/img/user.png" alt="Profile" />
            </div>
            <div className="profile-info">
              <div className="profile-name">태카</div>
              <div className="profile-edit" onClick={handleNicknameChange}>
                닉네임 변경하기
              </div>
            </div>
          </div>
          <div className="side-menu-body">
            <SideMenuButton buttonType="button1" optionText="개인정보처리방침" onClick={handlePrivacyPolicy} />
            <SideMenuButton buttonType="button1" optionText="서비스 이용약관" onClick={handleServicePolicy}/>
            <SideMenuButton buttonType="button1" optionText="위치서비스 약관" onClick={handleLocationPolicy}/>
            <SideMenuButton buttonType="button1" optionText="FAQ" />
            <SideMenuButton buttonType="button2"optionText="로그아웃" onClick={handleLogoutClick}/>
            <SideMenuButton buttonType="button2" optionText="회원탈퇴" onClick={handleDelete}/>
            <SideMenuButton buttonType="button2" optionText="관리자페이지" />
          </div>
        </div>
      </div>

      {isLogoutPopupOpen && (
        <Popup
          message="로그아웃 하시겠습니까?"
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />
      )}
    </>
  );
};

export default SideMenu;