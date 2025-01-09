import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Link: 페이지 간 이동을 위한 컴포넌트, useLocation: 현재 경로 정보를 가져오는 Hook
import './BottomBar.css';

const BottomBar = () => {
  // useLocation 훅을 사용하여 현재 경로 정보를 가져옴
  const location = useLocation();

  // 현재 경로가 path와 일치하는지 확인하는 함수
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
