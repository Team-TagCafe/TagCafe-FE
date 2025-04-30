import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./SideMenu.css";
import SideMenuButton from "../components/SideMenuButton";
import Popup from "../components/Popup";

const SideMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); 
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [nickname, setNickname] = useState(
    localStorage.getItem("nickname") || "sidemenu_un"
  );  
  const [profileImage, setProfileImage] = useState("/img/user.png"); // 기본 이미지

  /* 🔹 1. 로컬 스토리지에서 사용자 정보 가져오기 */
  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (storedNickname) setNickname(storedNickname);
    if (storedProfileImage) setProfileImage(storedProfileImage);
  }, []);

  /* 🔹 2. 닉네임 변경 시 적용 */
  const handleNicknameChange = () => {
    navigate("/nickname-change");
  };

  /* 🔹 3. 로그아웃 */
  const handleLogoutClick = () => {
    setIsLogoutPopupOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("nickname");
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    localStorage.removeItem("profileImage");
    logout();
    setIsLogoutPopupOpen(false);
    navigate("/");
  };

  const handleLogoutCancel = () => {
    setIsLogoutPopupOpen(false);
  };

  /* 🔹 4. 회원 탈퇴 */
  const handleDelete = () => {
    navigate("/delete");
  };

  /* 🔹 5. 정책 관련 페이지 이동 */
  const handlePrivacyPolicy = () => navigate("/privacy-policy");
  const handleServicePolicy = () => navigate("/service-policy");
  const handleLocationPolicy = () => navigate("/location-policy");
  const handleFAQQA = () => navigate("/faq-qa");

  /* 🔹 6. 메뉴 오버레이 클릭 시 닫기 */
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) setIsMenuOpen(false);
  };

  if (!isMenuOpen) return null;

  return (
    <>
      {/* 오버레이 클릭 시 메뉴 닫기 */}
      <div className="side-menu-overlay" onClick={handleOverlayClick}>
        <div className="side-menu">
          <div className="side-menu-header">
            {/* 🔹 로그인한 사용자 프로필 */}
            <div className="profile-picture">
              <img src={profileImage} alt="Profile" />
            </div>
            <div className="profile-info">
              <div className="profile-name">{nickname}</div>
              <div className="profile-edit" onClick={handleNicknameChange}>
                닉네임 변경하기
              </div>
            </div>
          </div>

          <div className="side-menu-body">
            <SideMenuButton buttonType="button1" optionText="개인정보처리방침" onClick={handlePrivacyPolicy} />
            <SideMenuButton buttonType="button1" optionText="서비스 이용약관" onClick={handleServicePolicy} />
            <SideMenuButton buttonType="button1" optionText="위치서비스 약관" onClick={handleLocationPolicy} />
            <SideMenuButton buttonType="button1" optionText="FAQ" onClick={handleFAQQA} />
            <SideMenuButton buttonType="button2" optionText="로그아웃" onClick={handleLogoutClick} />
            <SideMenuButton buttonType="button2" optionText="회원탈퇴" onClick={handleDelete} />
          </div>
        </div>
      </div>

      {/* 로그아웃 확인 팝업 */}
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