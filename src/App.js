import logo from './logo.svg';
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

function App() {

    // 북마크 상태가 변경될 때 실행되는 함수
    const handleBookmarkChange = (isBookmarked) => {
      if (isBookmarked) {
        console.log("북마크가 설정되었습니다!");
      } else {
        console.log("북마크가 해제되었습니다!");
      }
    };

  return (
    <div className="App">
      {/* LocationReset 버튼 */}
      <LocationReset/>

      {/* VisitStatus 버튼 */}
      <VisitStatus/>

      {/* Bookmark 버튼 */}
      <Bookmark onClick={handleBookmarkChange} />

      {/* SideMenuButton 버튼 */}
      <SideMenuButton buttonType="button1" optionText="개인정보처리방침" />
      <SideMenuButton buttonType="button2" optionText="개인정보처리방침" />

      {/* LongButton 버튼 */}
      <LongButton optionText={"확인"} />

      {/* LongButton 버튼 */}
      <ShortButton optionText={"수정"} />

      {/* Bookmark 버튼 */}
      <ReviewStar/>

      {/* DetailButton 버튼 */}
      <DetailButton optionText="카페 상세보기 >" />

      {/* SearchResult 버튼 */}
      <SearchResult 
      cafeName="스테이 어도러블" 
      address="경기 용인시 기흥구 죽전로43번길 15-3 (보정동)"
      />

    </div>
  );
}

export default App;
