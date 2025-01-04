import React from "react";
import "./TagGroup.css";

function TagGroup({ tags }) {
  const row1 = tags.slice(0, Math.ceil(tags.length / 2)); // 첫 번째 행
  const row2 = tags.slice(Math.ceil(tags.length / 2)); // 두 번째 행

  return (
    <div className="tag-group">
      {[row1, row2].map((row, rowIndex) => (
        <div key={rowIndex} className="tag-row">
          {row.map((tag, index) => (
            <div key={index} className="tag-item">
              <img src={tag.icon} alt={tag.text} className="tag-icon" />
              <span className="tag-text">{tag.text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TagGroup;