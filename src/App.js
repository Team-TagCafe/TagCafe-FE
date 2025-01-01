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

      {/* TagFilter 버튼 */}
      <button onClick={toggleTagFilter}>태그 필터</button>

      {/* TagFilter 팝업 */}
      {activeComponent === "tagFilter" && (
        <TagFilter onClose={() => setActiveComponent(null)} />
      )}
    </div>
  );
}

export default App;