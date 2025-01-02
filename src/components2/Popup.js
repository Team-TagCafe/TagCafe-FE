import React from "react";
import "./Popup.css";

function Popup({ message, onConfirm, onCancel }) {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          <button className="popup-button cancel" onClick={onCancel}>
            취소
          </button>
          <button className="popup-button confirm" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;