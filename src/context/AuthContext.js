import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 로딩 상태 추가

  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    let storedNickname = localStorage.getItem("nickname");
    let storedEmail = localStorage.getItem("email");

    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const urlNickname = params.get("nickname");
    const urlEmail = params.get("email");

    if (urlToken && urlNickname && urlEmail) {
      localStorage.setItem("token", urlToken);
      localStorage.setItem("nickname", urlNickname);
      localStorage.setItem("email", urlEmail);
      setUser({ token: urlToken, nickname: urlNickname, email: urlEmail });

      console.log("✅ 로그인 성공! 저장된 값:", { token: urlToken, nickname: urlNickname, email: urlEmail });

      window.history.replaceState({}, document.title, "/home");
    } else if (storedToken && storedNickname && storedEmail) {
      setUser({ token: storedToken, nickname: storedNickname, email: storedEmail });
    } else {
      console.log("❌ 로그인 정보 없음, 로그아웃 상태");
      setUser({ guest: true }); 
    }
    setLoading(false);
  }, []);

  const login = (token, nickname, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("email", email);
    setUser({ token, nickname, email });

    console.log("✅ 로그인 성공:", { token, nickname, email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    localStorage.removeItem("email");
    
    setUser(null); // ✅ 먼저 상태 초기화
    setTimeout(() => {
      setUser({ guest: true }); // ✅ guest 모드로 변경
      console.log("🚪 로그아웃됨, 게스트 모드 활성화");
    }, 100); // ✅ 비동기 처리로 상태 업데이트 보장
  };

  const handleGuestLogin = () => {
    console.log("🚀 로그인 없이 사용하기 활성화");
    setUser({ guest: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, handleGuestLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;