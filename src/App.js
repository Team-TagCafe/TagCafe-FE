import React, { useState } from "react";
import Tag from "./components2/Tag";
import TagFilter from "./components2/TagFilter";
import "./App.css";

function App() {
  const [activeComponent, setActiveComponent] = useState(null); // "tagSelection" | "tagFilter" | null

  const toggleTagFilter = () => {
    setActiveComponent((prev) => (prev === "tagFilter" ? null : "tagFilter"));
  };

  return (
    <div className="App">
      {/* Tag 컴포넌트 */}
      <Tag tagText="콘센트" />

  
      {/* TagFilter 팝업 */}
      <Tag tagText="태그 필터" popupType="filter" />
    </div>
  );
}

export default App;