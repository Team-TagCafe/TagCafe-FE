import React from 'react';
import "./ReviewTag.css";

function ReviewTag({ tagText = "review tag", iconSrc = null }) {
  return (
    <div className="review-tag-container">
      <button className="review-tag">
        {iconSrc && <img src={iconSrc} alt="icon" className="review-tag-icon" />}
        <span className="review-tag-text">{tagText}</span>
      </button>
    </div>
  );
}

export default ReviewTag;
