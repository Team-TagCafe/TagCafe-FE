/*global kakao*/

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BottomBar, TopBar, LocationReset } from '../components';

let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const Home = () => {
  const [map, setMap] = useState(null);
  const [searchPlace, setSearchPlace] = useState('');
  const location = useLocation();
  const selectedPlace = location.state?.selectedPlace;

  // 사용자가 장소 검색 시, searchPlace 값을 업데이트하는 함수
  const handleSearchPlaceChange = (place) => {
    setSearchPlace(place);
  };

  // 검색된 장소에 대한 마커와 infoWindow 표시 함수
  const displayPlaces = (places) => {
    if (!map || !places) return;

    let bounds = new kakao.maps.LatLngBounds();
    places.forEach((place) => {
      const { y, x, place_name } = place;
      const markerPosition = new kakao.maps.LatLng(y, x);

      const marker = new kakao.maps.Marker({
        map: map,
        position: markerPosition
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place_name}</div>`);
        infowindow.open(map, marker);
      });

      bounds.extend(markerPosition);
    });

    map.setBounds(bounds);
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
        position: markerPosition
      });

      infowindow.setContent(`<div style="padding:5px;font-size:12px;">${selectedPlace.place_name}</div>`);
      infowindow.open(map, marker);
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
          displayPlaces(data); // 검색된 장소를 표시하는 함수 호출
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

          new kakao.maps.Marker({
            position: userLocation,
            map: map
          });

          console.log('현재 위치 경도:', userLng); // 개발 중에만 사용
          console.log('현재 위치 위도:', userLat); // 개발 중에만 사용
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
      </div>
      <BottomBar />
    </>
  );
};

export default Home;
