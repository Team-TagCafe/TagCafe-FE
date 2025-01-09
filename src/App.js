import './App.css';
import {
  Bookmark,
  BottomBar,
  DetailButton,
  LocationReset,
  LongButton,
  MapCafe,
  ReportStatus,
  ReviewStar,
  SearchResult,
  ShortButton,
  SideMenuButton,
  TextInput,
  TopBar,
  VisitStatus
} from './components1'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tag from "./components2/Tag";
import Popup from "./components2/Popup";
import CafeInformation from "./components2/CafeInformation";
import CafeInformationDetail from "./components2/CafeInformationDetail";
import TagGroup from "./components2/TagGroup";
import React, { useState } from "react";


const Home = () => <div>Home Page</div>;
const Search = () => <div>Search Page</div>;
const Profile = () => <div>Profile Page</div>;

function App() {
  const [activePopup, setActivePopup] = useState(null); // "tagSelection" | "tagFilter" | null
  const [selectedOption, setSelectedOption] = useState(""); // 콘센트 선택 상태
  const [selectedFilters, setSelectedFilters] = useState({}); // 태그 필터 선택 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const tags = [
    { icon: "/img/wifi.png", text: "와이파이 빠름" },
    { icon: "/img/plug.png", text: "콘센트 일부" },
    { icon: "/img/desk.png", text: "책상 적당함" },
    { icon: "/img/toilet.png", text: "화장실 외부" },
    { icon: "/img/park.png", text: "주차 가능(무료)" },
  ];

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

  const handleOptionChange = (category, option) => {
    console.log(`${category} 선택: ${option}`);
  };

  // LocationReset 동작 함수
  const handleLocationReset = () => {
    console.log("위치가 초기화되었습니다.");
  };

  // VisitStatus 변경 함수
  const handleVisitStatusChange = (isVisited) => {
    console.log(isVisited ? "방문 상태: 방문함" : "방문 상태: 방문하지 않음");
  };

  // Bookmark 상태 변경 함수
  const handleBookmarkChange = (isBookmarked) => {
    if (isBookmarked) {
      console.log("북마크가 설정되었습니다!");
    } else {
      console.log("북마크가 해제되었습니다!");
    }
  };

  // SideMenuButton 클릭 함수
  const handleSideMenuClick = (optionText) => {
    console.log(`사이드 메뉴에서 선택된 옵션: ${optionText}`);
  };

  // LongButton 클릭 함수
  const handleLongButtonClick = (optionText) => {
    console.log(`LongButton 클릭됨: ${optionText}`);
  };

  // ShortButton 클릭 함수
  const handleShortButtonClick = (optionText) => {
    console.log(`ShortButton 클릭됨: ${optionText}`);
  };

  // ReviewStar 클릭 함수
  const handleReviewStarClick = (rating) => {
    console.log(`선택된 별점: ${rating}점`);
  };

  // DetailButton 클릭 함수
  const handleDetailButtonClick = () => {
    console.log("카페 상세보기 버튼이 클릭되었습니다.");
  };

  // SearchResult 선택 함수
  const handleSearchResultClick = (cafeName) => {
    console.log(`선택된 카페: ${cafeName}`);
  };

  // TextInput 함수
  const [inputValue, setInputValue] = useState('');
  const [reportStatus, setReportStatus] = useState("wait"); // State for report status

  const handleInputChange = (value) => {
    setInputValue(value);
    console.log(value); // 입력된 내용 콘솔에 출력
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
    }
  };

  // Function to update report status
  const updateReportStatus = (newStatus) => {
    setReportStatus(newStatus); // Update the status dynamically
    console.log(`Report status updated to: ${newStatus}`);
  };

  return (
    <div className="App">

      {/* LocationReset 버튼 */}
      <LocationReset onClick={handleLocationReset} />

      {/* VisitStatus 버튼 */}
      <VisitStatus onClick={handleVisitStatusChange} />

      {/* Bookmark 버튼 */}
      <Bookmark onClick={handleBookmarkChange} />

      {/* SideMenuButton 버튼 */}
      <SideMenuButton buttonType="button1" optionText="개인정보처리방침" onClick={handleSideMenuClick} />
      <SideMenuButton buttonType="button2" optionText="이용 약관" onClick={handleSideMenuClick} />

      {/* LongButton 버튼 */}
      <LongButton optionText={"확인"} onClick={handleLongButtonClick} />

      {/* ShortButton 버튼 */}
      <ShortButton optionText={"수정"} onClick={handleShortButtonClick} />

      {/* ReviewStar 버튼 */}
      <ReviewStar onClick={handleReviewStarClick} />

      {/* DetailButton 버튼 */}
      <DetailButton optionText="카페 상세보기 >" onClick={handleDetailButtonClick} />

      {/* SearchResult 버튼 */}
      <SearchResult
        cafeName="스테이 어도러블"
        address="경기 용인시 기흥구 죽전로43번길 15-3 (보정동)"
        onClick={handleSearchResultClick}
      />

      {/* TextInput 버튼 */}
      <TextInput
        placeholder="input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {/* MapCafe */}
      <MapCafe cafeName="스테이 어도러블" />

      {/* ReportStatus with dynamic status */}
      <ReportStatus status={reportStatus} />

      {/* Buttons to change status */}
      <button onClick={() => updateReportStatus("wait")}>wait</button>
      <button onClick={() => updateReportStatus("accepted")}>accepted</button>
      <button onClick={() => updateReportStatus("denied")}>denied</button>

      {/* <BottomBar/> */}
      <Router>
        <div style={{ paddingBottom: '60px' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <BottomBar />
        </div>
      </Router>

      {/* <TopBar/> */}
      <TopBar showSearchAndFilter={true} />
      {/* <TopBar showSearchAndFilter={false} /> */}

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

      <CafeInformation onChange={handleOptionChange} />
      <CafeInformationDetail />
      <LongButton optionText={"확인"} />

      <div>
      <TagGroup tags={tags} />
      </div>
    </div>
  );
}

export default App;
