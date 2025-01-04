import React, { useState } from "react";
import "./SideMenuButton.css"; // CSS 파일을 import

function SideMenuButton({ buttonType, optionText }) {
  const [button1Active, setButton1Active] = useState(false); // 버튼1 상태 (true: 옵션2, false: 옵션1)
  const [button2Active, setButton2Active] = useState(false); // 버튼2 상태 (true: 옵션2, false: 옵션1)
  const [isPressed, setIsPressed] = useState(false); // 버튼 눌렸는지 확인하는 상태

  // 버튼1 눌렀을 때 효과
  const handleButton1MouseDown = () => {
    setButton1Active(true); // 버튼1을 옵션2로 변경
    setIsPressed(true); // 버튼 눌렸을 때 상태 변경
  };
  const handleButton1MouseUp = () => {
    setButton1Active(false); // 버튼1을 옵션1로 변경
    setIsPressed(false); // 버튼 눌림 해제
  };

  // 버튼2 눌렀을 때 효과
  const handleButton2MouseDown = () => {
    setButton2Active(true); // 버튼2를 옵션2로 변경
    setIsPressed(true); // 버튼 눌렸을 때 상태 변경
  };
  const handleButton2MouseUp = () => {
    setButton2Active(false); // 버튼2를 옵션1로 변경
    setIsPressed(false); // 버튼 눌림 해제
  };

  return (
    <div>
      {buttonType === "button1" && (
        <div
          className={`button1 ${isPressed ? "button1-pressed" : ""} ${
            button1Active ? "button1-option2" : "button1-option1"
          }`}
        >
          <button
            onMouseDown={handleButton1MouseDown}
            onMouseUp={handleButton1MouseUp}
            className="side-menu-button"
          >
            <span
              className={`button1-text ${button1Active ? "button1-text-option2" : "button1-text-option1"}`}
            >
              {optionText}
            </span>
          </button>
        </div>
      )}

      {buttonType === "button2" && (
        <div
          className={`button2 ${isPressed ? "button2-pressed" : ""} ${
            button2Active ? "button2-option2" : "button2-option1"
          }`}
        >
          <button
            onMouseDown={handleButton2MouseDown}
            onMouseUp={handleButton2MouseUp}
            className="side-menu-button"
          >
            <span
              className={`button2-text ${button2Active ? "button2-text-option2" : "button2-text-option1"}`}
            >
              {optionText}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default SideMenuButton;
