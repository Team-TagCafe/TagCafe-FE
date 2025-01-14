/*global kakao*/

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BottomBar, TopBar, LocationReset, CafePopup } from '../components';
import './Home.css'

const Home = () => {
  const [map, setMap] = useState(null);
  const [searchPlace, setSearchPlace] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);  // 팝업 표시 여부 상태
  const [popupContent, setPopupContent] = useState({ name: '', address: '' });  // 팝업에 표시할 카페 이름과 주소  
  const location = useLocation();
  const selectedPlace = location.state?.selectedPlace;

  // 마커 이미지 설정
  const imageSrc = '/img/map-cafe.png';
  const imageSize = new kakao.maps.Size(17, 17);
  const imageOption = { offset: new kakao.maps.Point(5, 5) };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  // 사용자가 장소 검색 시, searchPlace 값을 업데이트하는 함수
  const handleSearchPlaceChange = (place) => {
    setSearchPlace(place);
  };

  // 장소명 표시용 CustomOverlay 생성 함수
  const createCustomOverlay = (map, markerPosition, placeName) => {
    const content = `
      <div class="label">
        ${placeName}
      </div>
    `;

    const customOverlay = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
      yAnchor: -0.5, // 마커 아래에 위치하도록 조정
    });

    customOverlay.setMap(map);
  };

  // 카페 검색 결과를 받아오고, 지도에 마커 추가
  const handleSearchResults = (places) => {
    setSearchResults(places);

    if (map) {
      let bounds = new kakao.maps.LatLngBounds();
      places.forEach((place) => {
        const markerPosition = new kakao.maps.LatLng(place.y, place.x);
        const marker = new kakao.maps.Marker({
          map: map,
          position: markerPosition,
          image: markerImage
        });

        // CustomOverlay로 장소명 표시
        createCustomOverlay(map, markerPosition, place.place_name);

        // 마커 클릭 이벤트 추가
        kakao.maps.event.addListener(marker, 'click', () => {
          setPopupContent({ name: place.place_name, address: place.address_name });
          setShowPopup(true);  // 팝업 표시
        });

        bounds.extend(markerPosition);
      });
      map.setBounds(bounds);
    }
  };

  // 지도 초기화 및 설정
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);

  // selectedPlace가 변경될 때 지도에 마커 표시
  useEffect(() => {
    if (map && selectedPlace) {
      const markerPosition = new kakao.maps.LatLng(selectedPlace.y, selectedPlace.x);
      const marker = new kakao.maps.Marker({
        map: map,
        position: markerPosition,
        image: markerImage
      });

      createCustomOverlay(map, markerPosition, selectedPlace.place_name);

      // 마커 클릭 이벤트 추가
      kakao.maps.event.addListener(marker, 'click', () => {
        setPopupContent({ name: selectedPlace.place_name, address: selectedPlace.address_name });
        setShowPopup(true);
      });

      map.setCenter(markerPosition);
    }
  }, [map, selectedPlace]);

  // searchPlace가 변경될 때 카페 검색
  useEffect(() => {
    if (map && searchPlace) {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(searchPlace + ' 카페', placesSearchCB);

      function placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
          handleSearchResults(data);
        }
      }
    }
  }, [map, searchPlace]);

  // 현재 위치로 지도 중심 이동하는 함수
  const moveToUserLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const userLocation = new kakao.maps.LatLng(userLat, userLng);

          map.setCenter(userLocation);

          const marker = new kakao.maps.Marker({
            position: userLocation,
            map: map,
            image: markerImage
          });

          // createCustomOverlay(map, userLocation, '현재 위치');
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
      <TopBar showSearchAndFilter={true} onSearchPlaceChange={handleSearchPlaceChange} />
      <div>
        <div className="map" id="map" style={{ width: '393px', height: '535px' }}></div>
        <LocationReset onClick={moveToUserLocation} />

        {/* 마커 클릭 시 팝업을 조건부로 표시 */}
        {showPopup &&
          <CafePopup
            cafeName={popupContent.name}
            cafeAddress={popupContent.address}
            onClose={() => setShowPopup(false)}
          />}
      </div>
      <BottomBar />
    </>
  );
};

export default Home;
