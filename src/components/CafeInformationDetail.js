import React, { useState, useEffect } from "react";
import "./CafeInformationDetail.css";

function CafeInformationDetail({ cafeId }) {
  const [isHoursOpen, setIsHoursOpen] = useState(false); // 운영시간 토글 상태
  const [tags, setTags] = useState({}); // 카페 태그 상태
  const [updateAt, setUpdateAt] = useState(""); // 업데이트 시간 상태

  useEffect(() => {
    if (!cafeId) return;

    // 태그 정보 가져오기
    const fetchTags = async () => {
      try {
        const response = await fetch(`http://localhost:8080/cafes/${cafeId}/tags`);
        if (!response.ok) throw new Error("태그 데이터를 불러오는 중 오류 발생");

        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error(error);
      }
    };

    // 카페 상세 정보 가져오기
    const fetchCafeInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/cafes/${cafeId}`);
        if (!response.ok) throw new Error("카페 정보를 불러오는 중 오류 발생");

        const data = await response.json();

        if (data.updateAt && Array.isArray(data.updateAt)) {
          const updatedDate = new Date(
            data.updateAt[0],  // 연도
            data.updateAt[1] - 1,  // 월 (0부터 시작)
            data.updateAt[2],  // 일
            data.updateAt[3],  // 시
            data.updateAt[4],  // 분
            data.updateAt[5]   // 초
          );

          setUpdateAt(
            `${updatedDate.getFullYear()}년 ${updatedDate.getMonth() + 1}월 ${updatedDate.getDate()}일 ${updatedDate.getHours().toString().padStart(2, "0")
            }:${updatedDate.getMinutes().toString().padStart(2, "0")} 업데이트`
          );
        } else {
          setUpdateAt("업데이트 정보 없음");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();
    fetchCafeInfo();
  }, [cafeId]);

  // 태그 정보 매핑
  const tagMappings = {
    wifi: { icon: "/img/wifi.png", label: "와이파이" },
    outlets: { icon: "/img/plug.png", label: "콘센트" },
    desk: { icon: "/img/desk.png", label: "책상" },
    restroom: { icon: "/img/toilet.png", label: "화장실" },
    parking: { icon: "/img/park.png", label: "주차" },
  };

  const parkingValueMap = {
    "가능_무료": "가능(무료)",
    "가능_유료": "가능(유료)",
    "가능_일부": "가능(일부)",
    "불가능": "불가능",
  };

  // 운영시간 데이터
  const operatingHours = {
    목: "9:00 ~ 21:00",
    금: "9:00 ~ 21:00",
    토: "10:00 ~ 13:00",
    일: "10:00 ~ 13:00",
    월: "9:00 ~ 21:00",
    화: "9:00 ~ 21:00",
    수: "9:00 ~ 21:00",
  };

  return (
    <div className="cafe-information-detail">
      {/* 운영시간 */}
      <div className="cafe-information-detail__header">
        <img
          src="/img/clock.png"
          alt="운영시간"
          className="cafe-information-detail__icon"
        />
        <div className="cafe-information-detail__label">운영시간</div>
        <div className="cafe-information-detail__value">
          <span className="operating">영업중 </span> 21:00 까지
          <img
            src={isHoursOpen ? "/img/toggle-up.png" : "/img/toggle-down.png"}
            alt="Toggle"
            className="cafe-information-detail__toggle"
            onClick={() => setIsHoursOpen(!isHoursOpen)}
          />
        </div>
      </div>
      {isHoursOpen && (
        <div className="cafe-information-detail__dropdown">
          {Object.entries(operatingHours).map(([day, time]) => (
            <div key={day} className="cafe-information-detail__dropdown-item">
              <span className="day">{day}</span> {time}
            </div>
          ))}
        </div>
      )}

      {/* 카페 세부 정보 */}
      {Object.entries(tagMappings).map(([key, { icon, label }]) => (
        <div key={key} className="cafe-information-detail__group">
          <img src={icon} alt={label} className="cafe-information-detail__icon" />
          <div className="cafe-information-detail__label">{label}</div>
          <div className="cafe-information-detail__value">
            {key === "parking" ? parkingValueMap[tags[key]] || tags[key] : tags[key]}
          </div>
        </div>
      ))}

      {/* 업데이트 시간 */}
      <div className="cafe-information-detail__updated">{updateAt}</div>
    </div>
  );
}

export default CafeInformationDetail;