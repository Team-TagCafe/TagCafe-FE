/*global kakao*/

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BottomBar, TopBar, LocationReset, CafePopup } from '../components';
import './Home.css'

const Home = () => {
  /* ---------- 상태 관리 ---------- */
  const [map, setMap] = useState(null); // Kakao 지도
  const [searchPlace, setSearchPlace] = useState(''); // 검색어 상태
  const [showPopup, setShowPopup] = useState(false);  // 팝업 표시 여부 상태
  const [popupContent, setPopupContent] = useState({ name: '', address: '', id: null, });  // 팝업 내용 (카페 이름, 주소, id)  
  const location = useLocation();
  const selectedPlace = location.state?.selectedPlace; // 외부에서 선택된 장소 정보

  const [searchResults, setSearchResults] = useState([]);

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

    // 지도 초기화
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.498095, 127.027610), // 초기 지도 중심 (강남역)
      level: 3 // 지도 확대 레벨
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);

    return () => window.removeEventListener('resize', resizeListener);
  }, []);


  /* ---------- 장소,카페명 입력 시 검색어 표시 (searchPlace 값 업데이트) ---------- */
  const handleSearchPlaceChange = (place) => {
    setSearchPlace(place);
  };


  /* ---------- 검색창에서 특정 카페 선택 시 마커 1개 표시 (selectedPlace 값 변경 시) ---------- */
  useEffect(() => {
    if (map && selectedPlace) {
      const markerPosition = new kakao.maps.LatLng(selectedPlace.y, selectedPlace.x);
      const marker = new kakao.maps.Marker({
        map: map,
        position: markerPosition,
        image: markerImage
      });

      createCustomOverlay(map, markerPosition, selectedPlace.place_name, selectedPlace.address_name);

      // 마커 클릭 이벤트 - CafePopup 뜸
      kakao.maps.event.addListener(marker, 'click', () => {
        setPopupContent({ name: selectedPlace.place_name, address: selectedPlace.address_name });
        setShowPopup(true);
      });

      map.setCenter(markerPosition);
    }
  }, [map, selectedPlace]);


  /* ---------- 검색창에서 장소 검색 시 마커 여러 개 표시 (구현 필요) ---------- */



  /* ---------- 지도 카페명 표시 CustomOverlay 생성  ---------- */
  const createCustomOverlay = (map, markerPosition, placeName, placeAdress) => {

    const content = document.createElement('div');
    content.className = 'label';
    content.innerText = placeName;
    content.style.cursor = 'pointer';

    // 라벨 클릭 이벤트 -  CafePopup 뜸
    content.addEventListener('click', () => {
      setPopupContent({ name: placeName, address: placeAdress, id: selectedPlace.id || 1, });
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
        onSearchPlaceChange={handleSearchPlaceChange} />
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
