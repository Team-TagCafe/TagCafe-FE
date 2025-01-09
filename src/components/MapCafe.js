import React, { useState } from 'react';
import './MapCafe.css';

// cafeName (카페 이름)과 cafeId (카페 ID)를 props로 전달받음
const MapCafe = ({ cafeName, cafeId }) => {
  // 클릭된 상태를 관리하는 useState 훅
  const [isClicked, setIsClicked] = useState(false);
  // 모달의 열림/닫힘 상태를 관리하는 useState 훅
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 클릭 시 호출되는 함수: 로고 크기 변경과 모달 열기
  const handleClick = () => {
    setIsClicked(true);  // 클릭 시 로고 크기 변경
    setIsModalOpen(true);  // 모달 열기
  };

  // 모달을 닫을 때 호출되는 함수: 로고 크기를 기본 상태로 되돌리고 모달 닫기
  const closeModal = () => {
    setIsClicked(false);  // 모달 닫을 때 로고 크기 기본 상태로 되돌리기
    setIsModalOpen(false);  // 모달 닫기
  };

  return (
    <div>
      {/* 카페 아이콘과 이름을 표시하는 버튼 컨테이너 */}
      <div
        className={`button-container ${isClicked ? 'clicked' : 'default'}`} // 클릭 상태에 따라 클래스 변경
        onClick={handleClick} // 버튼 클릭 시 handleClick 함수 실행
      >
        <img
          src="/img/map-cafe.png"
          alt="카페 아이콘"
          className={`map-cafe-icon ${isClicked ? 'clicked' : ''}`} // 클릭 상태에 따라 이미지 클래스 변경
        />
        <div className="label">{cafeName || '카페명'}</div> {/* 카페 이름 표시 (없으면 기본 텍스트 표시) */}
      </div>

      {/* 모달이 열렸을 때 표시되는 부분 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{cafeName}</h2> {/* 카페 이름 표시 */}
            <p>카페 ID: {cafeId}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapCafe;
