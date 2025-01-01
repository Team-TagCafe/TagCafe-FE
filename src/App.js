import React, { useState } from "react";
import Tag from "./components2/Tag";
import SelectTag from "./components2/selectTag";
import Popup from "./components2/TagSelection";

import './App.css';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleOptionToggle = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleReset = () => setSelectedOptions([]);

  return (
    <div className="App">
      <Tag tagText="와이파이" />
      <Tag tagText="주차" />
      <br></br>
      <SelectTag tagText="옵션1" />

      <Tag onClick={togglePopup} tagText="콘센트"/>
      {isPopupOpen && (
        <Popup
          tagText="선택"
          options={["자리에마다", "일부", "없음"]}
          selectedOptions={selectedOptions} 
          onOptionToggle={handleOptionToggle}
          onReset={handleReset}
          onClose={togglePopup}
        />
      )}
    </div>
  );
}

export default App;
