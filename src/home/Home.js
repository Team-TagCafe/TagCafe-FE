/*global kakao*/

import React, { useEffect, useState } from 'react';
import { BottomBar, TopBar, LocationReset } from '../components';

let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const Home = () => {
  const [map, setMap] = useState(null); // map 상태를 관리
  const [searchPlace, setSearchPlace] = useState(''); // searchPlace 상태를 관리

  // 사용자가 장소 검색 시, searchPlace 값을 업데이트하는 함수
  const handleSearchPlaceChange = (place) => {
    setSearchPlace(place); // TopBar에서 받은 입력값을 상태에 저장
  };

  useEffect(() => {
    if (!searchPlace) return; // searchPlace가 없을 때는 실행하지 않음

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchPlace + ' 카페', placesSearchCB); // '카페'를 추가하여 카페만 검색

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        kakaoMap.setBounds(bounds); // 검색된 결과에 맞게 지도 범위 설정
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>'
        );
        infowindow.open(kakaoMap, marker);
      });
    }
  }, [searchPlace]); // searchPlace가 변경될 때마다 useEffect 실행

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
      {/* TopBar 컴포넌트에 검색 기능을 포함하고, onSearchPlaceChange를 전달 */}
      <TopBar showSearchAndFilter={true} onSearchPlaceChange={handleSearchPlaceChange} />
      <div>
        <div className="map" id="map" style={{ width: "393px", height: "535px" }}></div>
        <LocationReset onClick={moveToUserLocation} />
      </div>
      <BottomBar />
    </>
  );
};

export default Home;