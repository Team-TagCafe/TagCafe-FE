import React, { useState } from "react";
import "./LongButton.css"; 

function LongButton({ optionText, onClick }) {
  const [isPressed, setIsPressed] = useState(false);

  // 버튼 눌렀을 때 상태 변경
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  // 동적 클래스 설정
  const buttonClassName = isPressed ? "long-button pressed" : "long-button";

  return (
    <div className="long-button-container">
      <button
        className={buttonClassName}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={onClick}
      >
        <span className="long-button-text">{optionText}</span>
      </button>
    </div>
  );
}

export default LongButton;