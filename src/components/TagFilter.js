import React, { useState, useEffect } from "react";
import SelectTag from "./selectTag"; 
import LongButton from "./LongButton";
import "./TagFilter.css";

function TagFilter({
  selectedFilters = {},
  onFilterSelect,
  onClose
}) {
  const [selectedTags, setSelectedTags] = useState({});
  const [isOpen, setIsOpen] = useState(true); 

  const tagGroups = [
    { title: "운영시간", options: ["영업중", "24시간"] },
    { title: "와이파이", options: ["빠름", "보통", "없음"] },
    { title: "콘센트", options: ["자리마다", "일부", "없음"] },
    { title: "책상", options: ["넓음", "적당함", "좁음"] },
    { title: "화장실", options: ["실내", "외부"] },
    { title: "주차", options: ["가능(무료)", "가능(유료)", "가능(일부)", "불가능"] },
    { title: "평점", options: ["5.0", "4.0 이상", "3.0 이상"] },
  ];

  // 초기 selectedFilters 값으로 selectedTags 설정
  useEffect(() => {
    setSelectedTags(selectedFilters);
    console.log('Initial selectedFilters applied:', selectedFilters);
  }, [selectedFilters]);

  useEffect(() => {
    console.log('TagFilter mounted');
    console.log('Initial selectedFilters:', selectedFilters);
  }, []);

  useEffect(() => {
    console.log('Updated selectedTags:', selectedTags);
  }, [selectedTags]);

  const handleTagClick = (group, option) => {
    console.log('Tag clicked:', group, option);
    setSelectedTags((prev) => ({
      ...prev,
      [group]: prev[group] === option ? "" : option, // 선택된 옵션을 토글
    }));
    if (onFilterSelect) {
      console.log('Calling onFilterSelect with:', group, option);
      onFilterSelect(group, option);
    }
  };

  const handleReset = () => {
    console.log('Resetting tags');
    setSelectedTags({}); // 로컬 상태 초기화
    if (onFilterSelect) {
      // 부모 컴포넌트의 selectedFilters도 초기화
      console.log('Resetting selectedFilters in parent component');
      Object.keys(selectedTags).forEach((group) => onFilterSelect(group, null));
    }
    onClose();
  };

  const handleClose = () => {
    setIsOpen(false); // 컴포넌트를 닫음
    onClose(); // 부모에게도 닫기 알림을 보냄
  };

  if (!isOpen) return null; 

  return (
    <>
      <div className="blur-background" onClick={handleClose}></div>
      <div className="tag-filter">
        <div className="tag-filter-header">
          <span className="tag-filter-title">태그 선택</span>
          <button className="tag-filter-close-button" onClick={handleClose}>
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
          <LongButton optionText="초기화" onClick={handleReset}/> {/* 초기화 버튼 */}
          <LongButton optionText="저장" onClick={handleClose}/> {/* 저장 버튼 */}
        </div>
      </div>
    </>
  );
}

export default TagFilter;