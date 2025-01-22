/*global kakao*/
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomBar, Bookmark, CafeInformationDetail, TopBar } from "../components";
import "./CafeDetail.css";
import ImageCarousel from "./ImageCarousel";
import DetailReviewCard from "./DetailReviewCard";

const CafeDetail = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { id } = useParams(); // 카페 id
  const [activeTab, setActiveTab] = useState("cafe-detail-info"); // 현재 활성화된 탭 관리  

  // 뒤로가기 핸들러
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleWriteReviewClick = () => {
    navigate(`/cafe/${id}/review-write`); // Dynamically include the cafe id in the URL
  };

  const [reviews, setReviews] = useState([
    {
      userName: "커피스터디",
      date: "12.20 금",
      rating: 4,
      content: "카페가 조용하고 공부하기 좋습니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
    },
    {
      userName: "음료러버",
      date: "12.22 일",
      rating: 5,
      content: "음료가 정말 맛있고 분위기가 너무 좋아요!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
    },
    {
      userName: "공부러버",
      date: "12.25 수",
      rating: 4.5,
      content: "조용하고 공부하기 좋았습니다. 추천합니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
    },
  ]);

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

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

  useEffect(() => {
    if (activeTab !== "cafe-detail-info") {
      return; // activeTab이 "cafe-detail-info"가 아니면 아무 작업도 하지 않음
    }

    const container = document.getElementById("cafe-detail-map");

    // 이미 초기화된 지도 삭제 후 새로 초기화
    if (map) {
      map.relayout(); // 지도 크기 재조정
      map.setCenter(new kakao.maps.LatLng(cafeLocation.lat, cafeLocation.lng)); // 중심 좌표 재설정
      return; // 기존 지도를 재활용하므로 새로 생성하지 않음
    }

    const options = {
      center: new kakao.maps.LatLng(cafeLocation.lat, cafeLocation.lng),
      level: 3,
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);

    const markerPosition = new kakao.maps.LatLng(cafeLocation.lat, cafeLocation.lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(kakaoMap);

    createCustomOverlay(kakaoMap, markerPosition, cafeLocation.name, cafeLocation.address);
  }, [activeTab]); // `activeTab`에 따라 업데이트  


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
      {/* 뒤로가기 버튼 */}
      <div className="cafe-detail-back-button" onClick={handleBackClick}>
        <img src="/img/back-button.png" alt="뒤로가기" />
      </div>
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
        {activeTab === "cafe-detail-info" && (
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
        )}
        {activeTab === "cafe-detail-review" && (
          <div className="cafe-detail-review-content">
            <div className="cafe-detail-review-header">

              <div className="cafe-detail-review-rating">
                <img
                  src="/img/star_full.png"
                  alt="Star Icon"
                  className="cafe-detail-review-star"
                /> 
                <div className="cafe-detail-review-score">{averageRating.toFixed(2)}</div>
                <div className="cafe-detail-review-text">{reviews.length}개 리뷰</div>
              </div>
              <button className="cafe-detail-review-write-btn"
               onClick={handleWriteReviewClick}
               >리뷰쓰기</button>
            </div>
            <div className="cafe-detail-review-cards">
              {reviews.map((review, index) => (
                <DetailReviewCard key={index} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>




      {/* 하단 바 */}
      <BottomBar />
    </div>
  );
};

export default CafeDetail;
