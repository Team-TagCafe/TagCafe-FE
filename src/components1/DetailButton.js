import React, { useState } from "react";
import "./DetailButton.css"; // CSS 파일을 import

function DetailButton({ optionText, onClick }) {
    const [isPressed, setIsPressed] = useState(false); // 버튼 눌렸는지 확인하는 상태

    // 버튼 눌렀을 때 상태 변경
    const handleMouseDown = () => {
        setIsPressed(true);
    };
    const handleMouseUp = () => {
        setIsPressed(false);
    };

    return (
        <div
            className={`detail-button-container ${isPressed ? "pressed" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <button
                className="detail-button"
                onClick={onClick}
            >
                <span className="detail-button-text">{optionText}</span>
            </button>
        </div>
    );
}

export default DetailButton;