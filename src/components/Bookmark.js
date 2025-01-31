import React, { useState, useEffect } from "react";
import "./Bookmark.css";

function Bookmark({ onClick, width = "24px", height = "50px", isSaved = false}) {
  const [isBookmarked, setIsBookmarked] = useState(isSaved);

  useEffect(() => {
    setIsBookmarked(isSaved);
  }, [isSaved]);

  const toggleBookmarkStatus = () => {
    setIsBookmarked(!isBookmarked);
    if (onClick) onClick(!isBookmarked);
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