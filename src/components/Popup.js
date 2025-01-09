import React from "react";
import LongButton from "./LongButton";
import "./Popup.css";

function Popup({ message, onConfirm, onCancel }) {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          <LongButton optionText="취소" onClick={onCancel} />
          <LongButton optionText="확인" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}

export default Popup;