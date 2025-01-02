import React, { useState } from "react";
import "./VisitStatus.css"; // CSS 파일을 import

function VisitStatus({ onClick }) {
  const [isVisited, setIsVisited] = useState(false);

  // 버튼 클릭 시 상태 전환
  const toggleVisitStatus = () => {
    setIsVisited(!isVisited); // 방문 여부를 토글
    if (onClick) onClick(!isVisited); // 상태 변경 후 콜백 함수 호출
  };

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
      <button className={buttonClassName} onClick={toggleVisitStatus}>
        <img src={imageSrc} alt="Visit Status" className="visit-status-image" />
      </button>
    </div>
  );
}

export default VisitStatus;
