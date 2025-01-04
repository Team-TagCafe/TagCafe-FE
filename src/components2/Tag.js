import React from "react";
import TagSelection from "./TagSelection";
import TagFilter from "./TagFilter";
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
  isPopupOpen,
  togglePopup,
}) {
  const buttonClassName = isPopupOpen
    ? "tag-button popup-open"
    : selectedOption || Object.keys(selectedFilters || {}).length > 0
    ? "tag-button option-selected"
    : "tag-button";

  return (
    <div className="tag-container">
      {/* 태그 버튼 */}
      <button className={buttonClassName} onClick={togglePopup}>
        <span>{selectedOption || tagText}</span>
        <img
          src="/img/dropdown.png"
          alt="dropdown icon"
          className="dropdown-icon"
        />
      </button>

      {/* 팝업 렌더링 */}
      {isPopupOpen && popupType === "selection" && (
        <TagSelection
          tagText={tagText}
          options={options}
          selectedOption={selectedOption}
          onOptionSelect={onOptionSelect}
          onReset={onReset}
          onClose={togglePopup}
        />
      )}

      {isPopupOpen && popupType === "filter" && (
        <TagFilter
          tagText={tagText}
          options={options}
          selectedFilters={selectedFilters}
          onFilterSelect={onFilterSelect}
          onReset={onReset}
          onClose={togglePopup}
        />
      )}
    </div>
  );
}

export default Tag;