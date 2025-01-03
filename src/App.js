import './App.css';
import LocationReset from "./components1/LocationReset";
import VisitStatus from "./components1/VisitStatus";
import Bookmark from "./components1/Bookmark";
import SideMenuButton from './components1/SideMenuButton';
import LongButton from './components1/LongButton';
import ShortButton from './components1/ShortButton';
import ReviewStar from './components1/ReviewStar';
import DetailButton from './components1/DetailButton';
import SearchResult from './components1/SearchResult';
import TextInput from './components1/TextInput';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavBar from './components1/BottomBar';
import ReviewTag from './components1/ReviewTag';
import MapCafe from './components1/MapCafe';

const Home = () => <div>Home Page</div>;
const Search = () => <div>Search Page</div>;
const Profile = () => <div>Profile Page</div>;

function App() {
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

  const handleInputChange = (value) => {
    setInputValue(value);
    console.log(value); // 입력된 내용 콘솔에 출력
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
    }
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

      <Router>
        <div style={{ paddingBottom: '60px' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <BottomNavBar />
        </div>
      </Router>

      {/* ReviewTag */}
      <ReviewTag tagText="와이파이 빠름" iconSrc="../../img/wifi.png" />

      {/* MapCafe */}
      <MapCafe cafeName="스테이 어도러블" />

    </div>
  );
}

export default App;
