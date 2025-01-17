import React, { useState } from "react";
import TagSelection from "./TagSelection";
import TagFilter from "./TagFilter";
import PopupWrapper from "./PopupWrapper";
import "./Tag.css";

function Tag({
  tagText,
  popupType,
  options,
  selectedOption,
  selectedFilters,
  onOptionSelect,
  onFilterSelect,
  onReset,
  iconSrc = "/img/dropdown.png"
}) {
  const [isPopupOpen, setPopupState] = useState(false); // togglePopup 이름 변경

  const handlePopupToggle = () => {
    setPopupState((prev) => !prev); // 이름 변경으로 충돌 방지
  };

  const buttonClassName = isPopupOpen
    ? "tag-button popup-open"
    : selectedOption || Object.keys(selectedFilters || {}).length > 0
      ? "tag-button option-selected"
      : "tag-button";

  return (
    <div className="tag-container">
      {/* 태그 버튼 */}
      <button className={buttonClassName} onClick={handlePopupToggle}>
        <span>{selectedOption || tagText}</span>
        <img
          src={iconSrc}
          alt="dropdown icon"
          className="dropdown-icon"
        />
      </button>

      {/* 팝업 렌더링 */}
      {isPopupOpen && (
        <PopupWrapper onClose={handlePopupToggle}>
          {popupType === "selection" ? (
            <TagSelection
              tagText={tagText}
              options={options}
              selectedOption={selectedOption}
              onOptionSelect={(option) => {
                onOptionSelect(option);
                setPopupState(false); // 팝업 닫기
              }}
              onReset={onReset}
              onClose={() => setPopupState(false)} // 팝업 닫기
            />
          ) : (
            <TagFilter
              tagText={tagText}
              options={options}
              selectedFilters={selectedFilters}
              onFilterSelect={(filterGroup, option) => {
                onFilterSelect(filterGroup, option);
              }}
              onReset={onReset}
              onClose={() => setPopupState(false)} // 팝업 닫기
            />
          )}
        </PopupWrapper>
      )}
    </div>
  );
}

export default Tag;