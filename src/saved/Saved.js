import React, { useState, useEffect } from 'react';
import { BottomBar, TopBar } from '../components';
import SavedCafeCard from './SavedCafeCard';
import "./Saved.css"

const Saved = () => {
  const [savedCafes, setSavedCafes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  // userId 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
          return;
        }
        const response = await fetch(`/api/users/id?email=${storedEmail}`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch user ID");

        const userId = await response.json();
        setUserId(userId);
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
        const url = new URL(`/api/saved-cafes/filter`);
        url.searchParams.append("userId", userId);

        // 필터 값이 있으면 API 요청에 추가
        const tagNames = [];
        const values = [];
        Object.entries(filters).forEach(([tag, value]) => {
          if (value) {
            tagNames.push(tag);
            values.push(value);
          }
        });

        // 필터가 있을 때만 추가
        if (tagNames.length > 0) {
          url.searchParams.append("tags", tagNames.join(","));
          url.searchParams.append("values", values.join(","));
        }

        const response = await fetch(url, {
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
  }, [userId, filters]); // userId 또는 filters 변경될 때 실행

  return (
    <div className="saved-page">
      <TopBar
        title="# Saved"
        showTags showHamburger={true}
        onFilterChange={setFilters} />

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
