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
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [filters, setFilters] = useState({});
  const [reportedCafes, setReportedCafes] = useState([]);

  const userEmail = localStorage.getItem("email");
  const token= localStorage.getItem("token");

useEffect(() => {
  if (!userEmail) return;

  const fetchReviewedCafes = async () => {
    setLoading(true);
    try {
      let url = new URL(`http://localhost:8080/my/reviews`);
      url.searchParams.append("userEmail", userEmail);

      const tagNames = [];
      const values = [];
      Object.entries(filters).forEach(([tag, value]) => {
        if (value) {
          tagNames.push(tag);
          values.push(value);
        }
      });

      // 필터가 있을 때만 필터링 엔드포인트 사용
      if (tagNames.length > 0) {
        url = new URL(`http://localhost:8080/my/reviews/filter`);
        url.searchParams.append("userEmail", userEmail);

        tagNames.forEach(tag => url.searchParams.append("tags", tag));
        values.forEach(value => url.searchParams.append("values", value));
      }

      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error(`Failed to fetch reviews, status: ${response.status}`);

      const data = await response.json();
      setReviewedCafes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchReviewedCafes();
  const fetchReportedCafes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/report/user/${userEmail}`);
      if (!response.ok) throw new Error("제보한 카페 조회 실패");
      const data = await response.json();
      setReportedCafes(data);
    } catch (error) {
      console.error("제보한 카페 조회 중 오류:", error);
    }
  };
  fetchReportedCafes();
}, [userEmail, filters]); // filters 변경 시 데이터 다시 로드


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const handleFilterChange = (tag, value) => {
    setFilters((prevFilters) => {
      const tagIndex = prevFilters.tagNames.indexOf(tag);
      let newTagNames = [...prevFilters.tagNames];
      let newValues = [...prevFilters.values];

      if (tagIndex === -1) {
        newTagNames.push(tag);
        newValues.push(value);
      } else {
        newTagNames.splice(tagIndex, 1);
        newValues.splice(tagIndex, 1);
      }

      return { tagNames: newTagNames, values: newValues };
    });
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
    <TopBar
      title="# My"
      showSearch
      showTags
      onSearchPlaceChange={() => {}}
      onFilterChange={setFilters} 
    />

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
          onClick={() => {
            if (!userEmail) {
              setShowLoginPopup(true);
              return;
            }
            navigate("/my/report/add");
          }}
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
          {reportedCafes.map((cafe, index) => (
            <ReportCafeCard key={index} cafe={cafe} />
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
    {showLoginPopup && (
      <Popup
        message="로그인이 필요합니다."
        onConfirm={() => setShowLoginPopup(false)}
        showCancel={false}
      />
    )}

    <BottomBar />
  </div>

  );
};

export default My;
