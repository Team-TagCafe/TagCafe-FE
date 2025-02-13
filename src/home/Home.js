/*global kakao*/

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomBar, TopBar, LocationReset, CafePopup } from '../components';
import { useCafe } from './CafeContext';
import './Home.css';

const Home = () => {
  /* ---------- 상태 관리 ---------- */
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlace } = useCafe();
  const [map, setMap] = useState(null);
  const [searchPlace, setSearchPlace] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ name: '', address: '', id: null });
  const [searchResults, setSearchResults] = useState([]);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [nickname, setNickname] = useState(localStorage.getItem("nickname") || ""); // 로그인된 사용자 닉네임
  const [email, setEmail] = useState(localStorage.getItem("email") || ""); // 로그인된 사용자 이메일

  // 마커 이미지 설정
  const imageSrc = '/img/map-cafe.png';
  const imageSize = new kakao.maps.Size(17, 17);
  const imageOption = { offset: new kakao.maps.Point(5, 5) };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  /* ---------- 카카오 로그인 후 사용자 정보 저장 ---------- */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nicknameFromUrl = params.get("nickname");
    const emailFromUrl = params.get("email");

    if (nicknameFromUrl && emailFromUrl) {
      localStorage.setItem("nickname", nicknameFromUrl);
      localStorage.setItem("email", emailFromUrl);
      setNickname(nicknameFromUrl);
      setEmail(emailFromUrl);
      alert(`카카오 로그인 성공! 닉네임: ${nicknameFromUrl}`);
    }
  }, [location]);

  /* ---------- 초기 Kakao 지도 설정 ---------- */
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeListener);

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.498095, 127.027610),
      level: 3
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);

    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  /* ---------- 검색창에서 특정 카페 선택 시 마커 표시 ---------- */
  useEffect(() => {
    if (map && selectedPlace) {
      const markerPosition = new kakao.maps.LatLng(selectedPlace.y, selectedPlace.x);
      const marker = new kakao.maps.Marker({
        map: map,
        position: markerPosition,
        image: markerImage
      });

      createCustomOverlay(map, markerPosition, selectedPlace.place_name, selectedPlace.address_name);

      kakao.maps.event.addListener(marker, 'click', () => {
        setPopupContent({ name: selectedPlace.place_name, address: selectedPlace.address_name });
        setShowPopup(true);
      });

      map.setCenter(markerPosition);
    }
  }, [map, selectedPlace]);

  /* ---------- 지도 카페명 표시 CustomOverlay 생성 ---------- */
  const createCustomOverlay = (map, markerPosition, placeName, placeAddress) => {
    const content = document.createElement('div');
    content.className = 'label';
    content.innerText = placeName;
    content.style.cursor = 'pointer';

    content.addEventListener('click', () => {
      setPopupContent({ name: placeName, address: placeAddress, id: selectedPlace.id || 1 });
      setShowPopup(true);
    });

    const customOverlay = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
      yAnchor: -0.5,
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
        },
        (error) => {
          console.error('사용자 위치를 가져오는 중 오류 발생:', error.message);
        }
      );
    } else {
      console.error('이 브라우저에서는 geolocation을 지원하지 않습니다.');
    }
  };

  /* ---------- 로그아웃 기능 ---------- */
  const handleLogout = () => {
    localStorage.removeItem("nickname");
    localStorage.removeItem("email");
    setNickname("");
    setEmail("");
    navigate("/");
  };

  return (
    <>
      <TopBar showSearch showTags showHamburger={true} onSearchPlaceChange={setSearchPlace} />
      <div>
        <div className="map" id="map"
          style={{ width: '393px', height: `${innerHeight - 265}px` }}
        ></div>
        <LocationReset onClick={moveToUserLocation} />

        {/* 마커 클릭 시 팝업 표시 */}
        {showPopup &&
          <CafePopup
            cafeName={popupContent.name}
            cafeAddress={popupContent.address}
            cafeId={popupContent.id}
            onClose={() => setShowPopup(false)}
          />}

        {/* 로그인 상태 표시 */}
        {nickname && (
          <div className="user-info">
            <p>환영합니다, {nickname}님!</p>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </div>
      <BottomBar />
    </>
  );
};

export default Home;