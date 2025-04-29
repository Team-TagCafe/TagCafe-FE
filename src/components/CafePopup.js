import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './CafePopup.css';
import TagGroup from '../components/TagGroup';

const CafePopup = ({ cafeName, cafeAddress, cafeId, thumbnailUrl, onClose }) => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cafes/${cafeId}/tags`);
                if (!response.ok) {
                    throw new Error("태그 데이터를 불러오는 중 오류 발생");
                }
                const data = await response.json();

                const tagMappings = {
                    wifi: { icon: "/img/wifi.png", label: "와이파이" },
                    outlets: { icon: "/img/plug.png", label: "콘센트" },
                    desk: { icon: "/img/desk.png", label: "책상" },
                    restroom: { icon: "/img/toilet.png", label: "화장실" },
                    parking: { icon: "/img/park.png", label: "주차" },
                };

                const parkingValueMap = {
                    "가능_무료": "가능(무료)",
                    "가능_유료": "가능(유료)",
                    "가능_일부": "가능(일부)",
                    "불가능": "불가능",
                };

                const tagOrder = ["wifi", "outlets", "desk", "restroom", "parking"];
                const tagArray = Object.entries(data)
                    .filter(([key]) => tagMappings[key])
                    .map(([key, value]) => ({
                        icon: tagMappings[key].icon,
                        text: `${tagMappings[key].label}: ${key === "parking" ? parkingValueMap[value] || value : value
                            }`,
                        order: tagOrder.indexOf(key),
                    }))
                    .sort((a, b) => a.order - b.order);

                setTags(tagArray);
            } catch (error) {
                console.error("태그 데이터를 불러오는 중 오류 발생:", error);
                setTags([]); // 오류 발생 시 빈 배열 설정
            }
        };

        if (cafeId) {
            fetchTags();
        }
    }, [cafeId]);


    const handleOverlayClick = (e) => {
        onClose(); // 외부 클릭 시 팝업 닫기
    };

    const handlePopupClick = (e) => {
        e.stopPropagation(); // 내부 클릭 시 이벤트 전파 방지
    };

    const handleViewDetailsClick = () => {
        navigate(`/cafe/${cafeId}`); // 선택한 카페의 ID로 상세 페이지 이동
    };

    return (
        <div className="cafe-popup-overlay" onClick={handleOverlayClick}>
            <div className="cafe-popup-container" onClick={handlePopupClick}>
                {/* 닫기 버튼 */}
                <button className="cafe-popup-close-btn" onClick={onClose}>✕</button>
                <div className="cafe-popup-box">
                    <div className="cafe-popup-image">
                        <img src={thumbnailUrl || '/img/map-cafe.png'} alt="cafe-thumbnail" />
                    </div>
                    <div className="cafe-popup-content">
                        {/* 검색 결과 */}
                        <div className="search-result">
                            <span className="cafe-name">{cafeName}</span>
                            <span className="cafe-address">{cafeAddress}</span>
                        </div>
                        {/* 카페 상세보기 */}
                        <div className="view-details" onClick={handleViewDetailsClick}>
                            카페 상세보기 ＞
                        </div>
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
