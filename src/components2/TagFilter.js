import React, { useState } from "react";
import "./TagFilter.css";

function TagFilter({ onClose }) {
  const [selectedTags, setSelectedTags] = useState({});

  const tagGroups = [
    { title: "운영시간", options: ["영업중", "24시간"] },
    { title: "와이파이", options: ["빠름", "보통", "없음"] },
    { title: "콘센트", options: ["자리에마다", "일부", "없음"] },
    { title: "책상", options: ["넓음", "적당함", "좁음"] },
    { title: "화장실", options: ["있음", "없음"] },
  ];

  const handleTagClick = (group, option) => {
    setSelectedTags((prev) => ({
      ...prev,
      [group]: prev[group] === option ? null : option, // 선택/해제
    }));
  };

  const handleReset = () => {
    setSelectedTags({});
  };

  return (
    <>
      <div className="blur-background" onClick={onClose}></div>
      <div className="tag-filter">
        <div className="tag-filter-header">
          <span className="tag-filter-title">태그 선택</span>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="tag-filter-content">
          {tagGroups.map((group) => (
            <div key={group.title} className="tag-group">
              <h4>#{group.title}</h4>
              <div className="tag-options">
                {group.options.map((option) => (
                  <button
                    key={option}
                    className={`tag-button ${
                      selectedTags[group.title] === option ? "selected" : ""
                    }`}
                    onClick={() => handleTagClick(group.title, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="tag-filter-footer">
          <button className="footer-button" onClick={handleReset}>
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

export default TagFilter;