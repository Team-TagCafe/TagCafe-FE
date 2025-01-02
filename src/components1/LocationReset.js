import React, { useState } from "react";
import "./LocationReset.css"; // CSS 파일을 import

function LocationReset({ onClick }) {
  const [isPressed, setIsPressed] = useState(false);

  // 버튼 눌렀을 때 상태 변경
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  // 동적 클래스 설정
  const buttonClassName = isPressed ? "location-reset pressed" : "location-reset";

  // 동적 이미지 경로 설정
  const imageSrc = isPressed
    ? "/img/locationReset_pressed.png" // 눌렀을 때 이미지
    : "/img/locationReset_default.png"; // 기본 이미지

  return (
    <div className="location-reset-container">
      <button
        className={buttonClassName}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={onClick}
      >
        <img src={imageSrc} alt="Reset Location" className="button-image" />
      </button>
    </div>
  );
}

export default LocationReset;
