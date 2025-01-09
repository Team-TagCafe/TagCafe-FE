import React, { useState } from "react";
import "./DetailButton.css"; // CSS 파일을 import

function DetailButton({ optionText, onClick }) {
    // 버튼이 눌렸는지 여부를 상태로 관리 (초기 상태는 false)
    const [isPressed, setIsPressed] = useState(false);

    // 버튼 눌렀을 때 상태 변경
    const handleMouseDown = () => {
        setIsPressed(true);
    };
    const handleMouseUp = () => {
        setIsPressed(false);
    };

    return (
        // 버튼이 눌린 상태에 따라 동적으로 클래스 이름을 변경하여 스타일을 다르게 적용
        <div
            className={`detail-button-container ${isPressed ? "pressed" : ""}`}
            onMouseDown={handleMouseDown} // 마우스를 누를 때 호출
            onMouseUp={handleMouseUp} // 마우스를 뗄 때 호출
        >
            {/* 버튼 클릭 시 onClick 함수 호출 */}
            <button
                className="detail-button"
                onClick={onClick}
            >
                {/* 버튼 텍스트를 표시 */}
                <span className="detail-button-text">{optionText}</span>
            </button>
        </div>
    );
}

export default DetailButton;