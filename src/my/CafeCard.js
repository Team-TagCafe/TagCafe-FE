import React from "react";
import "./CafeCard.css";
import TagGroup from "../components/TagGroup";

const CafeCard = ({ cafe }) => {
    const { name, date, rating, description, tags, image } = cafe;

  return (
    <div className="cafe-card">
      <div className="cafe-image-container">
        <img className="cafe-image" src= "/img/cafe-img.png" alt={name} />
        <button className="view-details">카페 상세보기 &gt;</button>
      </div>      
      <div className="cafe-info">
        <h3 className="cafe-name">
          {cafe.name} {cafe.rating && `★ ${cafe.rating}`}
        </h3>
        <p className="cafe-date">{cafe.date}</p>
        <p className="cafe-description">{cafe.description}</p>
        <div className="cafe-tags">
        <TagGroup tags={tags} />
        </div>
       </div>
    </div>
  );
};

export default CafeCard;