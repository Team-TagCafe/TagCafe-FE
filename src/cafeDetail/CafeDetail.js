/*global kakao*/
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomBar, Bookmark, CafeInformationDetail, Popup } from "../components";
import "./CafeDetail.css";
import ImageCarousel from "./ImageCarousel";
import DetailReviewCard from "./DetailReviewCard";


const CafeDetail = () => {
  const navigate = useNavigate();
  const { id: cafeId } = useParams(); // 카페 id
  const [activeTab, setActiveTab] = useState("cafe-detail-info"); // 현재 활성화된 탭 관리  
  const [cafe, setCafe] = useState(null);
  const [map, setMap] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const userEmail = localStorage.getItem("email");
  const [reviews, setReviews] = useState([]);

  // 카페 정보 가져오기
  useEffect(() => {
    const fetchCafeData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/cafes/${cafeId}`);
        if (!response.ok) throw new Error("Failed to fetch cafe data");

        const data = await response.json();
        setCafe(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCafeData();
  }, [cafeId, setCafe]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
          return;
        }

        // userId 가져오기
        const response = await fetch(`http://localhost:8080/users/id?email=${storedEmail}`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch user ID");

        const userId = await response.json();
        setUserId(userId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserId();
  }, []);

  // 카페 저장 여부 확인
  useEffect(() => {
    if (!userId) return;

    const checkSavedCafe = async () => {
      try {
        const response = await fetch(`http://localhost:8080/saved-cafes?userId=${userId}`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch saved cafes");

        const savedCafes = await response.json();
        const isCafeSaved = savedCafes.some((saved) => saved.cafeId === Number(cafeId));
        setIsSaved(isCafeSaved);
      } catch (error) {
        console.error(error);
      }
    };

    checkSavedCafe();
  }, [userId, cafeId]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // 카페 저장 여부 토글 핸들러
  const handleBookmarkClick = async () => {
    if (!userId) {
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/saved-cafes/${cafeId}?userId=${userId}`, {
        method: "PATCH",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to toggle visited status");

      const isCafeSaved = await response.json();
      setIsSaved(isCafeSaved);
    } catch (error) {
      console.error(error);
    }
  };

  // 뒤로가기 핸들러
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleWriteReviewClick = () => {
    if (!userEmail) {
      setShowLoginPopup(true);
      return; // Prevents navigation
    }
    navigate(`/cafe/${cafeId}/review-write`, { state: { cafe } });
  };

  // 리뷰 불러오기
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reviews/${cafeId}`);
      if (!response.ok) {
        throw new Error("리뷰 데이터를 불러오지 못했습니다.");
      }

      const data = await response.json();
      console.log("🔍 백엔드 응답 데이터:", data);

      const processed = data.map((review) => {
        const [year, month, day, hour, minute, second] = review.createdAt;
        const dateObj = new Date(year, month - 1, day, hour, minute, second);
        const rawDate = dateObj.toLocaleDateString("ko-KR", {
          month: "numeric",
          day: "numeric",
          weekday: "short",
        }); // 예: "3. 23. 토"

        const formattedDate = rawDate.replace(/\./g, '').replace(/ /g, '.').replace(/\.(?=[^\.]*$)/, ' ');

        return {
          userName: review.userEmail.split("@")[0],
          date: formattedDate,
          ...review,
        };
      });

      setReviews(processed);
    } catch (error) {
      console.error(error);
    }
  };

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  useEffect(() => {
    fetchReviews();
  }, [activeTab, cafeId]);

  // 마커 이미지 설정
  const imageSrc = '/img/map-cafe.png';
  const imageSize = new kakao.maps.Size(17, 17);
  const imageOption = { offset: new kakao.maps.Point(5, 5) };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  useEffect(() => {
    if (activeTab !== "cafe-detail-info" || !cafe) {
      setMap(null);
      return; // activeTab이 "cafe-detail-info"가 아니면 아무 작업도 하지 않음
    }

    const container = document.getElementById("cafe-detail-map");

    // 이미 초기화된 지도 삭제 후 새로 초기화
    if (map) {
      map.relayout(); // 지도 크기 재조정
      map.setCenter(new kakao.maps.LatLng(cafe.latitude, cafe.longitude)); // 중심 좌표 재설정
      return; // 기존 지도를 재활용하므로 새로 생성하지 않음
    }

    const options = {
      center: new kakao.maps.LatLng(cafe.latitude, cafe.longitude),
      level: 3,
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);

    const markerPosition = new kakao.maps.LatLng(cafe.latitude, cafe.longitude);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(kakaoMap);

    createCustomOverlay(kakaoMap, markerPosition, cafe.cafeName, cafe.address);
  }, [activeTab, cafe]); // `activeTab`에 따라 업데이트  

  if (!cafe) return <div>카페 정보를 찾을 수 없습니다.</div>;


  /* ---------- 지도 카페명 표시 CustomOverlay 생성  ---------- */
  const createCustomOverlay = (map, markerPosition, cafeName) => {

    const content = document.createElement('div');
    content.className = 'label';
    content.innerText = cafeName;

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
      {showLoginPopup && (
        <Popup
          message="로그인이 필요합니다"
          onConfirm={() => setShowLoginPopup(false)}
          showCancel={false}
        />
      )}
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
          <div className="cafe-detail-name">{cafe.cafeName}</div>
          <div className="cafe-detail-address">{cafe.address}</div>
        </div>
        <Bookmark
          width="17px"
          height="31px"
          isSaved={isSaved}
          onClick={handleBookmarkClick}
        />
      </div>

      {/* 구분선 */}
      <div className="cafe-detail-divider"></div>

      <div className="cafe-info-title">카페 정보</div>
      <CafeInformationDetail cafeId={cafeId} />

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
                <span>{cafe.address}</span>
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
                <div className="cafe-detail-review-score">
                  {cafe?.averageRating?.toFixed(2) ?? "0.00"}
                </div>
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

        {/* 비로그인 상태에서 저장버튼 눌렀을 때 팝업 */}
        {showPopup && (
          <Popup
            message="로그인이 필요합니다."
            onConfirm={handleClosePopup}
            showCancel={false}
          />
        )}
      </div>
      <BottomBar />
    </div>
  );
};

export default CafeDetail;
