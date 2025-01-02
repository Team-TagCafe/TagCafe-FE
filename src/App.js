import logo from './logo.svg';
import './App.css';
import LocationReset from "./components1/LocationReset";
import VisitStatus from "./components1/VisitStatus";

function App() {
  return (
    <div className="App">
      {/* LocationReset 버튼 */}
      <LocationReset/>

      {/* VisitStatus 버튼 */}
      <VisitStatus/>

    </div>
  );
}

export default App;
