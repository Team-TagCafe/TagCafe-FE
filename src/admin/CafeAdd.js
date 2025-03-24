/*global kakao*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CafeAdd = () => {
  const [map, setMap] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.498095, 127.027610), // 기본 지도 위치 (강남역)
      level: 3,
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);

    // ✅ 지도 이동 후 자동 검색
    kakao.maps.event.addListener(kakaoMap, 'idle', () => {
      if (!searchKeyword.trim()) {
        searchCafesByLocation();
      }
    });

  }, []);

  // ✅ (1) 현재 지도 중심 기준 카페 자동 검색 (카테고리 검색)
  const searchCafesByLocation = () => {
    if (!map) return;

    const places = new kakao.maps.services.Places();
    const center = map.getCenter(); // 현재 지도 중심 좌표

    places.categorySearch('CE7', (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResults(data);
        displayMarkers(data);
      } else {
        alert('검색된 카페가 없습니다.');
      }
    }, {
      location: center, // 현재 지도 중심을 기준으로 검색
      radius: 2000, // 검색 반경 (단위: 미터)
    });
  };

  // ✅ (2) 검색어로 카페 검색 (카페 카테고리 내에서만 필터링)
  const searchCafesByKeyword = () => {
    if (!searchKeyword.trim()) {
      alert('검색어를 입력하세요.');
      return;
    }

    const places = new kakao.maps.services.Places();
    places.keywordSearch(searchKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // ✅ 검색된 결과 중 'CE7' 카테고리(카페)만 필터링
        const cafeResults = data.filter((place) => place.category_group_code === 'CE7');
        if (cafeResults.length === 0) {
          alert('카페 검색 결과가 없습니다.');
          return;
        }

        setSearchResults(cafeResults);
        displayMarkers(cafeResults);
      } else {
        alert('검색 결과가 없습니다.');
      }
    });
  };

  // ✅ 검색된 카페들의 위치를 지도에 마커로 표시
  const displayMarkers = (places) => {
    if (!map) return;

    markers.forEach((marker) => marker.setMap(null)); // 기존 마커 삭제
    const newMarkers = [];
    const bounds = new kakao.maps.LatLngBounds(); // 지도 영역 객체

    places.forEach((place) => {
      const markerPosition = new kakao.maps.LatLng(place.y, place.x);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // ✅ 마커 지도에 추가
      marker.setMap(map);
      bounds.extend(markerPosition);

      // ✅ 마커 클릭 시 해당 위치로 이동 & 확대
      kakao.maps.event.addListener(marker, 'click', () => {
        map.setCenter(markerPosition);
        map.setLevel(2); // 🔥 해당 마커를 중심으로 확대
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    if (places.length === 1) {
      map.setCenter(new kakao.maps.LatLng(places[0].y, places[0].x));
      map.setLevel(3); // 기본 확대 레벨
    } else {
      map.setBounds(bounds); // 여러 개일 경우 모든 마커 포함하도록 지도 조정
    }
  };

  const getGooglePlaceDetails = (placeName, lat, lng) => {
    return new Promise((resolve, reject) => {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        location: new window.google.maps.LatLng(lat, lng),
        radius: 100,
        query: placeName,
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          const placeId = results[0].place_id;

          service.getDetails({ placeId }, (details, detailStatus) => {
            if (detailStatus === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(details);
            } else {
              reject('장소 상세 정보 조회 실패');
            }
          });
        } else {
          reject('장소 검색 실패');
        }
      });
    });
  };


  // ✅ DB에 카페 저장
  const saveCafeWithGoogleDetails = async (kakaoCafe) => {
    try {
      const googleDetails = await getGooglePlaceDetails(
        kakaoCafe.place_name,
        parseFloat(kakaoCafe.y),
        parseFloat(kakaoCafe.x)
      );

      const photoUrl =
        googleDetails.photos && googleDetails.photos.length > 0
          ? googleDetails.photos[0].getUrl({ maxWidth: 400 })
          : '정보 없음';

      const openingHours =
        googleDetails.opening_hours?.weekday_text?.length > 0
          ? googleDetails.opening_hours.weekday_text.join(', ')
          : '정보 없음';

      const website = googleDetails.website || '정보 없음';
      console.log("📦 구글 상세 정보:", googleDetails);

      await axios.post('http://localhost:8080/cafes', {
        kakaoPlaceId: kakaoCafe.id,
        cafeName: kakaoCafe.place_name,
        latitude: parseFloat(kakaoCafe.y),
        longitude: parseFloat(kakaoCafe.x),
        address: kakaoCafe.road_address_name || kakaoCafe.address_name,
        phoneNumber: kakaoCafe.phone || '정보 없음',
        websiteUrl: website,
        openingHours: openingHours,
        photoUrl: photoUrl,
      });


      alert(`${kakaoCafe.place_name} 저장 완료!`);
    } catch (error) {
      console.error('카페 저장 실패:', error);
      alert('카페 저장 중 오류가 발생했습니다.');
    }
  };


  return (
    <div>
      <h2>지도 기반 카페 검색</h2>
      <input
        type="text"
        placeholder="카페 이름을 입력하세요"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button onClick={searchCafesByKeyword}>🔍 검색</button>
      <button onClick={searchCafesByLocation}>📍 현재 지도 기준 검색</button>
      <div id="map" style={{ width: '100%', height: '500px', marginTop: '10px' }}></div>
      <ul>
        {searchResults.map((cafe) => (
          <li key={cafe.id}>
            {cafe.place_name} ({cafe.address_name})
            <button onClick={() => saveCafeWithGoogleDetails(cafe)}>DB 저장</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CafeAdd;
