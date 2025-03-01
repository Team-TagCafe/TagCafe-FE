/*global kakao*/

import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { BottomBar, TopBar, LocationReset, CafePopup } from '../components';
import './Home.css';

const Home = () => {
  /* ---------- 상태 관리 ---------- */
  const [map, setMap] = useState(null); // Kakao 지도
  const [searchPlace, setSearchPlace] = useState(''); // 검색어 상태
  const [showPopup, setShowPopup] = useState(false);  // 팝업 표시 여부 상태
  const [popupContent, setPopupContent] = useState({ name: '', address: '', id: null, });  // 팝업 내용 (카페 이름, 주소, id)  
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [markers, setMarkers] = useState([]);  // 마커 저장
  const [overlays, setOverlays] = useState([]); // 오버레이 저장

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

    if (!window.kakao || !window.kakao.maps) {
      console.error("❌ Kakao 지도 API가 로드되지 않았습니다.");
      return;
    }

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

    if (!container) {
      console.error("❌ 지도 컨테이너를 찾을 수 없습니다.");
      return;
    }

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);

    // 지도 데이터 불러오기
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
  const fetchCafesInArea = useCallback(async () => {
    const bounds = getMapBounds();
    if (!bounds) return;

    try {
      const response = await fetch(
        `http://localhost:8080/cafes/area?minLat=${bounds.minLat}&maxLat=${bounds.maxLat}&minLng=${bounds.minLng}&maxLng=${bounds.maxLng}`
      );
      const data = await response.json();

      // ✅ 새로운 데이터가 기존 데이터와 다를 때만 상태 업데이트
      setCafes((prevCafes) => {
        const isSameData = JSON.stringify(prevCafes) === JSON.stringify(data);
        return isSameData ? prevCafes : data;
      });
    } catch (error) {
      console.error("카페 조회 중 오류 발생:", error);
    }
  }, [map]); // map이 바뀔 때만 새로운 fetch 함수를 생성


  /* ---------- 필터링된 카페 조회 ---------- */
  const fetchFilteredCafes = async (filters) => {
    if (!filters || Object.keys(filters).length === 0) {
      console.log("⚪ [필터 없음] 기본 데이터 로드");
      setIsSearchMode(false);
      fetchCafesInArea();
      return;
    }

    const tagNames = Object.keys(filters);
    const values = tagNames.map(tag => filters[tag]);

    console.log(`📢 [API 요청] 다중 태그 필터링: ${JSON.stringify(filters)}`);

    try {
      const response = await fetch(
        `http://localhost:8080/cafes/filter/multiple?tagNames=${encodeURIComponent(tagNames.join(','))}&values=${encodeURIComponent(values.join(','))}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`❌ 서버 응답 오류: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ [필터링된 카페 데이터]", JSON.stringify(data, null, 2));

      if (data.length > 0) {
        setIsSearchMode(true);
        setSearchResults(data);
      } else {
        console.log("🔍 필터링된 결과 없음");
        setIsSearchMode(false);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("🚨 필터링된 카페 조회 중 오류 발생:", error);
    }
  };

  /* ---------- 지도 마커 및 오버레이 표시 ---------- */
  useEffect(() => {
    if (!map) return;

    const dataToShow = isSearchMode ? searchResults : cafes;
    if (dataToShow.length === 0) return;

    // ✅ 기존 마커 및 오버레이 삭제
    markers.forEach(marker => marker.setMap(null));
    overlays.forEach(overlay => overlay.setMap(null));

    const newMarkers = [];
    const newOverlays = [];

    // 지도 영역을 설정할 LatLngBounds 객체 생성
    const bounds = new kakao.maps.LatLngBounds();

    dataToShow.forEach((cafe) => {
      const markerPosition = new kakao.maps.LatLng(cafe.latitude, cafe.longitude);
      bounds.extend(markerPosition);

      if (!markerImage) return;
      const marker = new kakao.maps.Marker({
        map,
        position: markerPosition,
        image: markerImage
      });

      newMarkers.push(marker);

      const overlay = createCustomOverlay(markerPosition, cafe.cafeName, cafe.address);
      newOverlays.push(overlay);

      kakao.maps.event.addListener(marker, "click", () => {
        setPopupContent({ name: cafe.cafeName, address: cafe.address, id: cafe.cafeId });
        setShowPopup(true);
      });
    });

    // 기존 마커 및 오버레이 상태 업데이트
    setMarkers(newMarkers);
    setOverlays(newOverlays);

    // ✅ 검색 결과가 하나면 중심 이동, 여러 개면 확대 레벨 자동 조절
    if (dataToShow.length === 1) {
      map.setCenter(new kakao.maps.LatLng(dataToShow[0].latitude, dataToShow[0].longitude));
    } else {
      map.setBounds(bounds);
    }
  }, [map, searchResults, cafes, isSearchMode]);


  /* ---------- 검색 결과 반영 ---------- */
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

    if (location.state?.searchTerm) {
      setSearchPlace(location.state.searchTerm); // 검색어 유지
    }

  }, [location.state, map]);


  /* ---------- 지도 이동 후 카페 자동 로딩 ---------- */
  useEffect(() => {
    if (!map || isSearchMode) return; // 검색 모드에서는 실행 안 함
    fetchCafesInArea(); // 초기 실행

    // 지도 이동이 멈춘 후에만 fetchCafesInArea 실행
    const idleListener = kakao.maps.event.addListener(map, "idle", fetchCafesInArea);

    return () => kakao.maps.event.removeListener(map, "idle", idleListener);
  }, [map, isSearchMode, fetchCafesInArea]);


  /* ---------- 필터 변경 시 필터링된 카페 조회 ---------- */
  useEffect(() => {
    console.log("🟡 [필터 변경 감지] selectedFilters:", JSON.stringify(selectedFilters, null, 2));
    fetchFilteredCafes(selectedFilters);
  }, [selectedFilters]);


  /* ---------- 지도 카페명 표시 CustomOverlay 생성  ---------- */
  const createCustomOverlay = (markerPosition, placeName, placeAddress) => {
    const content = document.createElement('div');
    content.className = 'label';
    content.innerText = placeName;
    content.style.cursor = 'pointer';

    // 라벨 클릭 이벤트 - CafePopup 뜸
    content.addEventListener('click', () => {
      setPopupContent({ name: placeName, address: placeAddress, id: 1 }); // id 변경 필요
      setShowPopup(true);
    });

    const customOverlay = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
      yAnchor: -0.5, // 마커 아래에 위치하도록 조정
    });

    customOverlay.setMap(map);
    return customOverlay;
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
        onSearchPlaceChange={setSearchPlace}
        onClearSearch={() => {
          setIsSearchMode(false);
          setSearchPlace('');
        }}
        onFilterChange={setSelectedFilters} />
      <div>
        <div className="map" id="map"
          style={{ width: '393px', height: `${innerHeight - 265}px` }}
        ></div>
        <LocationReset onClick={moveToUserLocation} />

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
