/*global kakao*/

import React, { useEffect, useState } from 'react';
import { BottomBar, TopBar } from '../components';
import { LocationReset } from '../components';

const Home = () => {
  const [map, setMap] = useState(null); // map 상태를 관리

  useEffect(() => {
    const container = document.getElementById('map');
    // 지도 초기 설정 값
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), // 지도의 중심 좌표
      level: 3 // 지도의 확대 레벨 -> 숫자 클수록 더 넓은 범위임
    };

    const kakaoMap = new kakao.maps.Map(container, options); // 지도 초기화
    setMap(kakaoMap); // 상태로 map을 저장

    // 마커 생성
    const markerPosition = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488);
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(kakaoMap);
  }, []);

  // 현재 위치로 지도 중심 이동하는 함수
  const moveToUserLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const userLocation = new kakao.maps.LatLng(userLat, userLng);

          // 사용자의 현재 위치로 지도 중심 이동
          map.setCenter(userLocation);

          // 마커 위치도 현재 위치로 이동
          const marker = new kakao.maps.Marker({
            position: userLocation
          });
          marker.setMap(map);
          
          // 경도와 위도 출력
          console.log("현재 위치 경도:", userLng);
          console.log("현재 위치 위도:", userLat);
        },
        (error) => {
          console.error("사용자 위치를 가져오는 중 오류 발생:", error.message);
        }
      );
    } else {
      console.error("이 브라우저에서는 geolocation을 지원하지 않습니다.");
    }
  };

  return (
    <>
      <TopBar showSearchAndFilter={true} />
      <div>
        <div className="map" id="map" style={{ width: "393px", height: "585px" }}></div>
        <LocationReset onClick={moveToUserLocation} />
      </div>
      <BottomBar />
    </>
  );
};

export default Home;
