import React, { useState, useEffect } from 'react';
import { BottomBar, TopBar } from '../components';
import SavedCafeCard from './SavedCafeCard';
import "./Saved.css"

const Saved = () => {
  const [savedCafes, setSavedCafes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // userId 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
          return;
        }
        const response = await fetch(`http://localhost:8080/users/id?email=${storedEmail}`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch user ID");

        const userId = await response.json();
        setUserId(userId);
        console.log("가져온 userId:", userId);

      } catch (error) {
        console.error(error);
      }
    };
    fetchUserId();
  }, []);

  // 저장한 카페 목록 가져오기
  useEffect(() => {
    if (!userId) return;

    const fetchSavedCafes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/saved-cafes?userId=${userId}`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("저장한 카페 목록을 불러오는데 실패했습니다.");

        const data = await response.json();
        setSavedCafes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchSavedCafes();
  }, [userId]);

  return (
    <div className="saved-page">
      <TopBar
        title="# Saved"
        showTags showHamburger={true} />

      <div className="saved-content">
        <p className="saved-cafe-count">총 {savedCafes.length}개</p>
        <div className="saved-cafe-list">
          {!loading && (
            <div className="saved-cafe-list">
              {savedCafes.length > 0 ? (
                savedCafes.map((cafe) => <SavedCafeCard key={cafe.cafeId} cafe={cafe} />)
              ) : (
                <p className="no-saved-cafe">저장된 카페가 없습니다.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

export default Saved;
