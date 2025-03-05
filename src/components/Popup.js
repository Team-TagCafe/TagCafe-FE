import React from "react";
import ReactDOM from "react-dom";
import LongButton from "./LongButton";
import "./Popup.css";

function Popup({ message, onConfirm, onCancel, showCancel = true }) {
  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="popup-container">
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          {showCancel && <LongButton optionText="취소" onClick={onCancel} />}
          <LongButton optionText="확인" onClick={onConfirm} />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Popup;