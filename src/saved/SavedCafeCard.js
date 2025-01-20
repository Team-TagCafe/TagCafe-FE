import React from "react";
import { useNavigate } from "react-router-dom";
import "./SavedCafeCard.css";
import { Bookmark, VisitStatus } from "../components";

const SavedCafeCard = ({ cafe }) => {
  const { cafeId, name, location, tags, image } = cafe;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/cafe/${cafeId}`);
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
          src={image || "/img/default-cafe.png"}
          alt={name}
        />
        <div className="saved-cafe-bookmark-overlay" onClick={handleVisitStatusClick}>
        <Bookmark width="14px" height="25px" />
        </div>
      </div>

      {/* 카페 정보 섹션 */}
      <div className="saved-cafe-info">
        <div className="saved-cafe-header">
          <div className="saved-cafe-header-text">
            <h3 className="saved-cafe-name">{name}</h3>
            <p className="saved-cafe-location">{location}</p>
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
