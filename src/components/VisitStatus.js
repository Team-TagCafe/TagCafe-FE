import React from "react";
import "./VisitStatus.css";

function VisitStatus({ isVisited, onClick }) {
  // 동적 클래스 설정
  const buttonClassName = isVisited
    ? "visit-status visited"
    : "visit-status default";

  // 동적 이미지 경로 설정
  const imageSrc = isVisited
    ? "/img/visitStatus_pressed.png" // 방문 상태
    : "/img/visitStatus_default.png"; // 기본 상태 (방문X)

  return (
    <div className="visit-status-container">
      <button className={buttonClassName} onClick={onClick}>
        <img src={imageSrc} alt="Visit Status" className="visit-status-image" />
      </button>
    </div>
  );
}

export default VisitStatus;
