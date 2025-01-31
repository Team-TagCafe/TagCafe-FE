import React, { useState } from 'react';
import { BottomBar, TopBar } from '../components';
import SavedCafeCard from './SavedCafeCard';
import "./Saved.css"
import { useCafe } from '../home/CafeContext';

const Saved = () => {
  const { cafes } = useCafe();
  const savedCafes = cafes.filter(cafe => cafe.saved);

  return (
    <div className="saved-page">
      <TopBar
        title="# Saved"
        showTags showHamburger={true} />

      <div className="saved-content">
        <p className="saved-cafe-count">총 {savedCafes.length}개</p>
        <div className="saved-cafe-list">
          {savedCafes.map((cafe) => (
            <SavedCafeCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

export default Saved;
