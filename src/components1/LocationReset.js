import React, { useState } from "react";
import "./LocationReset.css"; // CSS 파일을 import

function LocationReset({ onClick }) {
  const [isPressed, setIsPressed] = useState(false);

  // 버튼 눌렀을 때 상태 변경
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  // 동적으로 버튼의 클래스 이름 설정 (isPressed 상태에 따라 다르게 적용)
  const buttonClassName = isPressed
    ? "location-reset pressed" // 눌렀을 때 적용되는 클래스
    : "location-reset"; // 기본 클래스

  // 동적 이미지 경로 설정
  const imageSrc = isPressed
    ? "/img/locationReset_pressed.png" // 눌렀을 때 이미지
    : "/img/locationReset_default.png"; // 기본 이미지

  return (
    <div className="location-reset-container">
      {/* 버튼 요소: 동적 클래스 이름과 이벤트 핸들러 설정 */}
      <button
        className={buttonClassName} // 동적 클래스 이름 적용
        onMouseDown={handleMouseDown} // 마우스를 누를 때 호출
        onMouseUp={handleMouseUp} // 마우스를 뗄 때 호출
        onClick={onClick} // 버튼 클릭 시 onClick 함수 호출
      >
        {/* 버튼 내 이미지 요소: 동적 이미지 경로 및 alt 속성 설정 */}
        <img src={imageSrc} alt="Reset Location" className="location-reset-image" />
      </button>
    </div>
  );
}

export default LocationReset;
