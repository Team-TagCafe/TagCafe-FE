import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BottomBar.css';

const BottomBar = () => {
    const location = useLocation();

    // 현재 경로와 일치 여부 확인
    const isActive = (path) => location.pathname === path;
  
  return (
    <div className="bottom-nav-bar">
      <Link to="/home" className="nav-item">
        <img
          src={isActive('/home') ? '/img/home-active.png' : '/img/home.png'}
          alt="Home"
        />
      </Link>
      <Link to="/saved" className="nav-item">
        <img
          src={isActive('/saved') ? '/img/saved-active.png' : '/img/saved.png'}
          alt="Saved"
        />
      </Link>
      <Link to="/my" className="nav-item">
        <img
          src={isActive('/my') ? '/img/my-active.png' : '/img/my.png'}
          alt="My"
        />
      </Link>
    </div>
  );
};

export default BottomBar;
