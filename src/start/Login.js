import React, { useEffect, useContext } from "react";
import "./Login.css";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);  // AuthContext에서 login 함수 가져오기
  const { handleGuestLogin } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nickname = params.get("nickname");
    const email = params.get("email");
    const token = params.get("token"); // 백엔드에서 JWT 토큰 추가

    if (nickname && email && token) {
      console.log("✅ 로그인 성공: ", nickname, email);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);
      login(token, nickname, email);
      navigate("/home");
    }
  }, [location, login, navigate]);


  const handleLogin = () => {
    console.log("카카오톡으로 로그인 버튼 클릭됨");
    window.location.href = "/api/oauth/kakao/login";
  };

  const handleGuestAccess = () => {
    console.log("로그인 없이 사용하기 클릭됨");
    handleGuestLogin();
    navigate("/home");
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
        <img src="/img/kakao.png" alt="kakao icon" className="kakao-icon" />
        카카오톡으로 로그인
      </button>

      <div className="login-footer" onClick={handleGuestAccess}>
        로그인 없이 <span className="login-use">사용하기</span>
      </div>
    </div>
  );
}

export default LoginPage;