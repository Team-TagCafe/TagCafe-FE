import React from "react";
import "./DetailReviewCard.css";
import { TagGroup } from "../components";

const DetailReviewCard = ({ review }) => {
  const { userName, date, rating, content, tags } = review;

  const tagMappings = {
    wifi: { icon: "/img/wifi.png", label: "와이파이" },
    outlets: { icon: "/img/plug.png", label: "콘센트" },
    desk: { icon: "/img/desk.png", label: "책상" },
    restroom: { icon: "/img/toilet.png", label: "화장실" },
    parking: { icon: "/img/park.png", label: "주차" },
  };
  
  const parkingValueMap = {
    "가능_무료": "가능(무료)",
    "가능_유료": "가능(유료)",
    "가능_일부": "가능(일부)",
    "불가능": "불가능",
  };
  
  const tagOrder = ["wifi", "outlets", "desk", "restroom", "parking"];
  
  const mapReviewToTags = (review) => {
    const tags = [];
  
    tagOrder.forEach((key) => {
      const value = review[key];
      if (value) {
        let displayValue = value;
        if (key === "parking") {
          displayValue = parkingValueMap[value] || value;
        }
  
        tags.push({
          icon: tagMappings[key].icon,
          text: `${tagMappings[key].label}: ${displayValue}`,
        });
      }
    });
  
    return tags;
  };

  const formattedTags = mapReviewToTags(review);

  return (
    <div className="detail-review-card">
      <div className="detail-review-header">
        <div className="detail-review-user">
          <img
            src="/img/user-profile-gray.png"
            alt="user-profile"
            className="detail-review-user-profile"
          />
          <div className="detail-review-user-info">
            <h3 className="detail-review-user-name">{userName}</h3>
            <p className="detail-review-date">{date}</p>
          </div>
        </div>
        <div className="detail-review-star">
          <img
            src="/img/star_full.png"
            alt="Star Icon"
            className="detail-review-star-icon"
          />
          <span>{rating}</span>
        </div>
      </div>
      
      <p className="detail-review-content">{content}</p>
      <TagGroup className="detail-review-content__tag-group" tags={formattedTags} />

      {/* 구분선 */}
      <div className="detail-review-divider"></div>

    </div>
  );
};

export default DetailReviewCard;