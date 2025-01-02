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

function App() {
  return (
    <div className="App">
      {/* LocationReset 버튼 */}
      <LocationReset/>

      {/* VisitStatus 버튼 */}
      <VisitStatus/>

      {/* Bookmark 버튼 */}
      <Bookmark/>

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

    </div>
  );
}

export default App;
