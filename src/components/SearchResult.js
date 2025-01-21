import React, { useState } from "react";
import "./SearchResult.css";

function SearchResult({ cafeName, address, enableClickEffect = true }) {
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseDown = () => {
        if (enableClickEffect) {
            setIsPressed(true);
        }
    };

    const handleMouseUp = () => {
        if (enableClickEffect) {
            setIsPressed(false);
        }
    };

    return (
        <div>
            <button
                className={`search-result-button ${enableClickEffect ? "" : "no-click"} ${
                    enableClickEffect && isPressed ? "clicked" : ""
                }`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <div className="cafe-name">{cafeName}</div>
                <div className="address">{address}</div>
            </button>
        </div>
    );
}

export default SearchResult;
