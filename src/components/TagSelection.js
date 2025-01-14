import React, { useState } from "react";
import SelectTag from "./selectTag";
import LongButton from "./LongButton";
import "./TagSelection.css";

function TagSelection({ tagText, options, onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);

  // 단일 선택 처리
  const handleOptionSelect = (option) => {
    setSelectedOption(option === selectedOption ? null : option); // 선택된 옵션 토글
  };

  // 초기화 처리
  const handleReset = () => {
    setSelectedOption(null);
  };

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
              onClick={() => handleOptionSelect(option)} // 단일 선택 처리
            />
          ))}
        </div>
        <div className="tag-selection-footer">
          <LongButton optionText="초기화" onClick={handleReset} /> {/* 초기화 버튼 */}
        </div>
      </div>
    </>
  );
}

export default TagSelection;