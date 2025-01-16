import React from 'react';
import './CafePopup.css';
import TagGroup from '../components/TagGroup';

const tags = [
    { icon: "/img/wifi.png", text: "와이파이 빠름" },
    { icon: "/img/plug.png", text: "콘센트 일부" },
    { icon: "/img/desk.png", text: "책상 적당함" },
    { icon: "/img/toilet.png", text: "화장실 외부" },
    { icon: "/img/park.png", text: "주차 가능(무료)" },
];

const CafePopup = ({ cafeName, cafeAddress, onClose }) => {
    const handleOverlayClick = (e) => {
        onClose(); // 외부 클릭 시 팝업 닫기
    };

    const handlePopupClick = (e) => {
        e.stopPropagation(); // 내부 클릭 시 이벤트 전파 방지
    };

    return (
        <div className="cafe-popup-overlay" onClick={handleOverlayClick}>
            <div className="cafe-popup-container" onClick={handlePopupClick}>
                {/* 닫기 버튼 */}
                <button className="cafe-popup-close-btn" onClick={onClose}>✕</button>
                <div className="cafe-popup-box">
                    <div className="cafe-popup-image">
                        <img src='/img/map-cafe.png'></img>
                    </div>
                    <div className="cafe-popup-content">
                        {/* 검색 결과 */}
                        <div className="search-result">
                            <span className="cafe-name">{cafeName}</span>
                            <span className="cafe-address">{cafeAddress}</span>
                        </div>
                        {/* 카페 상세보기 */}
                        <div className="view-details">카페 상세보기 ＞ </div>
                    </div>
                </div>

                {/* 태그모음 */}
                <div className="tag-container">
                    <TagGroup tags={tags} />
                </div>
            </div>
        </div>
    );
};

export default CafePopup;
