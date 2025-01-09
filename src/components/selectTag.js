import React from "react";
import "./selectTag.css";

function SelectTag({ tagText = "tag", isSelected, onClick }) {
  // 동적 클래스 설정
  const buttonClassName = isSelected ? "select-tag selected" : "select-tag";

  return (
    <div className="select-tag-container">
      <button className={buttonClassName} onClick={onClick}>
        {tagText}
      </button>
    </div>
  );
}

export default SelectTag;