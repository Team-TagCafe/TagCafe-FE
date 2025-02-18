import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 로딩 상태 추가

  useEffect(() => {
    // 1️⃣ 먼저 localStorage에서 값 가져오기
    let storedToken = localStorage.getItem("token");
    let storedNickname = localStorage.getItem("nickname");
    let storedEmail = localStorage.getItem("email");
  
    // 2️⃣ URL에서 값 가져오기 (로그인 직후에는 URL에서 가져옴)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const urlNickname = params.get("nickname");
    const urlEmail = params.get("email");
  
    // 3️⃣ URL에서 값이 있으면 localStorage에 저장 (로그인 직후)
    if (urlToken && urlNickname && urlEmail) {
      localStorage.setItem("token", urlToken);
      localStorage.setItem("nickname", urlNickname);
      localStorage.setItem("email", urlEmail);
      setUser({ token: urlToken, nickname: urlNickname, email: urlEmail });
  
      console.log("✅ 로그인 성공! 저장된 값:", { token: urlToken, nickname: urlNickname, email: urlEmail });
  
      // URL에서 토큰 제거 (보안 강화)
      window.history.replaceState({}, document.title, "/home");
    } else if (storedToken && storedNickname && storedEmail) {
      setUser({ token: storedToken, nickname: storedNickname, email: storedEmail });

    } else {
      console.log("❌ 로그인 정보 없음, 로그아웃 상태");
    }
  }, []);

  const login = (token, nickname, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("email", email);
    setUser({ token, nickname, email });
    console.log("localStorage check:", {
        token: localStorage.getItem("token"),
        nickname: localStorage.getItem("nickname"),
        email: localStorage.getItem("email"),
      });

    console.log("✅ 로그인 성공:", { token, nickname, email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    localStorage.removeItem("email");
    setUser(null);
    console.log("🚪 로그아웃됨");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;