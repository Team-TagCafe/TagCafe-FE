import React from "react";
import "./SavedCafeCard.css";
import { VisitStatus } from "../components";

const SavedCafeCard = ({ cafe }) => {
  const { name, location, tags, image } = cafe;

  return (
    <div className="saved-cafe-card">
      {/* 이미지 섹션 */}
      <div className="saved-cafe-image-container">
        <img
          className="saved-cafe-image"
          src={image || "/img/default-cafe.png"}
          alt={name}
        />
      </div>

      {/* 카페 정보 섹션 */}
      <div className="saved-cafe-info">
        <div className="saved-cafe-header">
          <div className="saved-cafe-header-text">
            <h3 className="saved-cafe-name">{name}</h3>
            <p className="saved-cafe-location">{location}</p>
          </div>
          <VisitStatus />
        </div>
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
