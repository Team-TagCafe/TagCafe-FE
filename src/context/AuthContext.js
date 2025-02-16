import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 로딩 상태 추가

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedNickname = localStorage.getItem("nickname");
    const storedEmail = localStorage.getItem("email");

    if (storedToken && storedNickname && storedEmail) {
      setUser({ token: storedToken, nickname: storedNickname, email: storedEmail });
      console.log("✅ 로그인 정보 로드됨:", { token: storedToken, nickname: storedNickname, email: storedEmail });
    } else {
      console.log("❌ 로그인 정보 없음, 로그아웃 상태");
    }
    
    setLoading(false); // 🔥 로딩 완료
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