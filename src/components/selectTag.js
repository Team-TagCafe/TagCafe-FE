import React from "react";
import "./selectTag.css";

function SelectTag({ tagText = "tag", isSelected, onClick }) {
  return (
    <div className="select-tag-container">
      <button className={`select-tag ${isSelected ? "selected" : ""}`} 
      onClick={onClick}>
        {tagText}
      </button>
    </div>
  );
}

export default SelectTag;