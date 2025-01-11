import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nickname.css";
import TextInput from "../components/TextInput"; 
import LongButton from "../components/LongButton"; 

function NicknameChangePage({ onClose }) {
  const [nickname, setNickname] = useState("");

  const handleInputChange = (value) => {
    setNickname(value);
  };

  const handleConfirm = () => {
    if (nickname.length < 2 || nickname.length > 15) {
      alert("닉네임은 2~15자 이내로 입력해주세요.");
      return;
    }
    console.log(`닉네임 변경: ${nickname}`);
  };

  const navigate = useNavigate(); // React Router의 useNavigate 훅 사용

  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <div className="nickname-change-page">
      {/* 닫기 버튼 */}
      <button className="close-button" onClick={handleBack}>
        ×
      </button>

      {/* 로고 및 제목 */}
      <div className="nickname-header">
        <h1 className="nickname-title">
          TagCafe
          <span className="nickname-icon">
            <img src="/img/coffee.png" alt="coffee icon" />
          </span>
        </h1>
        <p className="nickname-subtitle">닉네임 변경하기</p>
        <p className="nickname-description">2~15자 이내로 입력 가능합니다</p>
      </div>

      {/* 입력창 컴포넌트 */}
      <div className="text-input-container">
        <TextInput
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={handleInputChange}
        />
      </div>

      {/* 확인 버튼 컴포넌트 */}
      <div className="confirm-button-container">
        <LongButton optionText="확인" onClick={handleConfirm} />
      </div>
    </div>
  );
}

export default NicknameChangePage;