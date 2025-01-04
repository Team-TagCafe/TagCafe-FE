import React, { useState } from 'react';
import './MapCafe.css';

const MapCafe = ({ cafeName, cafeId }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태 관리

  const handleClick = () => {
    setIsClicked(true);  // 클릭 시 로고 크기 변경
    setIsModalOpen(true);  // 모달 열기
  };

  const closeModal = () => {
    setIsClicked(false);  // 모달 닫을 때 로고 크기 기본 상태로 되돌리기
    setIsModalOpen(false);  // 모달 닫기
  };

  return (
    <div>
      <div
        className={`button-container ${isClicked ? 'clicked' : 'default'}`}
        onClick={handleClick}
      >
        <img
          src="/img/map-cafe.png"
          alt="카페 아이콘"
          className={`map-cafe-icon ${isClicked ? 'clicked' : ''}`}
        />
        <div className="label">{cafeName || '지도에 카페를 표시'}</div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{cafeName}</h2>
            <p>카페 ID: {cafeId}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapCafe;
