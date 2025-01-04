import React, { useState } from "react";
import "./Bookmark.css"; // CSS 파일을 import

function Bookmark({ onClick }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 버튼 클릭 시 상태 전환
  const toggleBookmarkStatus = () => {
    setIsBookmarked(!isBookmarked); // 북마크 여부를 토글
    if (onClick) onClick(!isBookmarked); // 상태 변경 후 콜백 함수 호출
  };

  // 동적 클래스 설정
  const buttonClassName = isBookmarked
    ? "bookmark bookmarked"
    : "bookmark default";

  // 동적 이미지 경로 설정
  const imageSrc = isBookmarked
    ? "/img/bookmark_pressed.png" // 북마크된 상태
    : "/img/bookmark_default.png"; // 기본 상태 (북마크 안 됨)

  return (
    <div className="bookmark-container">
      <button className={buttonClassName} onClick={toggleBookmarkStatus}>
        <img src={imageSrc} alt="Bookmark Status" className="bookmark-image" />
      </button>
    </div>
  );
}

export default Bookmark;
