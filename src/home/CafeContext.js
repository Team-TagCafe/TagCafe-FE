import React, { createContext, useContext, useState } from 'react';

// 카페 리스트 (전역 데이터)
const initialCafeList = [
    { id: 1, place_name: '스타벅스 강남점', address_name: '서울 강남구 테헤란로 123', x: 127.027610, y: 37.498095, saved: false },
    { id: 2, place_name: '이디야 커피 신촌점', address_name: '서울 서대문구 신촌로 45', x: 126.936843, y: 37.559768, saved: false },
    { id: 3, place_name: '빽다방 홍대점', address_name: '서울 마포구 홍대입구역 3번 출구', x: 126.922377, y: 37.556744, saved: false },
    { id: 4, place_name: '커피빈 서울역점', address_name: '서울 중구 서울역로 12', x: 126.970600, y: 37.554678, saved: true },
    { id: 5, place_name: '폴바셋 광화문점', address_name: '서울 종로구 세종대로 25', x: 126.976850, y: 37.571420, saved: false },
    { id: 6, place_name: '스테이어도러블', address_name: '경기도 용인시 기흥구 죽전로43번길 15-3 (보정동)', x: 127.112763, y: 37.321393, saved: true },
    { id: 7, place_name: '카레클린트', address_name: '경기도 용인시 기흥구 보정동 1186-2', x: 127.109171, y: 37.321808, saved: true },  
];

// Context 생성
const CafeContext = createContext();

// Context Provider
export const CafeProvider = ({ children }) => {
    const [cafes, setCafes] = useState(initialCafeList);
    const [selectedPlace, setSelectedPlace] = useState(null);

    // 특정 카페의 saved 값을 토글 (저장/삭제)
    const toggleSaveCafe = (id) => {
        setCafes((prevCafes) =>
            prevCafes.map((cafe) =>
                cafe.id === id ? { ...cafe, saved: !cafe.saved } : cafe
            )
        );
    };

    return (
        <CafeContext.Provider value={{ cafes, setSelectedPlace, selectedPlace, toggleSaveCafe }}>
            {children}
        </CafeContext.Provider>
    );
};

// Context 사용을 쉽게 하기 위한 커스텀 훅
export const useCafe = () => useContext(CafeContext);
