/*global kakao*/

import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomBar, TopBar, LocationReset, CafePopup, Popup } from '../components';
import './Home.css';
import AuthContext from '../context/AuthContext';

const Home = () => {
  /* ---------- 상태 관리 ---------- */
  const navigate = useNavigate();
  const location = useLocation();
  const [map, setMap] = useState(null);
  const [searchPlace, setSearchPlace] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ name: '', address: '', id: null });
  const [nickname, setNickname] = useState(localStorage.getItem("nickname") || ""); // 로그인된 사용자 닉네임
  const [email, setEmail] = useState(localStorage.getItem("email") || ""); // 로그인된 사용자 이메일
  const [searchResults, setSearchResults] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isFilterMode, setIsFilterMode] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [markers, setMarkers] = useState([]);  // 마커 저장
  const [overlays, setOverlays] = useState([]); // 오버레이 저장
  const [isBoundsApplied, setIsBoundsApplied] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");  // 팝업 메시지 상태 추가
  const [showFilterPopup, setShowFilterPopup] = useState(false);  // 필터링 실패 팝업 상태
  const { setUser } = useContext(AuthContext);  // AuthContext에서 setUser 가져오기
  const [cafeTags, setCafeTags] = useState([]);

  // 지도 사이즈 설정용
  const [innerWidth, setInnerWidth] = useState(window.innerWidth); // 화면 너비
  const [innerHeight, setInnerHeight] = useState(window.innerHeight); // 화면 높이

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
    const tokenFromUrl = params.get("token");

    if (nicknameFromUrl && emailFromUrl && tokenFromUrl) {
      localStorage.setItem("nickname", nicknameFromUrl);
      localStorage.setItem("email", emailFromUrl);
      localStorage.setItem("token", tokenFromUrl);

      // ✅ AuthContext의 setUser 호출하여 상태 업데이트
      setUser({ token: tokenFromUrl, nickname: nicknameFromUrl, email: emailFromUrl });

      // URL 정리 (상태 업데이트 후 실행)
      setTimeout(() => {
        window.history.replaceState({}, document.title, "/home");
      }, 100);
    }
  }, [location, setUser]);

  /* ---------- 초기 Kakao 지도 설정 ---------- */
  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        // 위치 기반 초기화
        navigator.geolocation.getCurrentPosition(
          (position) => {
            initializeMap(position.coords.latitude, position.coords.longitude);
          },
          () => {
            initializeMap(37.498095, 127.027610); // 강남역
          }
        );
      } else {
        // kakao가 아직 준비 안됐으면 재시도
        setTimeout(loadKakaoMap, 300);
      }
    };

    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeListener);

    loadKakaoMap();  // 💡 이거 한 줄로 처리

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
        `${process.env.REACT_APP_API_BASE_URL}/cafes/area?minLat=${bounds.minLat}&maxLat=${bounds.maxLat}&minLng=${bounds.minLng}&maxLng=${bounds.maxLng}`
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

  const filterMapping = {
    "가능(무료)": "가능_무료",
    "가능(유료)": "가능_유료",
    "가능(일부)": "가능_일부",
    "불가능": "불가능"
  };


  /* ---------- 필터링된 카페 조회 ---------- */
  const fetchFilteredCafes = async (filters) => {
    if (!filters || Object.keys(filters).length === 0) {
      setIsFilterMode(false);
      fetchCafesInArea();
      return;
    }

    // null 또는 빈 값이 있는 필터 제거
    const validFilters = Object.entries(filters).filter(([_, value]) => value);
    const tagNames = validFilters.map(([tag]) => tag);
    const values = validFilters.map(([_, value]) => filterMapping[value] || value); // 변환 적용

    // 필터가 없다면 기본 데이터 로드
    if (tagNames.length === 0) {
      setIsFilterMode(false);
      fetchCafesInArea();
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/cafes/filter?tagNames=${encodeURIComponent(tagNames.join(','))}&values=${encodeURIComponent(values.join(','))}`,
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

      if (data.length > 0) {
        setSearchResults(data);
        setIsFilterMode(true);
      } else {
        setPopupMessage("해당하는 카페가 없습니다.");  // 팝업 메시지 설정
        setShowFilterPopup(true);  // 필터링 실패 팝업 표시
      }
    } catch (error) {
      console.error("🚨 필터링된 카페 조회 중 오류 발생:", error);
    }
  };

  /* ---------- 지도 마커 및 오버레이 표시 ---------- */
  useEffect(() => {
    if (!map) return;

    const dataToShow = isSearchMode || isFilterMode ? searchResults : cafes;
    if (dataToShow.length === 0) return;

    // 기존 마커 및 오버레이 삭제
    markers.forEach(marker => marker.setMap(null));
    overlays.forEach(overlay => overlay.setMap(null));

    const newMarkers = [];
    const newOverlays = [];
    const bounds = new kakao.maps.LatLngBounds(); // 지도 영역 설정

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
      const overlay = createCustomOverlay(markerPosition, cafe);
      newOverlays.push(overlay);

      kakao.maps.event.addListener(marker, "click", () => {
        const thumbnail = cafe.thumbnailImageUrl || null;

        setPopupContent({ name: cafe.cafeName, address: cafe.address, id: cafe.cafeId, thumbnailUrl: thumbnail, });
        setShowPopup(true);

        if (map) {
          map.setLevel(3);
          map.setCenter(markerPosition);
        }
      });
    });

    // 기존 마커 및 오버레이 상태 업데이트
    setMarkers(newMarkers);
    setOverlays(newOverlays);

    // 검색 결과가 하나면 중심 이동, 여러 개면 바운더리 조절 (확대 렙레)
    if (dataToShow.length === 1) {
      map.setCenter(new kakao.maps.LatLng(dataToShow[0].latitude, dataToShow[0].longitude));
    } else {
      if (!isBoundsApplied && (isSearchMode || isFilterMode)) {
        map.setBounds(bounds);
        setIsBoundsApplied(true);
      }
    }
  }, [map, searchResults, cafes, isSearchMode, isFilterMode, selectedFilters]);

  useEffect(() => {
    if (!map) return;

    kakao.maps.event.addListener(map, "zoom_changed", () => {
      setIsBoundsApplied(true);  // 사용자가 직접 줌을 조절하면 자동 조정 방지
    });

    return () => kakao.maps.event.removeListener(map, "zoom_changed", () => {
      setIsBoundsApplied(true);
    });
  }, [map]);

  /* ---------- 검색 결과 반영 ---------- */
  useEffect(() => {
    if (location.state?.results && location.state.results.length > 0) { // place가 여러 개인 경우
      setSearchResults(location.state.results);
      setIsSearchMode(true);
    } else if (location.state?.place) { // place가 1개인 경우
      setSearchResults([location.state.place]); // place를 배열로 설정
      setIsSearchMode(true);
    } else {
      setIsSearchMode(false);
    }

    // 새로고침 시 location.state 제거
    window.history.replaceState(null, '', location.pathname);
    // 검색어 유지
    if (location.state?.searchTerm) {
      setSearchPlace(location.state.searchTerm);
    }
  }, [location.state, map]);


  /* ---------- 지도 이동 후 카페 자동 로딩 ---------- */
  useEffect(() => {
    if (!map || isSearchMode || isFilterMode) return; // 검색 모드 & 필터 모드에서는 실행 안 함
    fetchCafesInArea(); // 초기 실행

    // 지도 이동이 멈춘 후에만 fetchCafesInArea 실행
    const idleListener = kakao.maps.event.addListener(map, "idle", fetchCafesInArea);

    return () => kakao.maps.event.removeListener(map, "idle", idleListener);
  }, [map, isSearchMode, isFilterMode, selectedFilters, fetchCafesInArea]);


  /* ---------- 필터 변경 시 필터링된 카페 조회 ---------- */
  useEffect(() => {
    // 필터가 적용되었는지 여부 체크
    const hasFilters = Object.keys(selectedFilters).length > 0;
    setIsFilterMode(hasFilters);
    fetchFilteredCafes(selectedFilters);
  }, [selectedFilters]);


  /* ---------- 지도 카페명 표시 CustomOverlay 생성  ---------- */
  const createCustomOverlay = (markerPosition, cafe) => {
    const { cafeName, address: cafeAddress, cafeId, imageUrls } = cafe;
    const thumbnailUrl = cafe.thumbnailImageUrl || null;

    const content = document.createElement('div');
    content.className = 'label';
    content.innerText = cafeName;
    content.style.cursor = 'pointer';

    // 라벨 클릭 이벤트 - CafePopup 뜸
    content.addEventListener('click', () => {
      setPopupContent({
        name: cafeName,
        address: cafeAddress,
        id: cafeId,
        thumbnailUrl
      });
      setShowPopup(true);
      fetchCafeTags(cafeId);

      if (map) {
        map.setLevel(3);
        map.setCenter(markerPosition);
      }
    });

    const customOverlay = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
      yAnchor: -0.5,
    });

    customOverlay.setMap(map);
    return customOverlay;
  };

  /* ---------- 카페 태그 가져오기 ---------- */
  const fetchCafeTags = async (cafeId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cafes/${cafeId}`);
      if (!response.ok) {
        throw new Error("태그 데이터를 불러오는 중 오류 발생");
      }
      const data = await response.json();
      setCafeTags(data);
    } catch (error) {
      console.error("태그 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  /* ---------- 현재 위치로 지도 중심 이동 ---------- */
  const moveToUserLocation = () => {
    if (navigator.geolocation && map) {
      try {
        let called = false; // 콜백 호출 여부 추적

        navigator.geolocation.getCurrentPosition(
          (position) => {
            called = true;

            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const userLocation = new kakao.maps.LatLng(userLat, userLng);
            map.setCenter(userLocation);
          },
          (error) => {
            called = true;
            console.error("[❌ 위치 오류 발생]", error);
            alert(`위치 정보를 가져오지 못했습니다: ${error.message}`);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );

        setTimeout(() => {
          if (!called) {
            console.warn("🚨 getCurrentPosition 콜백이 호출되지 않았습니다.");
          }
        }, 6000);
      } catch (e) {
        console.error("[❌ geolocation try-catch 예외]", e);
      }
    } else {
      console.error("[❌ geolocation 미지원 or map 없음]");
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
            thumbnailUrl={popupContent.thumbnailUrl}
            onClose={() => setShowPopup(false)}
          />}

        {/* ❗ 필터링된 결과가 없을 때 팝업 표시 */}
        {showFilterPopup && (
          <Popup
            message={popupMessage}
            onConfirm={() => {
              setShowFilterPopup(false);
              fetchCafesInArea(); // 기본 데이터 다시 로드
            }}
            showCancel={false}
          />
        )}
      </div>
      <BottomBar />
    </>
  );
};

export default Home;