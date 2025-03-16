import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewCafeCard.css";
import TagGroup from "../components/TagGroup";
import ShortButton from "../components/ShortButton";
import Popup from "../components/Popup";

const ReviewCafeCard = ({ cafe, onEdit, onDeleteConfirmed }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  if (!cafe) {
    console.error("ReviewCafeCard: cafe 객체가 undefined입니다.");
    return <div className="review-cafe-card">리뷰 데이터를 불러올 수 없습니다.</div>;
  }

  const {
    cafeId,
    cafeName = "카페 이름 없음",
    content = "리뷰 내용 없음",
    createdAt = [],
    desk = "",
    outlets = "",
    parking = "",
    rating = 0,
    restroom = "",
    userEmail = "",
    wifi = "",
  } = cafe;

  // 날짜 변환 (createdAt이 배열 형태이므로 변환 필요)
  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 5) return "날짜 없음";
    const [year, month, day, hour, minute] = dateArray;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };
  const formattedDate = formatDate(createdAt);

  const tagIcons = {
    "빠름": "/img/wifi.png", 
    "좁음": "/img/desk.png", 
    "없음": "/img/plug.png", 
    "불가능": "/img/park.png", 
    "외부": "/img/toilet.png", 
  };

  const tags = [
    { text: `Wi-Fi: ${wifi}`, icon: tagIcons[wifi] || "/img/default-tag.png" },
    { text: `책상: ${desk}`, icon: tagIcons[desk] || "/img/default-tag.png" },
    { text: `콘센트: ${outlets}`, icon: tagIcons[outlets] || "/img/default-tag.png" },
    { text: `주차: ${parking}`, icon: tagIcons[parking] || "/img/default-tag.png" },
    { text: `화장실: ${restroom}`, icon: tagIcons[restroom] || "/img/default-tag.png" },
  ];

  const toggleMenu = () => setMenuVisible((prev) => !prev);
  
  const handleEdit = () => {
    onEdit(cafeId);
    setMenuVisible(false);
  };
  const handleDelete = () => {
    setPopupVisible(true);
    setMenuVisible(false);
  };
  const confirmDelete = () => {
    onDeleteConfirmed(cafe.reviewId); 
    setPopupVisible(false);
  };
  const cancelDelete = () => setPopupVisible(false);

  return (
    <div className="review-cafe-card">
      <div className="review-cafe-image-container">
        <img className="review-cafe-image" src="/img/cafe-img.png" alt="카페 이미지" />
        <button className="review-view-details">카페 상세보기 &gt;</button>
      </div>

      <div className="review-cafe-info">
        <div className="review-cafe-header">
          <h3 className="review-cafe-name">
            {cafeName} {rating > 0 && (
              <span className="review-cafe-rating">
                <img src="/img/star_full.png" alt="별점" className="review-rating-star-icon" />
                {rating}
              </span>
            )}
          </h3>
          <button className="review-more-button" onClick={toggleMenu}>
            <img src="/img/kebab_menu.png" alt="더보기" />
          </button>
          {menuVisible && (
            <div className="review-more-menu">
              <ShortButton optionText="수정" onClick={handleEdit} />
              <ShortButton optionText="삭제" onClick={handleDelete} />
            </div>
          )}
        </div>
        <p className="review-cafe-date">{formattedDate}</p>
        <p className="review-cafe-description">{content}</p>

        <TagGroup tags={tags} />
      </div>

      {popupVisible && (
        <Popup
          message={`"${cafeName}" 리뷰를 삭제하시겠습니까?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ReviewCafeCard;