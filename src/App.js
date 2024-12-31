import logo from './logo.svg';
import Tag from "./components2/Tag";
import SelectTag from "./components2/selectTag";

import './App.css';

function App() {
  return (
    <div className="App">
      <Tag tagText="와이파이" />
      <Tag tagText="주차" />
      <br></br>
      <SelectTag tagText="옵션1" />

    </div>
  );
}

export default App;
