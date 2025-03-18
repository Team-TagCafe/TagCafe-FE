import React, { useState, useEffect } from "react";
import "./Bookmark.css";

function Bookmark({ onClick, width = "24px", height = "50px", isSaved = false}) {
  const [isBookmarked, setIsBookmarked] = useState(isSaved);

  useEffect(() => {
    setIsBookmarked(isSaved);
  }, [isSaved]);

  const toggleBookmarkStatus = async () => {
    if (!onClick) return; // API 요청 없으면 실행X (비로그인시 북마크 변경되지 않도록함)

    try {
      const newStatus = await onClick(!isBookmarked);
      setIsBookmarked(newStatus);
    } catch (error) {
      console.error("북마크 상태 변경 실패:", error);
    }

  };

  const buttonClassName = isBookmarked
    ? "bookmark bookmarked"
    : "bookmark default";

  const imageSrc = isBookmarked
    ? "/img/bookmark_pressed.png"
    : "/img/bookmark_default.png";

    return (
      <div className="bookmark-container">
        <div className="bookmark-button">
          <button className={buttonClassName} onClick={toggleBookmarkStatus}>
            <img
              src={imageSrc}
              alt="Bookmark Status"
              className="bookmark-image"
              style={{ width, height }}
            />
          </button>
        </div>
      </div>
    );
  }

export default Bookmark;