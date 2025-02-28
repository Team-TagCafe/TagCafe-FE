/*global kakao*/

import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { BottomBar, TopBar, LocationReset, CafePopup } from '../components';
import './Home.css';

const Home = () => {
  /* ---------- 상태 관리 ---------- */
  const [map, setMap] = useState(null); // Kakao 지도
  const [searchPlace] = useState(''); // 검색어 상태
  const [showPopup, setShowPopup] = useState(false);  // 팝업 표시 여부 상태
  const [popupContent, setPopupContent] = useState({ name: '', address: '', id: null, });  // 팝업 내용 (카페 이름, 주소, id)  
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});


  // 지도 사이즈 설정용
  const [innerWidth, setInnerWidth] = useState(window.innerWidth); // 화면 너비
  const [innerHeight, setInnerHeight] = useState(window.innerHeight); // 화면 높이

  // 마커 이미지 설정
  const imageSrc = '/img/map-cafe.png';
  const imageSize = new kakao.maps.Size(17, 17);
  const imageOption = { offset: new kakao.maps.Point(5, 5) };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);


  /* ---------- 초기 Kakao 지도 설정 ---------- */
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeListener); //화면 사이즈 변경 감지

    // 사용자의 위치 권한 요청
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 사용자가 위치 권한 허용한 경우
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          console.log("✅ 사용자 위치:", userLat, userLng);

          initializeMap(userLat, userLng); // 사용자 위치로 지도 초기화
        },
        (error) => {
          console.warn("❌ 위치 권한 거부됨, 기본 위치 사용 (강남역)");
          initializeMap(37.498095, 127.027610); // 기본 위치 강남역으로 초기화
        }
      );
    } else {
      console.error("이 브라우저에서는 Geolocation을 지원하지 않습니다.");
      initializeMap(37.498095, 127.027610); // 기본 위치 강남역으로 초기화
    }

    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  /* ---------- 지도 초기화 함수 ---------- */
  const initializeMap = (lat, lng) => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, lng), // 사용자 위치 or 기본 위치 (강남역)
      level: 3, // 지도 확대 레벨
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);

    // ✅ 지도 데이터 불러오기
    kakao.maps.event.addListener(kakaoMap, "idle", fetchCafesInArea);
  };


  /* ---------- 지도 경계값 가져오기 (현재 영역 내 카페 조회) ---------- */
  const getMapBounds = () => {
    if (!map) return null;
    const bounds = map.getBounds(); // 현재 지도의 경계값 가져오기
    return {
      minLat: bounds.getSouthWest().getLat(),
      maxLat: bounds.getNorthEast().getLat(),
      minLng: bounds.getSouthWest().getLng(),
      maxLng: bounds.getNorthEast().getLng(),
    };
  };

  /* ---------- 현재 지도 영역 내 카페 조회 ---------- */
  const fetchCafesInArea = async () => {
    const bounds = getMapBounds();
    if (!bounds) return;

    try {
      const response = await fetch(`http://localhost:8080/cafes/area?minLat=${bounds.minLat}&maxLat=${bounds.maxLat}&minLng=${bounds.minLng}&maxLng=${bounds.maxLng}`);
      const data = await response.json();
      setCafes(data); // 조회된 카페 목록 저장
    } catch (error) {
      console.error("카페 조회 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (location.state?.results && location.state.results.length > 0) {
        setSearchResults(location.state.results);
        setIsSearchMode(true);

        if (map) {
            map.setCenter(new kakao.maps.LatLng(location.state.results[0].latitude, location.state.results[0].longitude));
        }

        // 새로고침 시 location.state 제거
        window.history.replaceState(null, '', location.pathname);
    } else if (location.state?.place) { // place가 있을 경우 처리
        setSearchResults([location.state.place]); // place를 배열로 설정
        setIsSearchMode(true);

        if (map) {
            map.setCenter(new kakao.maps.LatLng(location.state.place.latitude, location.state.place.longitude));
        }

        window.history.replaceState(null, '', location.pathname);
    } else {
        setIsSearchMode(false);
    }
}, [location.state, map]);

  

  useEffect(() => {
    if (!map) return;
    
    const dataToShow = isSearchMode ? searchResults : cafes;
    
    dataToShow.forEach((cafe) => {
      const markerPosition = new kakao.maps.LatLng(cafe.latitude, cafe.longitude);
      const marker = new kakao.maps.Marker({
        map,
        position: markerPosition,
        image: markerImage
      });
      
      createCustomOverlay(markerPosition, cafe.cafeName, cafe.address);
      kakao.maps.event.addListener(marker, "click", () => {
        setPopupContent({ name: cafe.cafeName, address: cafe.address, id: cafe.cafeId });
        setShowPopup(true);
      });
    });
  }, [map, searchResults, cafes, isSearchMode]);

  useEffect(() => {
    if (map && !isSearchMode) {
      fetchCafesInArea(); // 앱 처음 실행할 때 한 번 실행
      kakao.maps.event.addListener(map, "idle", fetchCafesInArea); // 지도 이동 후 카페 다시 불러오기
    }
  }, [map, isSearchMode]);

  /* ---------- 특정 태그와 값으로 카페 필터링 ---------- */
const fetchFilteredCafes = async (tagName, value) => {
  console.log(`📢 [API 요청] 특정 태그 필터링: tagName=${tagName}, value=${value}`); // API 요청 로그
  try {
    const response = await fetch(
      `http://localhost:8080/cafes/filter?tagName=${tagName}&value=${value}`
    );
    console.log("📥 [API 응답 상태]", response.status, response.statusText); // 응답 상태 확인
    const data = await response.json();
    console.log("✅ [필터링된 카페 데이터]", data); // 받아온 데이터 로그
    setCafes(data); // 필터링된 카페 목록 저장
  } catch (error) {
    console.error("필터링된 카페 조회 중 오류 발생:", error);
  }
};

useEffect(() => {
  if (selectedFilters && Object.keys(selectedFilters).length > 0) {
    // 선택된 필터 중 첫 번째 태그와 값만 사용 (다중 필터는 추가 로직 필요)
    const firstTag = Object.keys(selectedFilters)[0];
    const firstValue = selectedFilters[firstTag];

    if (firstTag && firstValue) {
      fetchFilteredCafes(firstTag, firstValue);
    }
  } else {
    fetchCafesInArea(); // 필터가 없으면 원래 지도 내 카페 표시
  }
}, [selectedFilters]); // selectedFilters 변경 시 실행

  

  /* ---------- 지도 카페명 표시 CustomOverlay 생성  ---------- */
  const createCustomOverlay = (markerPosition, placeName, placeAdress) => {

    const content = document.createElement('div');
    content.className = 'label';
    content.innerText = placeName;
    content.style.cursor = 'pointer';

    // 라벨 클릭 이벤트 -  CafePopup 뜸
    content.addEventListener('click', () => {
      setPopupContent({ name: placeName, address: placeAdress, id: 1, }); // id 변경해야함
      setShowPopup(true);
    });

    const customOverlay = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
      yAnchor: -0.5, // 마커 아래에 위치하도록 조정
    });

    customOverlay.setMap(map);
  };


  /* ---------- 현재 위치로 지도 중심 이동 ---------- */
  const moveToUserLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const userLocation = new kakao.maps.LatLng(userLat, userLng);

          map.setCenter(userLocation);

          // 경도와 위도 출력
          console.log("현재 위치 경도:", userLng);
          console.log("현재 위치 위도:", userLat);
        },
        (error) => {
          console.error('사용자 위치를 가져오는 중 오류 발생:', error.message);
        }
      );
    } else {
      console.error('이 브라우저에서는 geolocation을 지원하지 않습니다.');
    }
  };

  return (
    <>
      <TopBar
        showSearch showTags showHamburger={true}
        searchValue={searchPlace} 
        isSearchMode={isSearchMode} 
        onClearSearch={() => setIsSearchMode(false)} 
        onFilterChange={setSelectedFilters}/>
      <div>
        <div className="map" id="map"
          style={{ width: '393px', height: `${innerHeight - 265}px` }}
        ></div>
        <LocationReset onClick={moveToUserLocation} />

        {/* 마커 클릭 시 팝업을 조건부로 표시 */}
        {showPopup &&
          <CafePopup
            cafeName={popupContent.name}
            cafeAddress={popupContent.address}
            cafeId={popupContent.id}
            onClose={() => setShowPopup(false)}
          />}
      </div>
      <BottomBar />
    </>
  );
};

export default Home;
