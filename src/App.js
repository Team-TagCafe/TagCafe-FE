import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './home/Home';
import My from './my/My';
import Saved from './saved/Saved';
import Search from './home/Search';
import { useState } from 'react';  // 상태 관리 위해 useState 추가

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 상태

  // 장소가 선택될 때 호출될 함수
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place); // 선택한 장소 정보를 상태로 저장
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 각 경로 설정 */}
          <Route path="/home" element={<Home selectedPlace={selectedPlace} />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/my" element={<My />} />
          {/* Search 컴포넌트에 onPlaceSelect 전달 */}
          <Route path="/search" element={<Search onPlaceSelect={handlePlaceSelect} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
