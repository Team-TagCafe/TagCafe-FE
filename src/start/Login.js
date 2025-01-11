import React from "react";
import "./Login.css";
import LongButton from "../components/LongButton";

function LoginPage() {
  const handleLogin = () => {
    console.log("카카오톡으로 로그인 버튼 클릭됨");
    // 카카오톡 로그인 동작 추가
  };

  const handleGuestAccess = () => {
    console.log("로그인 없이 사용하기 클릭됨");
    // 비로그인 접근 로직 추가
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h1 className="login-title">
          TagCafe
          <span className="login-icon">
            <img src="/img/coffee.png" alt="coffee icon" />
          </span>
        </h1>
        <p className="login-subtitle">카공 카페를 쉽게 찾아보세요</p>
        <p className="login-description">
          사용자 리뷰와 태그로 맞춤형 카페를 검색해요
        </p>
      </div>

      <button className="kakao-login-button" onClick={handleLogin}>
          <img
            src="/img/kakao.png"
            alt="kakao icon"
            className="kakao-icon"
          />
          카카오톡으로 로그인
      </button>     
      

      <div className="login-footer" onClick={handleGuestAccess}>
        로그인 없이 <span className="login-use">사용하기</span>
      </div>
    </div>
  );
}

export default LoginPage;