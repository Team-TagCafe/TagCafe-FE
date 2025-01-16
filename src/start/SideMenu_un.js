import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SideMenu_un.css";
import SideMenuButton from "../components/SideMenuButton"

const SideMenu_un = ({  }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true); 
  const handlePrivacyPolicy = () => {
    navigate("/privacy-policy"); 
  };

  const handleServicePolicy = () => {
    navigate("/service-policy"); 
  };

  const handleLocationPolicy = () => {
    navigate("/location-policy"); 
  };

  const handleFAQQA = () => {
    navigate("/faq-qa"); 
  };



  const handleOverlayClick = (event) => {
    // 클릭한 대상이 오버레이 자신인지 확인
    if (event.target === event.currentTarget) {
      setIsMenuOpen(false); // 메뉴 닫기
    }
  };

  if (!isMenuOpen) {
    return null;
  }


  return (
    <>
      {/* 오버레이 클릭 시 메뉴 닫기 */}
      <div className="side-menu-un-overlay" onClick={handleOverlayClick}></div>

      {/* 사이드 메뉴 */}
      <div className="side-menu">
        <div className="side-menu-header">
          {/* 프로필 정보 */}
          <div className="profile-picture">
            <img src="/img/user.png" alt="Profile" />
          </div>
          <div className="profile-info">
            <div className="profile-login">로그인하기 <span className="profile-arrow">&gt;</span></div>
          </div>
        </div>
        <div className="side-menu-body">
            <SideMenuButton buttonType="button1" optionText="개인정보처리방침" onClick={handlePrivacyPolicy} />
            <SideMenuButton buttonType="button1" optionText="서비스 이용약관" onClick={handleServicePolicy}/>
            <SideMenuButton buttonType="button1" optionText="위치서비스 약관" onClick={handleLocationPolicy}/>
            <SideMenuButton buttonType="button1" optionText="FAQ" onClick={handleFAQQA}/>
        </div>
      </div>
    </>
  );
};

export default SideMenu_un;