import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hamburger.css";
import TextInput from "../components/TextInput"; 
import LongButton from "../components/LongButton"; 
import Popup from "../components/Popup";

function NicknameChangePage() {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [nickname, setNickname] = useState(""); 
  const [newNickname, setNewNickname] = useState(""); 

  useEffect(() => {
    const savedNickname = sessionStorage.getItem("nickname") || "태카"; 
    setNickname(savedNickname);
    setNewNickname(savedNickname);
  }, []);

  const handleInputChange = (event) => {
    setNewNickname(event.target.value);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const handleConfirm = () => {
    if (newNickname.length < 2 || newNickname.length > 15) {
      alert("닉네임은 2~15자 이내로 입력해주세요.");
      return;
    }

    sessionStorage.setItem("nickname", newNickname);
    setNickname(newNickname);
    setNewNickname(newNickname);

    console.log("💾 세션 스토리지에 저장된 닉네임 확인:", sessionStorage.getItem("nickname"));

    setIsPopupOpen(false);
    navigate(-1);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="hamburger-page">
      <button className="close-button" onClick={handleBack}>×</button>

      <div className="hamburger-header">
        <h1 className="hamburger-title">
          TagCafe
          <span className="hamburger-icon">
            <img src="/img/coffee.png" alt="coffee icon" />
          </span>
        </h1>
        <p className="hamburger-subtitle">닉네임 변경하기</p>
        <p className="hamburger-description">2~15자 이내로 입력 가능합니다</p>
      </div>

      <div className="text-input-container">
        <TextInput
          placeholder="닉네임을 입력하세요"
          value={newNickname}
          onChange={handleInputChange}
        />
      </div>

      <div className="confirm-button-container">
        <LongButton optionText="확인" onClick={openPopup} />
      </div>

      {isPopupOpen && (
        <Popup
          message="닉네임 변경을 완료하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default NicknameChangePage;