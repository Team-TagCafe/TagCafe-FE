import React from "react";
import SelectTag from "./selectTag";
import LongButton from "../components1/LongButton";
import "./TagSelection.css"; 

function TagSelection({ tagText, options, selectedOption, onOptionSelect, onReset, onClose }) {
  return (
    <>
      <div className="tag-selection__background" onClick={onClose}></div>

      <div className="tag-selection">
        <div className="tag-selection__header">
          <span className="tag-selection__title">#{tagText}</span>
          <button className="tag-selection__close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="tag-selection__content">
          {options.map((option) => (
            <SelectTag
              key={option}
              tagText={option}
              isSelected={selectedOption === option} // 단일 선택 여부 확인
              onClick={() => onOptionSelect(option)} // 단일 선택 처리
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default TagSelection;