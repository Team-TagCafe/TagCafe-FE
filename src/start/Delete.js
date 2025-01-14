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

  const handleConfirm = () => {
    setIsPopupOpen(false);
    navigate("/login")
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  }

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