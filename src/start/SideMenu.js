import React from "react";
import "./SideMenu.css";
import SideMenuButton from "../components/SideMenuButton"

const SideMenu = ({ onClose }) => {
  return (
    <>
      {/* 오버레이 클릭 시 메뉴 닫기 */}
      <div className="overlay" onClick={onClose}></div>

      {/* 사이드 메뉴 */}
      <div className="side-menu">
        <div className="side-menu-header">
          {/* 프로필 정보 */}
          <div className="profile-picture">
            <img src="/img/user.png" alt="Profile" />
          </div>
          <div className="profile-info">
            <div className="profile-name">태카</div>
            <div className="profile-edit">닉네임 변경하기</div>
          </div>
        </div>
        <div className="side-menu-body">
          <SideMenuButton buttonType="button1" optionText="개인정보처리방침" />
          <SideMenuButton buttonType="button1" optionText="서비스 이용약관" />
          <SideMenuButton buttonType="button1" optionText="위치서비스 약관" />
          <SideMenuButton buttonType="button1" optionText="FAQ" />
          <SideMenuButton buttonType="button2" optionText="로그아웃" />
          <SideMenuButton buttonType="button2" optionText="회원탈퇴" />
          <SideMenuButton buttonType="button2" optionText="관리자페이지" />
        </div>
      </div>
    </>
  );
};

export default SideMenu;