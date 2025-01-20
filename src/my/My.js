import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomBar, TopBar } from '../components';
import CafeCard from "./CafeCard"; 
import ReportCafeCard from "./ReportCafeCard";
import './My.css';

const My = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reviewedCafes"); 
  const [expandedCafes, setExpandedCafes] = useState([]);
  const [reviewedCafes, setReviewedCafes] = useState([
    { 
      cafeId :1,
      name: "스테이 어도러블",
      date: "12.20 금",
      rating: 4,
      description: "카페가 조용하고 공부하기 좋습니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      image: "/img/cafe-img.png",
    },

    {
      cafeId :2,
      name: "스테이 어도러블",
      date: "12.20 금",
      rating: 4,
      description: "카페가 조용하고 공부하기 좋습니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      image: "/img/cafe-img.png",
    },

    {
      cafeId :3,
      name: "스테이 어도러블",
      date: "12.20 금",
      rating: 4,
      description: "카페가 조용하고 공부하기 좋습니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      image: "/img/cafe-img.png",
    },
    {
      cafeId :4,
      name: "스테이 어도러블",
      date: "12.20 금",
      rating: 4,
      description: "카페가 조용하고 공부하기 좋습니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      image: "/img/cafe-img.png",
    },
    {
      cafeId :5,
      name: "스테이 어도러블",
      date: "12.20 금",
      rating: 4,
      description: "카페가 조용하고 공부하기 좋습니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      image: "/img/cafe-img.png",
    }
  ]);

  const [reportedCafes, setReportedCafes] = useState([
    {
      id: 1,
      name: "스테이 어도러블",
      address: "경기 용인시 기흥구 죽전로43번길 15-3 (보정동)",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      description: "카페가 조용하고 공부하기 좋습니다!",
    },
    {
      id: 2,
      name: "스테이 어도러블",
      address: "경기 용인시 기흥구 죽전로43번길 15-3 (보정동)",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      description: "카페가 조용하고 공부하기 좋습니다!"
    },
  ]);

  const toggleCafe = (id) => {
    setExpandedCafes((prev) =>
      prev.includes(id) ? prev.filter((cafeId) => cafeId !== id) : [...prev, id]
    );
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteConfirmed = (cafeId, tab) => {
    if (tab === "reviewedCafes") {
      setReviewedCafes((prevCafes) => prevCafes.filter((cafe) => cafe.id !== cafeId));
    } else if (tab === "reportedCafes") {
      setReportedCafes((prevCafes) => prevCafes.filter((cafe) => cafe.id !== cafeId));
    }
  };

  const handleEdit=(cafeId)=>{
    navigate(`/my/review/edit/${cafeId}`);
  };

  return (
    <div className="my-page">
      <TopBar title="# My" showSearch showTags onSearchPlaceChange/>
      
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
      </div>

      {/* 탭 내용 */}
      <div className="my-content">
        {activeTab === "reviewedCafes" ? (
          <div className="review-cafe-list">
            <p className="cafe-count">총 {reviewedCafes.length}개</p>
            {reviewedCafes.map((cafe, index) => (
              <CafeCard key={index} cafe={cafe} onDeleteConfirmed={(id) => handleDeleteConfirmed(id, "reviewedCafes")}
                onEdit={handleEdit}/>
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

      <BottomBar />
    </div>

  );
};

export default My;
