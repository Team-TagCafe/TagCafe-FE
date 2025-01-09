import React, { useState } from "react";
import "./ReviewStar.css"; // CSS 파일을 import

function ReviewStar({ onClick }) {
  const [isStarred, setIsStarred] = useState(false);

  // 버튼 클릭 시 상태 전환
  const toggleStarStatus = () => {
    setIsStarred(!isStarred); // 리뷰 스타 여부를 토글
    if (onClick) onClick(!isStarred); // 상태 변경 후 콜백 함수 호출
  };

  // 동적 클래스 설정
  const buttonClassName = isStarred
    ? "review-star starred"
    : "review-star default";

  // 동적 이미지 경로 설정
  const imageSrc = isStarred
    ? "/img/star_full.png" // 스타가 활성화된 상태
    : "/img/star_default.png"; // 기본 상태 (스타 비활성화)

  return (
    <div className="review-star-container">
      <button className={buttonClassName} onClick={toggleStarStatus}>
        <img src={imageSrc} alt="Review Star Status" className="review-star-image" />
      </button>
    </div>
  );
}

export default ReviewStar;
