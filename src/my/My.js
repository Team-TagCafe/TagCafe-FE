import React, { useState } from "react";
import { BottomBar, TopBar } from '../components';
import CafeCard from "./CafeCard"; 
import './My.css';

const My = () => {
  const [activeTab, setActiveTab] = useState("reviewedCafes"); 
  
  const reviewedCafes = [
    {
      name: "스테이 어도러블",
      date: "12.20 금",
      rating: 4,
      description: "카페가 조용하고 공부하기 좋습니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      image: "/img/cafe-img.png",
    },

    {
      name: "스테이 어도러블",
      date: "12.20 금",
      rating: 4,
      description: "카페가 조용하고 공부하기 좋습니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      image: "/img/cafe-img.png",
    },

    {
      name: "스테이 어도러블",
      date: "12.20 금",
      rating: 4,
      description: "카페가 조용하고 공부하기 좋습니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      image: "/img/cafe-img.png",
    },
    {
      name: "스테이 어도러블",
      date: "12.20 금",
      rating: 4,
      description: "카페가 조용하고 공부하기 좋습니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      image: "/img/cafe-img.png",
    },
    {
      name: "스테이 어도러블",
      date: "12.20 금",
      rating: 4,
      description: "카페가 조용하고 공부하기 좋습니다!",
      tags: ["와이파이 빠름", "콘센트 일부", "책상 적당함", "화장실 외부", "주차 가능(무료)"],
      image: "/img/cafe-img.png",
    }
  ];

  const reportedCafes = [
    {
      name: "카페 이름 1",
      date: "12.19 목",
      rating: null,
      description: "테이블이 부족하고 관리가 잘 안되어 있습니다.",
      tags: ["와이파이 없음", "콘센트 없음", "책상 좁음"],
      image: "/img/cafe-img.png",
    }
  ];


  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
          <div className="cafe-list">
            <p className="cafe-count">총 {reviewedCafes.length}개</p>
            {reviewedCafes.map((cafe, index) => (
              <CafeCard key={index} cafe={cafe} />
            ))}
          </div>
        ) : (
          <div className="cafe-list">
            <p className="cafe-count">총 {reportedCafes.length}개</p>
            {reportedCafes.map((cafe, index) => (
              <CafeCard key={index} cafe={cafe} />
            ))}
          </div>
        )}
      </div>

      <BottomBar />
    </div>

  );
};

export default My;
