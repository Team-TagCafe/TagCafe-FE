import React, { useState } from "react";
import Tag from "./components2/Tag";
import Popup from "./components2/Popup";
import "./App.css";

function App() {
  const [activePopup, setActivePopup] = useState(null); // "tagSelection" | "tagFilter" | null
  const [selectedOption, setSelectedOption] = useState(""); // 콘센트 선택 상태
  const [selectedFilters, setSelectedFilters] = useState({}); // 태그 필터 선택 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option); // 콘센트 옵션 업데이트
    setActivePopup(null); // 팝업 닫기
  };

  const handleFilterSelect = (filterGroup, option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterGroup]: prev[filterGroup] === option ? null : option, // 필터 선택/해제
    }));
  };

  const handleReset = () => {
    setSelectedOption(""); // 콘센트 초기화
    setSelectedFilters({}); // 필터 초기화
  };

  const handleConfirm = () => {
    alert("확인 버튼이 눌렸습니다!");
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };


  return (
    <div className="App">
      {/* 콘센트 태그 */}
      <Tag
        tagText="콘센트"
        popupType="selection"
        options={["자리에마다", "일부", "없음"]}
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
        onReset={handleReset}
        isPopupOpen={activePopup === "tagSelection"}
        togglePopup={() =>
          setActivePopup((prev) =>
            prev === "tagSelection" ? null : "tagSelection"
          )
        }
      />

      {/* 태그 필터 */}
      <Tag
        tagText="태그 필터"
        popupType="filter"
        options={[
          { group: "운영시간", options: ["영업중", "24시간"] },
          { group: "와이파이", options: ["빠름", "보통", "없음"] },
          { group: "콘센트", options: ["자리에마다", "일부", "없음"] },
        ]}
        selectedFilters={selectedFilters}
        onFilterSelect={handleFilterSelect}
        onReset={handleReset}
        isPopupOpen={activePopup === "tagFilter"}
        togglePopup={() =>
          setActivePopup((prev) => (prev === "tagFilter" ? null : "tagFilter"))
        }
      />

      <button onClick={() => setIsPopupOpen(true)}>팝업 열기</button>
      {isPopupOpen && (
        <Popup
          message="정말 삭제하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

    </div>
  );
}

export default App;