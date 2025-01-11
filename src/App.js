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
} from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tag from "./components/Tag";
import Popup from "./components/Popup";
import CafeInformation from "./components/CafeInformation";
import CafeInformationDetail from "./components/CafeInformationDetail";
import TagGroup from "./components/TagGroup";
import React, { useState } from "react";
import Login from "./start/Login";

const Home = () => <div>Home Page</div>;
const Saved = () => <div>Saved Page</div>;
const MyPage = () => <div>My Page</div>;

const ComponentPreview = () => {
  const [selectedOption, setSelectedOption] = useState(""); // 콘센트 선택 상태
  const [activePopup, setActivePopup] = useState(null); // "tagSelection" | "tagFilter" | null
  const [selectedFilters, setSelectedFilters] = useState({}); // 태그 필터 선택 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [reportStatus, setReportStatus] = useState("wait"); // State for report status
  const tags = [
    { icon: "/img/wifi.png", text: "와이파이 빠름" },
    { icon: "/img/plug.png", text: "콘센트 일부" },
    { icon: "/img/desk.png", text: "책상 적당함" },
    { icon: "/img/toilet.png", text: "화장실 외부" },
    { icon: "/img/park.png", text: "주차 가능(무료)" },
  ];

  const handleConfirm = () => {
    alert("확인 버튼이 눌렸습니다!");
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <h1>Component Preview</h1>

      {/* LocationReset 버튼 */}
      <LocationReset onClick={() => console.log("위치가 초기화되었습니다.")} />

      {/* VisitStatus 버튼 */}
      <VisitStatus onClick={(isVisited) => console.log(isVisited ? "방문 상태: 방문함" : "방문하지 않음")} />

      {/* Bookmark 버튼 */}
      <Bookmark onClick={(isBookmarked) => console.log(isBookmarked ? "북마크 설정됨" : "북마크 해제됨")} />

      {/* SideMenuButton */}
      <SideMenuButton buttonType="button1" optionText="개인정보처리방침" onClick={(text) => console.log(text)} />
      <SideMenuButton buttonType="button2" optionText="이용 약관" onClick={(text) => console.log(text)} />

      {/* LongButton */}
      <LongButton optionText={"확인"} onClick={() => console.log("LongButton 클릭")} />

      {/* ShortButton */}
      <ShortButton optionText={"수정"} onClick={() => console.log("ShortButton 클릭")} />

      {/* ReviewStar */}
      <ReviewStar onClick={(rating) => console.log(`선택된 별점: ${rating}점`)} />

      {/* DetailButton */}
      <DetailButton optionText="카페 상세보기 >" onClick={() => console.log("카페 상세보기 버튼 클릭")} />

      {/* SearchResult */}
      <SearchResult
        cafeName="스테이 어도러블"
        address="경기 용인시 기흥구 죽전로43번길 15-3 (보정동)"
        onClick={(cafeName) => console.log(`선택된 카페: ${cafeName}`)}
      />

      {/* TextInput */}
      <TextInput
        placeholder="input"
        value={inputValue}
        onChange={(value) => setInputValue(value)}
        onKeyDown={(event) => event.key === 'Enter' && console.log('Enter key pressed')}
      />

      {/* MapCafe */}
      <MapCafe cafeName="스테이 어도러블" />

      {/* ReportStatus */}
      <ReportStatus status={reportStatus} />
      <button onClick={() => setReportStatus("wait")}>wait</button>
      <button onClick={() => setReportStatus("accepted")}>accepted</button>
      <button onClick={() => setReportStatus("denied")}>denied</button>

      {/* Popup */}
      <button onClick={() => setIsPopupOpen(true)}>팝업 열기</button>
      {isPopupOpen && (
        <Popup
          message="정말 삭제하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {/* Tag */}
      <Tag
        tagText="콘센트"
        popupType="selection"
        options={["자리에마다", "일부", "없음"]}
        selectedOption={selectedOption}
        onOptionSelect={setSelectedOption}
        isPopupOpen={false}
      />

      {/* TagGroup */}
      <TagGroup tags={tags} />

      {/* CafeInformationDetail */}
      <CafeInformationDetail />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 각 경로 설정 */}
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/components" element={<ComponentPreview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;