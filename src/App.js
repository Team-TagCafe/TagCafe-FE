import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';  

import Home from './home/Home';
import My from './my/My';
import Saved from './saved/Saved';
import Search from './home/Search';
import Login from './start/Login';
import NicknameChange from "./start/Nickname";
import Delete from './start/Delete';
import PrivacyPolicy from './start/PrivacyPolicy';
import ServicePolicy from './start/ServicePolicy';
import LocationPolicy from './start/LocationPolicy';
import FAQ from './start/FAQ';
import ReviewEdit from './my/ReviewEdit';

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
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home selectedPlace={selectedPlace} />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/my" element={<My />} />
          <Route path="/my/review/edit/:cafeId" element={<ReviewEdit />} />
          {/* Search 컴포넌트에 onPlaceSelect 전달 */}
          <Route path="/search" element={<Search onPlaceSelect={handlePlaceSelect} />} />
          <Route path="/nickname-change" element={<NicknameChange />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/service-policy" element={<ServicePolicy />} />
          <Route path="/location-policy" element={<LocationPolicy />} />
          <Route path="/faq-qa" element={<FAQ />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;