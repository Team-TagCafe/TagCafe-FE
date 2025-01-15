import React from "react";
import ReactDOM from "react-dom";
import "./PopupWrapper.css"; // 팝업 스타일

function PopupWrapper({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default PopupWrapper;
