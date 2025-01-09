import React, { useState } from "react";
import "./ShortButton.css"; // ShortButton용 CSS 파일을 import

function ShortButton({ optionText, onClick }) {
  const [isPressed, setIsPressed] = useState(false);

  // 버튼 눌렀을 때 상태 변경
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  // 동적 클래스 설정
  const buttonClassName = isPressed ? "short-button pressed" : "short-button";

  return (
    <div className="short-button-container">
      <button
        className={buttonClassName}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={onClick}
      >
        <span className="short-button-text">{optionText}</span>
      </button>
    </div>
  );
}

export default ShortButton;
