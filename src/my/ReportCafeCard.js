import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TagGroup from "../components/TagGroup";
import "./ReportCafeCard.css";

const ReportCafeCard = ({ cafe }) => {
  const {
    reportedCafeId,
    cafeName,
    address,
    content,
    status,
    wifi,
    outlets,
    desk,
    restroom,
    parking,
  } = cafe;
  
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMessage, setShowMessage] = useState(false); // 개별 메시지 상태
  const [messageType, setMessageType] = useState(null);   
  const [reviewEditText, setReviewEditText] = useState(""); // 추가된 상태
  const [selectedOptions, setSelectedOptions] = useState([]); // 추가된 상태
  const cafeOptions = []; // 초기화된 상태
  const navigate = useNavigate();
  const cafeStatus = status === "APPROVED" ? "accepted" : (status === "REJECTED" ? "denied" : "wait");

  
  const handleNavigateToEdit = () => {
    if (status === "PENDING") {
      if (reportedCafeId) {
        navigate(`/my/report/edit/${reportedCafeId}`);
      } else {
        alert("제보 ID가 없습니다.");
      }
    } else if (status === "APPROVED") {
      navigate(`/cafe/${cafe.cafe?.cafeId}`);
    } else {
      alert("거절된 제보는 수정할 수 없습니다.");
    }
  };

  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };


  const handleCheckClick = (type) => {
    setMessageType(cafeStatus); // 메시지 유형 설정
    setShowMessage(true);
  };

  const closeMessage = () => {
    setShowMessage(false); // 메시지 닫기
  };


  const tagIcons = {
    "와이파이": "/img/wifi.png",
    "콘센트": "/img/plug.png",
    "책상": "/img/desk.png",
    "화장실": "/img/toilet.png",
    "주차": "/img/park.png",
  };


  const tags = [];
  if (wifi) tags.push(`와이파이: ${wifi}`);
  if (outlets) tags.push(`콘센트: ${outlets}`);
  if (desk) tags.push(`책상: ${desk}`);
  if (restroom) tags.push(`화장실: ${restroom}`);
  
  const parkingValueMap = {
    "가능_무료": "가능(무료)",
    "가능_유료": "가능(유료)",
    "가능_일부": "가능(일부)",
    "불가능": "불가능",
  };
  if (parking) tags.push(`주차: ${parkingValueMap[parking] || parking}`);

  const formattedTags = tags.map((tag) => {
    let iconKey = Object.keys(tagIcons).find((key) => tag.includes(key)) || "기본";
    return {
      icon: tagIcons[iconKey],
      text: tag,
    };
  });

  const messageContent = {
    wait: {
      text: "카페 등록을 검토하고 있어요",
      action: "카페 정보 수정하기 >",
    },
    denied: {
      text: "카페 등록이 거부되었습니다",
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
                    <h3 className="report-cafe-name">{cafeName}</h3>
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
                <p className="report-cafe-address">{address}</p>
                <div className="report-cafe-check" onClick={() => handleCheckClick("wait")}>
                  <img
                    src={
                      cafeStatus === "accepted"
                        ? "/img/report-accepted.png"
                        : cafeStatus === "denied"
                        ? "/img/report-denied.png"
                        : "/img/report-wait.png"
                    }
                    alt="Check"
                  />
                </div>
            </div>
        </div>

        {isExpanded && (
        <div className="report-cafe-details">
            <p className="report-cafe-description">{content}</p>
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