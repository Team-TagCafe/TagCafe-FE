import React, { useState } from "react";
import "./CafeCard.css";
import TagGroup from "../components/TagGroup";
import ShortButton from "../components/ShortButton";

const CafeCard = ({ cafe }) => {
  const { name, date, rating, description, tags, image } = cafe;
  const [menuVisible, setMenuVisible] = useState(false);


  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleEdit = () => {
    alert("수정 기능을 실행합니다.");
    setMenuVisible(false);
  };

  const handleDelete = () => {
    alert("삭제 기능을 실행합니다.");
    setMenuVisible(false);
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
    <div className="cafe-card">
      <div className="cafe-image-container">
        <img className="cafe-image" src={image || "/img/cafe-img.png"} alt={name} />
        <button className="view-details">카페 상세보기 &gt;</button>
      </div>      


      {/* 카페 정보와 더보기 메뉴 */}
      <div className="cafe-info">
        <div className="cafe-header">
          <h3 className="cafe-name">
            {name} {rating && <span className="cafe-rating">★ {rating}</span>}
          </h3>
          <button className="more-button" onClick={toggleMenu}>
            <img src="/img/kebab_menu.png" alt="더보기" />
          </button>
          {menuVisible && (
            <div className="more-menu">
              <ShortButton optionText="수정" onClick={handleEdit} />
              <ShortButton optionText="삭제" onClick={handleDelete} />
            </div>
          )}
        </div>
        <p className="cafe-date">{date}</p>
        <p className="cafe-description">{description}</p>
        <TagGroup tags={formattedTags} />
      </div>
    </div>
  );
};

export default CafeCard;