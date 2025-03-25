import React, { useState, useEffect } from "react";
import "./CafeInformationDetail.css";

function parseOpeningHours(hoursString) {
  const lines = hoursString.split("\n");
  const korToShort = {
    월요일: "월",
    화요일: "화",
    수요일: "수",
    목요일: "목",
    금요일: "금",
    토요일: "토",
    일요일: "일",
  };

  return lines.map((line) => {
    const [dayFull, timeRange] = line.split(": ");
    if (!dayFull || !timeRange) return null;

    const dayShort = korToShort[dayFull.trim()];

    // 24시간 영업 케이스 처리
    if (timeRange.includes("24시간 영업")) {
      return { day: dayShort, start: "00:00", end: "24:00" };
    }

    const [startRaw, endRaw] = timeRange.split(" ~ ");
    const start = convertTo24Hour(startRaw.trim());
    const end = convertTo24Hour(endRaw.trim());

    return { day: dayShort, start, end };
  }).filter(Boolean);
}

function convertTo24Hour(timeStr) {
  const isPM = timeStr.includes("오후");
  const [hour, minute] = timeStr.replace(/(오전|오후)\s*/, "").split(":").map(Number);

  let hr = isPM && hour !== 12 ? hour + 12 : hour;
  if (!isPM && hour === 12) hr = 0;

  return `${hr.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

function getBusinessStatus(parsedHours) {
  const now = new Date();
  const todayIdx = now.getDay(); // 0 = 일, 1 = 월
  const dayMap = ["일", "월", "화", "수", "목", "금", "토"];
  const today = dayMap[todayIdx];
  const nowTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

  const todayInfo = parsedHours.find((entry) => entry.day === today);
  if (!todayInfo) return "정보 없음";

  if (nowTime < todayInfo.start) {
    return `곧 영업 시작 ${todayInfo.start}부터`;
  } else if (nowTime >= todayInfo.start && nowTime < todayInfo.end) {
    return `영업중 ${todayInfo.end}까지`;
  } else {
    // 다음날 정보 찾아서 표시
    for (let i = 1; i <= 7; i++) {
      const nextIdx = (todayIdx + i) % 7;
      const nextDay = dayMap[nextIdx];
      const next = parsedHours.find((e) => e.day === nextDay);
      if (next) return `영업 마감 내일 ${next.start} 오픈`;
    }
    return "정보 없음";
  }
}


function CafeInformationDetail({ cafeId }) {
  const [isHoursOpen, setIsHoursOpen] = useState(false); // 운영시간 토글 상태
  const [tags, setTags] = useState({}); // 카페 태그 상태
  const [updateAt, setUpdateAt] = useState(""); // 업데이트 시간 상태
  const [openingHours, setOpeningHours] = useState(null);

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
        let hours = data.openingHours;
        if (Array.isArray(hours)) {
          hours = hours.join("\n");
        } else if (typeof hours === "string") {
          hours = hours.includes(",") ? hours.split(",").join("\n") : hours;
        }

        setOpeningHours(hours || null);

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

  return (
    <div className="cafe-information-detail">
      {/* 운영시간 */}
      <div className="cafe-information-detail__header">
        <img src="/img/clock.png" alt="운영시간" className="cafe-information-detail__icon" />
        <div className="cafe-information-detail__label">운영시간</div>
        <div className="cafe-information-detail__value">
          <span className="operating">
            {openingHours ? (
              (() => {
                const status = getBusinessStatus(parseOpeningHours(openingHours));

                const boldKeywords = ["영업중", "곧 영업 시작", "영업 마감"];
                const keyword = boldKeywords.find((kw) => status.startsWith(kw));

                if (keyword) {
                  const rest = status.slice(keyword.length).trim();
                  return (
                    <>
                      <strong>{keyword}</strong> {rest}
                    </>
                  );
                } else {
                  return status; // fallback
                }
              })()
            ) : (
              "정보 없음"
            )}
          </span>

          <img
            src={isHoursOpen ? "/img/toggle-up.png" : "/img/toggle-down.png"}
            alt="Toggle"
            className="cafe-information-detail__toggle"
            onClick={() => setIsHoursOpen(!isHoursOpen)}
          />
        </div>
      </div>

      {isHoursOpen && openingHours && (
        <div className="cafe-information-detail__dropdown">
          {parseOpeningHours(openingHours).map(({ day, start, end }, idx) => (
            <div key={idx} className="cafe-information-detail__dropdown-item">
              <strong>{day}</strong> {start} ~ {end}
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