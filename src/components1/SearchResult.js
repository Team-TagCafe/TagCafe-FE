import React, { useState } from "react";
import "./SearchResult.css"; // CSS 파일을 import

function SearchResult({ cafeName, address }) {
    const [isPressed, setIsPressed] = useState(false); // 클릭 상태 추적

    // 클릭 시작 (누를 때)
    const handleMouseDown = () => {
        setIsPressed(true);
    };

    // 클릭 끝 (떼었을 때)
    const handleMouseUp = () => {
        setIsPressed(false);
    };

    return (
        <div>
            <button
                className={`search-result-button ${isPressed ? "clicked" : ""}`} // 클릭 상태에 따라 클래스 추가
                onMouseDown={handleMouseDown} // 클릭 시작 시
                onMouseUp={handleMouseUp} // 클릭 끝날 때
            >
                <div className="cafe-name">{cafeName}</div>
                <div className="address">{address}</div>
            </button>
        </div>
    );
}

export default SearchResult;
