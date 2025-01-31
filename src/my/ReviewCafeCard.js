import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewCafeCard.css";
import TagGroup from "../components/TagGroup";
import ShortButton from "../components/ShortButton";
import Popup from "../components/Popup";

const ReviewCafeCard = ({ cafe,onEdit, onDeleteConfirmed }) => {
  const { cafeId, name, date, rating=0, description, tags, image } = cafe;
  const [menuVisible, setMenuVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleEdit = () => {
    onEdit(cafeId);
    setMenuVisible(false);
  };

  const handleDelete = () => {
    setPopupVisible(true); // 팝업 표시
    setMenuVisible(false); // 메뉴 닫기
  };

  const confirmDelete = () => {
    onDeleteConfirmed(cafe); // 부모 컴포넌트에서 삭제 처리
    setPopupVisible(false); // 팝업 닫기
  };

  const cancelDelete = () => {
    setPopupVisible(false); // 팝업 닫기
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
    <div className="review-cafe-card">
      <div className="review-cafe-image-container">
        <img className="review-cafe-image" src={image || "/img/cafe-img.png"} alt={name} />
        <button className="review-view-details">카페 상세보기 &gt;</button>
      </div>      


      {/* 카페 정보와 더보기 메뉴 */}
      <div className="review-cafe-info">
        <div className="review-cafe-header">
          <h3 className="review-cafe-name">
            {name} {rating && (
              <span className="review-cafe-rating">
                <img src="/img/star_full.png" alt="Rating Star" className="review-rating-star-icon" />
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
        <p className="review-cafe-date">{date}</p>
        <p className="review-cafe-description">{description}</p>
        <TagGroup tags={formattedTags} />
      </div>
      {popupVisible && (
        <Popup
          message={`"${name}" 카페를 삭제하시겠습니까?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ReviewCafeCard;