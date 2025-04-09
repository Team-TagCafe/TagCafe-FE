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
    const savedNickname = localStorage.getItem("nickname") || "태카";
    setNickname(savedNickname);
    setNewNickname(savedNickname);
  }, []);

  const handleInputChange = (event) => {
    setNewNickname(event.target.value);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const handleConfirm = async () => {
    if (newNickname.length < 2 || newNickname.length > 15) {
      alert("닉네임은 2~15자 이내로 입력해주세요.");
      return;
    }

    const email = localStorage.getItem("email");
    console.log("📌 현재 이메일 값:", email);

    if (!email) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("newNickname", newNickname);

      console.log("📌 닉네임 변경 요청 데이터:", formData.toString()); // ✅ 확인용 로그 추가

      const response = await fetch("/api/users/nickname", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          newNickname: newNickname,
        }),
        credentials: "include",
        mode: "cors",
      });

      console.log("📌 서버 응답 상태 코드:", response.status); // ✅ 응답 상태 확인

      if (response.ok) {
        localStorage.setItem("nickname", newNickname);
        setNickname(newNickname);
        setNewNickname(newNickname);
        alert("닉네임이 성공적으로 변경되었습니다.");
        setIsPopupOpen(false);
        navigate(-1);
      } else {
        const errorText = await response.text();
        console.error("❌ 닉네임 변경 실패:", errorText);
        alert(`닉네임 변경 실패: ${errorText}`);
      }
    } catch (error) {
      console.error("❌ 닉네임 변경 중 오류 발생:", error);
      alert("서버 오류가 발생했습니다.");
    }
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