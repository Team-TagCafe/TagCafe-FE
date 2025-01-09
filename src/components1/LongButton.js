import React, { useState } from "react";
import "./LongButton.css"; // LongButton용 CSS 파일을 import

// props로 optionText(버튼 텍스트)와 onClick(클릭 시 동작할 함수) 전달받음
function LongButton({ optionText, onClick }) {
  const [isPressed, setIsPressed] = useState(false);

  // 버튼 눌렀을 때 상태 변경
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  // 동적 클래스 설정
  const buttonClassName = isPressed
    ? "long-button pressed" // 눌렸을 때 추가 스타일을 적용할 pressed 클래스 포함
    : "long-button"; // 기본 상태 클래스

  return (
    <div className="long-button-container">
      <button
        className={buttonClassName} // 동적 클래스 이름 적용
        onMouseDown={handleMouseDown} // 마우스를 누를 때 호출
        onMouseUp={handleMouseUp} // 마우스를 뗄 때 호출
        onClick={onClick} // 클릭 시 부모 컴포넌트에서 전달된 onClick 함수 호출
      >
        {/* 버튼 내 텍스트 요소: props로 전달된 optionText 표시 */}
        <span className="long-button-text">{optionText}</span>
      </button>
    </div>
  );
}

export default LongButton;
