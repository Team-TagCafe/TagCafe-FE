import React, { useState } from "react";
import "./Bookmark.css"; // CSS 파일을 import

function Bookmark({ onClick }) {
  // 북마크 상태를 관리하는 useState 훅 사용, 초기값은 false (북마크되지 않음)
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 북마크 버튼 클릭 시 상태를 토글하는 함수
  const toggleBookmarkStatus = () => {
    setIsBookmarked(!isBookmarked); // 상태를 반전 (true <-> false)
    if (onClick) onClick(!isBookmarked); // 상태가 변경된 후 onClick 콜백 호출
  };

  // 현재 상태에 따라 버튼에 적용할 CSS 클래스 이름 설정
  const buttonClassName = isBookmarked
    ? "bookmark bookmarked" // 북마크된 상태
    : "bookmark default"; // 기본 상태 (북마크 안 됨)

  // 현재 상태에 따라 버튼에 표시할 이미지 경로 설정
  const imageSrc = isBookmarked
    ? "/img/bookmark_pressed.png" // 북마크된 상태
    : "/img/bookmark_default.png"; // 기본 상태 (북마크 안 됨)

  // JSX 반환: 버튼 클릭 시 toggleBookmarkStatus 함수 호출
  return (
    <div className="bookmark-container">
      <button className={buttonClassName} onClick={toggleBookmarkStatus}>
        <img src={imageSrc} alt="Bookmark Status" className="bookmark-image" />
      </button>
    </div>
  );
}

export default Bookmark;