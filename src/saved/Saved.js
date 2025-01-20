import React, { useState } from 'react';
import { BottomBar, TopBar } from '../components';
import SavedCafeCard from './SavedCafeCard';
import "./Saved.css"

const Saved = () => {

  const [savedCafes, setSavedCafes] = useState([
    {
      cafeId: 1,
      name: "스테이 어도러블 카레 클린트 용인 보정점",
      location: "용인 기흥구",
      tags: ["콘센트 일부", "와이파이 빠름"],
      image: "/img/cafe-img.png",
    },

    {
      cafeId: 2,
      name: "스테이 어도러블",
      location: "용인 기흥구",
      tags: ["콘센트 일부", "와이파이 빠름"],
      image: "/img/cafe-img.png",
    },

    {
      cafeId: 3,
      name: "스테이 어도러블",
      location: "용인 기흥구",
      tags: ["콘센트 일부", "와이파이 빠름"],
      image: "/img/cafe-img.png",
    },
    {
      cafeId: 4,
      name: "스테이 어도러블",
      location: "용인 기흥구",
      tags: ["콘센트 일부", "와이파이 빠름"],
      image: "/img/cafe-img.png",
    },
    {
      cafeId: 5,
      name: "스테이 어도러블",
      location: "용인 기흥구",
      tags: ["콘센트 일부", "와이파이 빠름"],
      image: "/img/cafe-img.png",
    },
    {
      cafeId: 6,
      name: "스테이 어도러블",
      location: "용인 기흥구",
      tags: ["콘센트 일부", "와이파이 빠름"],
      image: "/img/cafe-img.png",
    },
    {
      cafeId: 7,
      name: "스테이 어도러블",
      location: "용인 기흥구",
      tags: ["콘센트 일부", "와이파이 빠름"],
      image: "/img/cafe-img.png",
    }
  ])

  return (
    <div className="saved-page">
      <TopBar
        title="# Saved"
        showTags showHamburger={true} />

      <div className="saved-content">
        <p className="saved-cafe-count">총 {savedCafes.length}개</p>
        <div className="saved-cafe-list">
          {savedCafes.map((cafe) => (
            <SavedCafeCard cafe={cafe} />
          ))}
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

export default Saved;
