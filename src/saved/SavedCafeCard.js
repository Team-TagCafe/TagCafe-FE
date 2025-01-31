import React from "react";
import { useNavigate } from "react-router-dom";
import "./SavedCafeCard.css";
import { Bookmark, VisitStatus } from "../components";
import { useCafe } from "../home/CafeContext";

const SavedCafeCard = ({ cafe }) => {
  const { id, place_name, address_name, tags } = cafe;
  const { toggleSaveCafe } = useCafe();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/cafe/${id}`);
  };

  const handleBookmarkClick = (event) => {
    event.stopPropagation();  // 부모 이벤트 전파 방지
    toggleSaveCafe(id);  // 북마크 해제 (saved: false로 변경)
  };

  const handleVisitStatusClick = (event) => {
    event.stopPropagation();
  };


  return (
    <div className="saved-cafe-card" onClick={handleCardClick}>
      {/* 이미지 섹션 */}
      <div className="saved-cafe-image-container">
        <img
          className="saved-cafe-image"
          src="/img/cafe-img.png"
          // alt={place_name}
        />
        <div className="saved-cafe-bookmark-overlay" onClick={handleBookmarkClick}>
          <Bookmark width="14px" height="25px" isSaved={true} />
        </div>
      </div>

      {/* 카페 정보 섹션 */}
      <div className="saved-cafe-info">
        <div className="saved-cafe-header">
          <div className="saved-cafe-header-text">
            <h3 className="saved-cafe-name">{place_name}</h3>
            <p className="saved-cafe-location">{address_name}</p>
          </div>
          <div onClick={handleVisitStatusClick}>
            <VisitStatus />
          </div>        </div>
        <div className="saved-cafe-tags">
          {tags.map((tag, index) => (
            <span key={index} className="saved-cafe-tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedCafeCard;
