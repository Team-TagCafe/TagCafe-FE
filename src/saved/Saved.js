import React from 'react';
import { BottomBar, TopBar } from '../components';
import SavedCafeCard from './SavedCafeCard';

const Saved = () => {

  const cafe = {
    name: "스테이 어도러블 카레 클린트 용인 보정점",
    location: "용인 기흥구",
    tags: ["콘센트 일부", "와이파이 빠름"],
    image: "/img/cafe-img.png",
  };

  return (
    <>
      <TopBar
        title="# Saved"
        showTags showHamburger={true} />
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <SavedCafeCard cafe={cafe} />
      </div>
      <BottomBar />
    </>
  );
};

export default Saved;
