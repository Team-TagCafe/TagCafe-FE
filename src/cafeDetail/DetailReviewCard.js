import React from "react";
import "./DetailReviewCard.css";
import { TagGroup } from "../components";

const DetailReviewCard = ({ review }) => {
  const { userName, date, rating, content, tags } = review;

  const tagIcons = {
    "와이파이 빠름": "/img/wifi.png",
    "콘센트 일부": "/img/plug.png",
    "책상 적당함": "/img/desk.png",
    "화장실 외부": "/img/toilet.png",
    "주차 가능(무료)": "/img/park.png",
  };

  const formattedTags = tags.map((tag) => ({
    icon: tagIcons[tag],
    text: tag,
  }));

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
      <TagGroup tags={formattedTags} />

      {/* 구분선 */}
      <div className="detail-review-divider"></div>

    </div>
  );
};

export default DetailReviewCard;