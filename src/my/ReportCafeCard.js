import React, { useState } from "react";
import TagGroup from "../components/TagGroup";
import "./ReportCafeCard.css";

const ReportCafeCard = ({ cafe }) => {
const { cafeId, name, date,  description, tags } = cafe;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };

  const tagIcons = {
    "와이파이 빠름": "/img/wifi.png",
    "콘센트 일부": "/img/plug.png",
    "책상 적당함": "/img/desk.png",
    "화장실 외부": "/img/toilet.png",
    "주차 가능(무료)": "/img/park.png",
  };


  const formattedTags = tags.map((tag) => ({
    icon: tagIcons[tag], // 기본 아이콘 경로
    text: tag,
  }));

  return (
    <div className="report-cafe-card">
        <div className="report-cafe-header">
            <div className="report-cafe-info">
                <div className="report-cafe-toggle">
                    <h3 className="report-cafe-name">{cafe.name}</h3>
                    <button className="report-cafe-toggle-button" onClick={toggleDetails}>
                    <img
                    src={
                        isExpanded
                        ? "/img/toggle-up.png"
                        : "/img/toggle-down.png"
                    }
                    alt="Toggle"
                    />
                    </button>
                </div>
                <p className="report-cafe-address">{cafe.address}</p>
                <div className="report-cafe-check">
                    <img src="/img/report-wait.png" alt="Check" />
                </div>
            </div>
        </div>

        {isExpanded && (
        <div className="report-cafe-details">
            <p className="report-cafe-description">{cafe.description}</p>
            <TagGroup tags={formattedTags} />
        </div>
        )}
      <div className="report-cafe-check">
        <img src="/img/report-wait.png" alt="Check" />
      </div>
    </div>
  );
};

export default ReportCafeCard;