import logo from './logo.svg';
import './App.css';
import LocationReset from "./components1/LocationReset";
import VisitStatus from "./components1/VisitStatus";
import Bookmark from "./components1/Bookmark";
import SideMenuButton from './components1/SideMenuButton';
import LongButton from './components1/LongButton';

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

    </div>
  );
}

export default App;
