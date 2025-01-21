/*global kakao*/
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BottomBar, Bookmark, CafeInformationDetail, TopBar } from "../components";
import "./CafeDetail.css";
import ImageCarousel from "./ImageCarousel";

const CafeDetail = () => {
  const { id } = useParams(); // 카페 id
  const [activeTab, setActiveTab] = useState("cafe-detail-info"); // 현재 활성화된 탭 관리  

  // 지도 관련 상태
  const [map, setMap] = useState(null);

  // 마커 이미지 설정
  const imageSrc = '/img/map-cafe.png';
  const imageSize = new kakao.maps.Size(17, 17);
  const imageOption = { offset: new kakao.maps.Point(5, 5) };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  // 카페의 위치 (예시 좌표)
  const cafeLocation = {
    lat: 37.321405,
    lng: 127.112799,
    name: "스테이 어도러블",
  };

  // Kakao 지도 초기화
  useEffect(() => {
    if (activeTab === "cafe-detail-info") {
      const container = document.getElementById("cafe-detail-map"); // 지도를 표시할 DOM
      const options = {
        center: new kakao.maps.LatLng(cafeLocation.lat, cafeLocation.lng), // 중심 좌표
        level: 3, // 지도 확대 레벨
      };

      // 지도 생성
      const kakaoMap = new kakao.maps.Map(container, options);
      setMap(kakaoMap); // 지도 상태 업데이트

      // 마커 생성
      const markerPosition = new kakao.maps.LatLng(cafeLocation.lat, cafeLocation.lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(kakaoMap); // 마커를 지도에 추가

      createCustomOverlay(kakaoMap, markerPosition, cafeLocation.name, cafeLocation.address);
    }
  }, [activeTab]); // 탭이 변경될 때마다 지도 초기화

  /* ---------- 지도 카페명 표시 CustomOverlay 생성  ---------- */
  const createCustomOverlay = (map, markerPosition, placeName) => {

    const content = document.createElement('div');
    content.className = 'label';
    content.innerText = placeName;

    const customOverlay = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
      yAnchor: -0.5,
    });

    customOverlay.setMap(map);
  };

  // 탭 클릭 핸들러
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="cafe-detail-page">
      {/* 상단 이미지 슬라이드 */}
      <div className="cafe-detail-image">
        <ImageCarousel />
      </div>

      {/* 카페 헤더 정보 */}
      <div className="cafe-detail-header">
        <div className="cafe-detail-header-text">
          <div className="cafe-detail-name">스테이 어도러블</div>
          <div className="cafe-detail-address">경기 용인시 기흥구 죽전로43번길 15-3 1층</div>
        </div>
        <Bookmark width="17px" height="31px" />
      </div>

      {/* 구분선 */}
      <div className="cafe-detail-divider"></div>

      <div className="cafe-info-title">카페 정보</div>
      <CafeInformationDetail />

      {/* 구분선 */}
      <div className="cafe-detail-divider"></div>

      {/* 탭 버튼 */}
      <div className="cafe-detail-tabs">
        <button
          className={`cafe-detail-tab ${activeTab === "cafe-detail-info" ? "active" : ""}`}
          onClick={() => handleTabClick("cafe-detail-info")}
        >
          상세 정보
        </button>
        <button
          className={`cafe-detail-tab ${activeTab === "cafe-detail-review" ? "active" : ""}`}
          onClick={() => handleTabClick("cafe-detail-review")}
        >
          리뷰
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="cafe-detail-tab-content">
        {activeTab === "cafe-detail-info" ? (
          <div>
            <div
              id="cafe-detail-map"
              style={{
                width: "330px",
                height: "170px",
                margin: "10px auto",
                border: "1px solid #ddd",
              }}
            ></div>
            <div className="cafe-detail-info-text">
              <div>
                <img src="/img/location.png" />
                <span>경기 용인시 기흥구 죽전로43번길 15-3 1층</span>
              </div>
              <div>
                <img src="/img/phone.png" />
                <span>0507-1318-2618</span>
              </div>
              <div>
                <img src="/img/link.png" />
                <a
                  href="http://www.instagram.com/cafe_stay_adorable"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://www.instagram.com/cafe_stay_adorable
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="cafe-detail-review">
            <p>리뷰</p>
          </div>
        )}
      </div>

      {/* 하단 바 */}
      <BottomBar />
    </div>
  );
};

export default CafeDetail;
