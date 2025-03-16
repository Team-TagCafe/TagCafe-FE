import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SavedCafeCard.css";
import { Bookmark, VisitStatus } from "../components";

const SavedCafeCard = ({ cafe }) => {
  const { cafeId, cafeName, address, tags, visited } = cafe;
  const [isVisited, setIsVisited] = useState(visited);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/cafe/${cafeId}`);
  };

  // userId 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) return;

        const response = await fetch(`http://localhost:8080/users/id?email=${storedEmail}`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("사용자 ID를 가져오는데 실패했습니다.");

        const userId = await response.json();
        setUserId(userId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserId();
  }, []);

  const handleBookmarkClick = async (event) => {
    event.stopPropagation(); // 부모 이벤트 전파 방지

    if (!userId) {
      console.error("userId가 없습니다.");
      return;
    }

    try {
      await fetch(`http://localhost:8080/saved-cafes/${cafeId}?userId=${userId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload(); // 새로고침하여 변경된 상태 반영
    } catch (error) {
      console.error(error);
    }
  };

  const handleVisitStatusClick = async (event) => {
    event.stopPropagation();

    if (!userId) {
      console.error("userId가 없습니다.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/saved-cafes/${cafeId}/visited?userId=${userId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("방문 상태 변경 실패");

      const updatedCafe = await response.json();
      setIsVisited(updatedCafe.visited); // 최신 방문 상태 반영
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="saved-cafe-card" onClick={handleCardClick}>
      {/* 이미지 섹션 */}
      <div className="saved-cafe-image-container">
        <img
          className="saved-cafe-image"
          src="/img/cafe-img.png"
        // alt={place_name}
        />
        <div className="saved-cafe-bookmark-overlay" onClick={handleBookmarkClick}>
          <Bookmark width="14px" height="25px" isSaved={true} />
        </div>
      </div>

      {/* 카페 정보 섹션 */}
      <div className="saved-cafe-info">
        <div className="saved-cafe-header">
          <div className="saved-cafe-header-text">
            <h3 className="saved-cafe-name">{cafeName}</h3>
            <p className="saved-cafe-location">{address}</p>
          </div>
          <div onClick={handleVisitStatusClick}>
            <VisitStatus isVisited={isVisited} />
          </div>        </div>
        <div className="saved-cafe-tags">
          {/* {tags.map((tag, index) => (
            <span key={index} className="saved-cafe-tag">
              #{tag}
            </span>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default SavedCafeCard;
