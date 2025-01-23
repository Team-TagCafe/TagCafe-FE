import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TagGroup from "../components/TagGroup";
import "./ReportCafeCard.css";

const ReportCafeCard = ({ cafe }) => {
  const { cafeId, name , address, description, tags, status } = cafe;
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMessage, setShowMessage] = useState(false); // 개별 메시지 상태
  const [messageType, setMessageType] = useState(null);   
  const navigate = useNavigate();

  const handleNavigateToEdit = () => {
    navigate(`/my/report/edit/${cafe.id}`);
  };

  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };


  const handleCheckClick = (type) => {
    setMessageType(cafe.status); // 메시지 유형 설정
    setShowMessage(true);
  };

  const closeMessage = () => {
    setShowMessage(false); // 메시지 닫기
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

  const messageContent = {
    wait: {
      text: "카페 등록을 검토하고 있어요",
      action: "카페 정보 수정하기 >",
    },
    denied: {
      text: "카페 등록이 거부되었습니다",
      action: "자세히 보기 >",
    },
    accepted: {
      text: "카페 등록이 완료되었습니다",
      action: "카페 보러가기 >",
    },
  };

  return (
    <div className="report-cafe-card" >
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
                <div className="report-cafe-check" onClick={() => handleCheckClick("wait")}>
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


        {showMessage && (
        <div className="report-check-overlay" onClick={closeMessage}>
          <div className="report-check-container" style={{ top: "50px", position: "absolute" }} >
            <div className="report-check-message">
              <p>{messageContent[messageType]?.text}</p>
              <p
                className="report-check-action"
                onClick={handleNavigateToEdit}
              >
                {messageContent[messageType]?.action}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReportCafeCard;