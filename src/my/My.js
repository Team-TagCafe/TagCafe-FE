import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BottomBar, TopBar } from '../components';
import ReviewCafeCard from "./ReviewCafeCard"; 
import ReportCafeCard from "./ReportCafeCard";
import Popup from "../components/Popup";
import './My.css';

const My = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reviewedCafes"); 
  const [reviewedCafes, setReviewedCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [reportedCafes, setReportedCafes] = useState([
    {
      id: 1,
      name: "스테이 어도러블",
      address: "경기 용인시 기흥구 죽전로43번길 15-3 (보정동)",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      description: "카페가 조용하고 공부하기 좋습니다!",
      status: "wait", 
    },
    {
      id: 2,
      name: "카페 테라스",
      address: "서울 강남구 테헤란로 123",
      tags: ["와이파이 느림", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      description: "테라스가 멋진 카페입니다.",
      status: "accepted", 
    },
    {
      id: 3,
      name: "조용한 카페",
      address: "서울 송파구 방이동 45-6",
      tags: ["와이파이 없음", "콘센트 없음", "책상 좁음", "화장실 외부", "주차 불가능"],
      description: "조용히 책 읽기 좋은 카페입니다.",
      status: "denied", 
    },
  ]);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");
    
    if (!userEmail) return; // userEmail이 없으면 요청하지 않음
  
    fetch(`http://localhost:8080/my/reviews?userEmail=${encodeURIComponent(userEmail)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        //console.log("받은 리뷰 데이터:", data); 
        setReviewedCafes(data || []); // 데이터가 없을 경우 빈 배열 설정
      })
      .catch((error) => {
        console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
        setReviewedCafes([]); // 오류 발생 시에도 빈 배열로 설정
      });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDelete = async (reviewId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/my/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        alert("해당 리뷰가 존재하지 않습니다.");
        return;
      }

      if (!response.ok) throw new Error("Failed to delete review");

      setShowDeletePopup(true);
      setReviewedCafes((prevCafes) => prevCafes.filter((cafe) => cafe.reviewId !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("리뷰 삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reviewId) => {
    if (!reviewId) {
      console.error("잘못된 reviewId:", reviewId);
      return;
    }
    navigate(`/my/review/edit/${reviewId}`);
  };

  return (
  <div className="my-page">
    <TopBar title="# My" showSearch showTags onSearchPlaceChange />

    <div className="my-tabs">
      <button
        className={`my-tab ${activeTab === "reviewedCafes" ? "active" : ""}`}
        onClick={() => handleTabClick("reviewedCafes")}
      >
        리뷰한 카페
      </button>
      <button
        className={`my-tab ${activeTab === "reportedCafes" ? "active" : ""}`}
        onClick={() => handleTabClick("reportedCafes")}
      >
        제보한 카페
      </button>
      {activeTab === "reportedCafes" && (
        <button
          className="report-cafe-plus-button"
          onClick={() => navigate("/my/report/add")}
        >
          <img src="/img/plus.png" alt="추가버튼" />
        </button>
      )}
    </div>

    {/* 탭 내용 */}
    <div className="my-content">
      {activeTab === "reviewedCafes" ? (
        <div className="review-cafe-list">
          <p className="cafe-count">총 {reviewedCafes.length}개</p>
          {reviewedCafes.map((cafe, index) => (
            <ReviewCafeCard
              key={index}
              cafe={cafe}
              onDeleteConfirmed={() => handleDelete(cafe.reviewId)}
              onEdit={() => handleEdit(cafe.reviewId)}
            />
          ))}
        </div>
      ) : (
        <div className="report-cafe-list">
          <p className="cafe-count">총 {reportedCafes.length}개</p>
          {reportedCafes.map((cafe) => (
            <ReportCafeCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      )}
    </div>

    {showDeletePopup && (
      <Popup
          message="리뷰가 삭제되었습니다."
          onConfirm={() => setShowDeletePopup(false)}
          showCancel={false}
      />
    )}

    <BottomBar />
  </div>

  );
};

export default My;
