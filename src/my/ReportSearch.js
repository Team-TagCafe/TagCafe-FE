/*global kakao*/
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TopBar, BottomBar, LongButton } from "../components";
import "./ReportAdd.css"
import "./ReportSearch.css";
import Popup from "../components/Popup";

const ReportSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState(location.state?.searchKeyword);
  const [searchResults, setSearchResults] = useState([]);
  const [showExistPopup, setShowExistPopup] = useState(false);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer || !searchKeyword) return;

    const mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.9780),
      level: 3,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const cafes = data.filter((place) => place.category_group_code === "CE7");
        setSearchResults(cafes);

        const bounds = new kakao.maps.LatLngBounds();
        cafes.forEach((place) => {
          const loc = new kakao.maps.LatLng(place.y, place.x);
          bounds.extend(loc);
          new kakao.maps.Marker({ map, position: loc });
        });
        requestAnimationFrame(() => {
          map.setBounds(bounds);
          map.relayout();
        });
      }
    });
  }, [searchKeyword]);

  const handleSelect = async (cafe) => {
    const kakaoPlaceId = cafe.id;
  
    try {
      const checkResponse = await fetch(`http://localhost:8080/report/cafes/kakao/${kakaoPlaceId}`);
      if (checkResponse.ok) {
        const result = await checkResponse.json();
        if (result.exists !== false) {
          setShowExistPopup(true);
          return;
        }
      }
    } catch (error) {
      console.error("카페 확인 중 오류 발생:", error);
    }
  
    navigate("/my/report/add", {
      state: {
        selectedCafe: cafe,
        searchKeyword: cafe.place_name,
      },
    });
  };

  return (
    <div className="report-search-page">
     <TopBar title="# My" />

     <header className="report-cafe-add-header">
        <div className="report-header-container"> 
        <button className="back-button" onClick={() => navigate("/my/report/add")}>
          <img src="/img/back-button.png" alt="뒤로가기" />
        </button>
        <h2>카페 검색</h2>
        </div>

        <div className="report-add-search">
          <input
            type="text"
            className="report-search-input"
            placeholder="카페명을 검색하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            />
        </div>
      </header>


      <section className="report-form" style={{ height: "auto" }}>
      <div id="map" style={{ width: "100%", height: "300px", minHeight: "300px" }}></div>
      <ul className="search-results-list">
        {searchResults.map((place) => (
          <li key={place.id} onClick={() => handleSelect(place)}>
            <strong>{place.place_name}</strong> <br />
            <small>{place.road_address_name}</small>
          </li>
        ))}
      </ul>
      </section>
        {showExistPopup && (
        <Popup
            message="이미 등록된 카페입니다."
            onConfirm={() => setShowExistPopup(false)}
            showCancel={false}
        />
        )}
    </div>
    
  );
};

export default ReportSearch;