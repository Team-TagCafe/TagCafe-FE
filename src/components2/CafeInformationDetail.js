import React, { useState } from "react";
import "./CafeInformationDetail.css";

function CafeInformationDetail() {
  const [isHoursOpen, setIsHoursOpen] = useState(false); // 운영시간 토글 상태

  // 운영시간 데이터
  const operatingHours = {
    목: "9:00 ~ 21:00",
    금: "9:00 ~ 21:00",
    토: "10:00 ~ 13:00",
    일: "10:00 ~ 13:00",
    월: "9:00 ~ 21:00",
    화: "9:00 ~ 21:00",
    수: "9:00 ~ 21:00",
  };

  // 카페 정보 데이터
  const cafeDetails = [
    { icon: "/img/wifi.png", label: "와이파이", value: "빠름" },
    { icon: "/img/plug.png", label: "콘센트", value: "일부" },
    { icon: "/img/desk.png", label: "책상", value: "적당함" },
    { icon: "/img/toilet.png", label: "화장실", value: "외부" },
    { icon: "/img/park.png", label: "주차", value: "가능(무료)" },
  ];

  const updatedTime = "2024년 12월 30일 오전 12:53 업데이트";


  return (
    <div className="cafe-information-detail">
      {/* 운영시간 */}
      <div className="cafe-information-detail__header">
        <img
          src="/img/clock.png"
          alt="운영시간"
          className="cafe-information-detail__icon"
        />
        <div className="cafe-information-detail__label">운영시간</div>
        <div className="cafe-information-detail__value">영업 중 21:00 까지</div>
        <img
          src={isHoursOpen ? "/img/toggle-up.png" : "/img/toggle-down.png"}
          alt="Toggle"
          className="cafe-information-detail__toggle"
          onClick={() => setIsHoursOpen(!isHoursOpen)}
        />
      </div>
      {isHoursOpen && (
        <div className="cafe-information-detail__dropdown">
          {Object.entries(operatingHours).map(([day, time]) => (
            <div key={day} className="cafe-information-detail__dropdown-item">
              {day} {time}
            </div>
          ))}
        </div>
      )}

      {/* 카페 세부 정보 */}
      {cafeDetails.map((detail) => (
        <div key={detail.label} className="cafe-information-detail__group">
          <img
            src={detail.icon}
            alt={detail.label}
            className="cafe-information-detail__icon"
          />
          <div className="cafe-information-detail__label">{detail.label}</div>
          <div className="cafe-information-detail__value">{detail.value}</div>
        </div>
      ))}

      {/* 업데이트 시간 */}
      <div className="cafe-information-detail__updated">{updatedTime}</div>
    </div>
  );
}

export default CafeInformationDetail;