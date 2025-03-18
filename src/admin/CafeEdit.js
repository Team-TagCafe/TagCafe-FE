import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/cafes";

const CafeEdit = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📌 모든 카페 가져오기 (GET)
  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => {
        setCafes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // 📌 태그 변경 핸들러
  const handleTagChange = (cafeId, field, value) => {
    setCafes((prevCafes) =>
      prevCafes.map((cafe) =>
        cafe.cafeId === cafeId ? { ...cafe, [field]: value } : cafe
      )
    );
  };

  // 📌 선택한 카페의 태그 업데이트
  const handleUpdateTags = (cafe) => {
    axios
      .put(`${API_BASE_URL}/${cafe.cafeId}/tags`, {
        wifi: cafe.wifi,
        outlets: cafe.outlets,
        desk: cafe.desk,
        restroom: cafe.restroom,
        parking: cafe.parking,
      })
      .then(() => alert(`"${cafe.cafeName}"의 태그가 업데이트되었습니다!`))
      .catch((error) => alert(`업데이트 실패: ${error.message}`));
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>전체 카페 태그 관리</h2>
      {cafes.map((cafe) => (
        <div key={cafe.cafeId} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
          <h3>{cafe.cafeName}</h3>
          <p><strong>주소:</strong> {cafe.address}</p>

          {/* 와이파이 */}
          <label>와이파이 속도:</label>
          <select
            value={cafe.wifi || ""}
            onChange={(e) => handleTagChange(cafe.cafeId, "wifi", e.target.value)}
          >
            <option value="">선택</option>
            <option value="빠름">빠름</option>
            <option value="보통">보통</option>
            <option value="없음">없음</option>
          </select>

          {/* 콘센트 */}
          <label>콘센트:</label>
          <select
            value={cafe.outlets || ""}
            onChange={(e) => handleTagChange(cafe.cafeId, "outlets", e.target.value)}
          >
            <option value="">선택</option>
            <option value="자리마다">자리마다</option>
            <option value="일부">일부</option>
            <option value="없음">없음</option>
          </select>

          {/* 책상 크기 */}
          <label>책상 크기:</label>
          <select
            value={cafe.desk || ""}
            onChange={(e) => handleTagChange(cafe.cafeId, "desk", e.target.value)}
          >
            <option value="">선택</option>
            <option value="넓음">넓음</option>
            <option value="적당함">적당함</option>
            <option value="좁음">좁음</option>
          </select>

          {/* 화장실 */}
          <label>화장실:</label>
          <select
            value={cafe.restroom || ""}
            onChange={(e) => handleTagChange(cafe.cafeId, "restroom", e.target.value)}
          >
            <option value="">선택</option>
            <option value="실내">실내</option>
            <option value="외부">외부</option>
          </select>

          {/* 주차 */}
          <label>주차:</label>
          <select
            value={cafe.parking || ""}
            onChange={(e) => handleTagChange(cafe.cafeId, "parking", e.target.value)}
          >
            <option value="">선택</option>
            <option value="가능_무료">가능(무료)</option>
            <option value="가능_유료">가능(유료)</option>
            <option value="가능_일부">가능(일부)</option>
            <option value="불가능">불가능</option>
          </select>

          {/* 저장 버튼 */}
          <button onClick={() => handleUpdateTags(cafe)} style={{ marginTop: "10px" }}>
            저장하기
          </button>
        </div>
      ))}
    </div>
  );
};

export default CafeEdit;
