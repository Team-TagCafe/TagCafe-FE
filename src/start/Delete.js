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
      const response = await fetch(`http://localhost:8080/users/delete?email=${userEmail}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        alert("회원 탈퇴가 완료되었습니다.");
        localStorage.clear(); // ✅ 탈퇴 후 로컬스토리지 초기화
        navigate("/"); // ✅ 로그인 페이지로 이동
      } else {
        const errorMessage = await response.text();
        alert(`회원 탈퇴 실패: ${errorMessage}`);
      }
    } catch (error) {
      alert("회원 탈퇴 중 오류가 발생했습니다.");
      console.error("Error:", error);
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