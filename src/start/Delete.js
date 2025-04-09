import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hamburger.css"
import TextInput from "../components/TextInput";
import LongButton from "../components/LongButton";
import Popup from "../components/Popup";

function Delete({ onClose }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;

  const handleInputChange = (value) => {
    setNickname(value);
  };

  const handleConfirm = async () => {
    setIsPopupOpen(false);

    const userEmail = localStorage.getItem("email"); // ✅ 로컬 스토리지에서 이메일 가져오기
    if (!userEmail) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(`/api/users/delete?email=${userEmail}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ 회원 탈퇴 성공");

        // ✅ 모든 저장 정보 삭제 (자동 로그인 방지)
        localStorage.clear();
        sessionStorage.clear();

        // ✅ 백엔드에서 받은 logoutUrl을 직접 사용
        if (data.logoutUrl) {
          console.log("🔗 카카오 로그아웃 URL:", data.logoutUrl);
          window.location.href = data.logoutUrl;
        } else {
          navigate("/");
        }
      } else {
        console.error("❌ 회원 탈퇴 실패:", data.error);
      }
    } catch (error) {
      console.error("🚨 회원 탈퇴 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="hamburger-page">
      {/* 닫기 버튼 */}
      <button className="close-button" onClick={handleBack}>
        ×
      </button>

      {/* 로고 및 제목 */}
      <div className="hamburger-header">
        <h1 className="hamburger-title">
          TagCafe
          <span className="hamburger-icon">
            <img src="/img/coffee.png" alt="coffee icon" />
          </span>
        </h1>
        <p className="hamburger-subtitle">탈퇴하기</p>
        <p className="hamburger-description">탈퇴시 모든 정보가 삭제됩니다</p>
      </div>

      {/* 확인 버튼 컴포넌트 */}
      <div className="confirm-button-container">
        <LongButton optionText="탈퇴하기" onClick={openPopup} />
      </div>

      {isPopupOpen && (
        <Popup
          message="정말 탈퇴하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Delete;