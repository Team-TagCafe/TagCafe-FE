import React, { useState } from "react";
import SelectTag from "./selectTag"; 
import LongButton from "./LongButton";
import "./TagFilter.css";

function TagFilter({ onClose }) {
  const [selectedTags, setSelectedTags] = useState({});
  const [isOpen, setIsOpen] = useState(true); 

  const tagGroups = [
    { title: "운영시간", options: ["영업중", "24시간"] },
    { title: "와이파이", options: ["빠름", "보통", "없음"] },
    { title: "콘센트", options: ["자리에마다", "일부", "없음"] },
    { title: "책상", options: ["넓음", "적당함", "좁음"] },
    { title: "화장실", options: ["있음", "없음"] },
  ];

  // 특정 그룹에서 단일 옵션만 선택 가능하도록 업데이트
  const handleTagClick = (group, option) => {
    setSelectedTags((prev) => ({
      ...prev,
      [group]: prev[group] === option ? null : option, // 선택된 옵션을 토글
    }));
  };

  const handleReset = () => {
    setSelectedTags({});
  };

  const handleClose = () => {
    setIsOpen(false); // 컴포넌트를 닫음
  };

  if (!isOpen) return null; 


  return (
    <>
      <div className="blur-background" onClick={handleClose}></div>
      <div className="tag-filter">
        <div className="tag-filter-header">
          <span className="tag-filter-title">태그 선택</span>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="tag-filter-content">
          {tagGroups.map((group) => (
            <div key={group.title} className="tag-filter-group">
              <h4>#{group.title}</h4>
              <div className="tag-filter-options">
                {group.options.map((option) => (
                  <SelectTag
                    key={option}
                    tagText={option}
                    isSelected={selectedTags[group.title] === option} // 단일 선택 여부 확인
                    onClick={() => handleTagClick(group.title, option)} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="tag-filter-footer">
          <LongButton optionText="초기화" onClick={handleReset}/>
          <LongButton optionText="저장" onClick={onClose}/>
        </div>
      </div>
    </>
  );
}

export default TagFilter;