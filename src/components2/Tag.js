import React, { useState } from "react";
import Popup from "./TagSelection"; 
import "./Tag.css"; 

function Tag({ tagText = "콘센트" }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // 팝업 열기/닫기
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // 옵션 선택
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsPopupOpen(false); // 팝업 닫기
  };

  // 초기화
  const handleReset = () => {
    setSelectedOption("");
    setIsPopupOpen(false); // 초기화 후 팝업 닫기
  };

  // 버튼 색상 클래스 동적 설정
  const buttonClassName = isPopupOpen
    ? "tag-button popup-open"
    : selectedOption
    ? "tag-button option-selected"
    : "tag-button";

  return (
    <div className="tag-container">
      {/* 버튼 */}
      <button className={buttonClassName} onClick={togglePopup}>
        <span>{selectedOption || tagText}</span>
        <img
          src="/img/dropdown.png"
          alt="dropdown icon"
          className="dropdown-icon"
        />
      </button>

      {/* 팝업 */}
      {isPopupOpen && (
        <Popup
          tagText={tagText}
          options={["자리에마다", "일부", "없음"]}
          selectedOption={selectedOption}
          onOptionClick={handleOptionClick}
          onReset={handleReset}
          onClose={togglePopup}
        />
      )}
    </div>
  );
}

export default Tag;