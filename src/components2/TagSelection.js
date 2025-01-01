import React from "react";
import SelectTag from "./selectTag";
import "./TagSelection.css"; 

function Popup({ tagText, options, selectedOptions=[], onOptionToggle, onReset, onClose }) {
  return (
    <>
    <div className="blur-background" onClick={onClose}></div>

    <div className="popup">
      <div className="popup-header">
        <span className="popup-title">#{tagText}</span>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="popup-content">
        {options.map((option) => (
          <SelectTag
            key={option}
            tagText={option}
            isSelected={selectedOptions.includes(option)}
            onToggle={() => onOptionToggle(option)}
          />
        ))}
      </div>
      <div className="popup-footer"> 
        <button className="footer-button" onClick={onReset}>
          초기화
        </button>
        <button className="footer-button" onClick={onClose}>
          저장
        </button>
      </div>
    </div>
    </>
  );
}

export default Popup;