import React, { useState, useEffect } from "react";
import SelectTag from "./selectTag";
import LongButton from "./LongButton";
import "./TagSelection.css";

function TagSelection({ 
  tagText, 
  options, 
  onClose, 
  onOptionSelect,
  selectedOption
}) { 
  const [isOpen, setIsOpen] = useState(true); 

  // 단일 선택 처리
  const handleOptionSelect = (option) => {
    const newSelectedOption = option === selectedOption ? "" : option; // 선택된 옵션 토글
    onOptionSelect(newSelectedOption); // 전달된 onOptionSelect로 부모에게 옵션 전달
  };

  // 초기화 처리
  const handleReset = () => {
    onOptionSelect(null); // Reset the option in the parent as well
  };

  const handleClose = () => {
    setIsOpen(false); // 컴포넌트를 닫음
    onClose(); // Close the popup in the parent
  };

  if (!isOpen) return null; 

  return (
    <>
      <div className="tag-selection__background" onClick={handleClose}></div>

      <div className="tag-selection">
        <div className="tag-selection__header">
          <span className="tag-selection__title">#{tagText}</span>
          <button className="tag-selection__close-button" onClick={handleClose}>
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
          <LongButton optionText="저장" onClick={handleClose}/>
        </div>
      </div>
    </>
  );
}

export default TagSelection;