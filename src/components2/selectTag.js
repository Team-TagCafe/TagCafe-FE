import React, { useState } from "react";
import "./selectTag.css";

function SelectTag({ tagText = "tag" }) {
  const [isSelected, setIsSelected] = useState(false);

  // 클릭 시 상태 변경
  const toggleSelect = () => setIsSelected(!isSelected);

  // 동적 클래스 설정
  const buttonClassName = isSelected ? "select-tag selected" : "select-tag";

  return (
    <div className="select-tag-container">
      <button className={buttonClassName} onClick={toggleSelect}>
        {tagText}
      </button>
    </div>
  );
}

export default SelectTag;