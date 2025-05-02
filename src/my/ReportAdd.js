/*global kakao, google*/
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TopBar, BottomBar, LongButton } from "../components";
import CafeInformation from "../components/CafeInformation";
import Popup from "../components/Popup";
import "./ReportAdd.css"

const mapParkingOption = (option) => {
  const mapping = {
    "가능(무료)": "가능_무료",
    "가능(유료)": "가능_유료",
    "불가능": "불가능",
    "가능(일부)": "가능_일부"
  };
  return mapping[option] || "불가능"; // 기본값 설정
};

const ReportCafeAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reportText, setReportText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const userEmail = localStorage.getItem("email");
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [showOptionPopup, setShowOptionPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showNoCafePopup, setShowNoCafePopup] = useState(false);
  const [rating, setRating] = useState(3);

  const handleRatingClick = (value) => setRating(value);

  useEffect(() => {
    if (location.state) {
      const { selectedCafe, searchKeyword } = location.state;
      if (selectedCafe) setSelectedCafe(selectedCafe);
      if (searchKeyword) setSearchKeyword(searchKeyword);
    }
  }, [location]);

  const handleCafeSearch = () => {
    if (!searchKeyword.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    const places = new kakao.maps.services.Places();
    places.keywordSearch(searchKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const cafeResults = data.filter((place) => place.category_group_code === "CE7");
        setSearchResults(cafeResults);
      } else {
        alert("검색 결과가 없습니다.");
      }
    });
  };
  const handleSearchClick = () => {

    navigate("/reportsearch", {
      state: {
        searchKeyword,
        selectedCafe,
        from: "reportAdd",
      },
    });
  };

  const handleReportTextChange = (event) => {
    setReportText(event.target.value); // Update input value state
  };

  const [cafeOptions, setCafeOptions] = useState({
    wifi: "",
    outlets: "",
    desk: "",
    restroom: "",
    parking: "",
  });

  const handleCafeOptionChange = (category, option) => {
    setCafeOptions((prevOptions) => ({
      ...prevOptions,
      [category]: option,
    }));
  };

  const getGooglePlaceDetails = (placeName, lat, lng) => {
    return new Promise((resolve, reject) => {
      const service = new window.google.maps.places.PlacesService(document.createElement("div"));
      const request = {
        location: new google.maps.LatLng(lat, lng),
        radius: 100,
        query: placeName,
        language: "ko",
      };

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          const placeId = results[0].place_id;
          service.getDetails({ placeId, language: "ko" }, (details, detailStatus) => {
            if (detailStatus === google.maps.places.PlacesServiceStatus.OK) {
              resolve(details);
            } else {
              reject("장소 상세 정보 조회 실패");
            }
          });
        } else {
          reject("장소 검색 실패");
        }
      });
    });
  };

  const formatOpeningHours = (weekdayTextArray) => {
    if (!Array.isArray(weekdayTextArray) || weekdayTextArray.length === 0) {
      return "정보 없음";
    }

    return weekdayTextArray
      .map((entry) => {
        // 예외 항목 (요일 없는 문구)
        if (!entry.includes(":")) {
          if (entry.includes("시간이 달라질 수 있음")) return "기타: 시간 변동 가능";
          return `기타: ${entry}`;
        }

        const colonIndex = entry.indexOf(":");
        const day = entry.slice(0, colonIndex);
        const timeRange = entry.slice(colonIndex + 1).trim();

        if (!day || !timeRange) return `${day}: 정보 없음`;

        if (timeRange.includes("휴무일")) return `${day}: 휴무일`;
        if (timeRange.includes("24시간 영업")) return `${day}: 24시간 영업`;
        if (timeRange.includes("시간이 달라질 수 있음")) return `${day}: 시간 변동 가능`;

        let [startRaw, endRaw] = timeRange.split("~").map(s => s.trim());

        const startMatch = startRaw.match(/(오전|오후)?\s*(\d{1,2}):(\d{2})/);
        const endMatch = endRaw.match(/(오전|오후)?\s*(\d{1,2}):(\d{2})/);

        if (!startMatch || !endMatch) return `${day}: 정보 없음`;

        // 시작
        let startPeriod = startMatch[1]; // 오전/오후
        let startHour = parseInt(startMatch[2], 10);
        let startMinute = startMatch[3];

        // 끝
        let endPeriod = endMatch[1]; // 오전/오후
        let endHour = parseInt(endMatch[2], 10);
        let endMinute = endMatch[3];

        // 오전/오후 누락된 경우, 시작시간 기준으로 맞춰주기
        if (!endPeriod) {
          endPeriod = startPeriod || (endHour >= 12 ? "오후" : "오전");
        }

        if (!startPeriod) {
          startPeriod = startHour >= 12 ? "오후" : "오전";
        }

        // 0시는 오전 12시 처리
        if (startHour === 0) startHour = 12;
        if (endHour === 0) endHour = 12;

        return `${day}: ${startPeriod} ${startHour}:${startMinute} ~ ${endPeriod} ${endHour}:${endMinute}`;
      })
      .join(", ");
  };


  const handleSubmit = async () => {
    if (!userEmail) {
      setShowLoginPopup(true);
      return;
    }

    if (!selectedCafe) {
      setShowNoCafePopup(true);
      return;
    }

    const isOptionMissing = Object.values(cafeOptions).some((option) => option === "");
    if (isOptionMissing) {
      setShowOptionPopup(true);
      return;
    }

    const {
      id: kakaoPlaceId,
      place_name,
      road_address_name,
      x,
      y,
      phone,
    } = selectedCafe;

    try {
      // 구글에서 추가 정보 요청
      const googleDetails = await getGooglePlaceDetails(place_name, parseFloat(y), parseFloat(x));

      const website = googleDetails.website || "정보 없음";
      const openingHours =
        googleDetails.opening_hours?.weekday_text?.length > 0
          ? formatOpeningHours(googleDetails.opening_hours.weekday_text)
          : "정보 없음";

      const reportData = {
        userEmail,
        kakaoPlaceId,
        googlePlaceId: googleDetails.place_id,
        cafeName: place_name,
        address: road_address_name,
        latitude: y,
        longitude: x,
        phoneNumber: phone || "정보 없음",
        websiteUrl: website,
        openingHours: openingHours,
        content: reportText,
        wifi: cafeOptions.wifi,
        outlets: cafeOptions.outlets,
        desk: cafeOptions.desk,
        restroom: cafeOptions.restroom,
        parking: mapParkingOption(cafeOptions.parking),
        rating,
      };

      console.log("최종 reportData:", reportData);

      // 중복 확인
      const checkResponse = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/cafes/kakao/${kakaoPlaceId}`
      );
      if (checkResponse.ok) {
        const result = await checkResponse.json();
        if (result.exists !== false) {
          alert("이미 등록된 카페입니다.");
          return;
        }
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        navigate("/my");
      } else {
        alert("제보에 실패했습니다.");
      }
    } catch (error) {
      console.error("제보 중 오류 발생:", error);
      alert("서버 오류로 제보에 실패했습니다.");
    }
  };

  return (
    <div className="report-cafe-add-page">
      <TopBar title="# My" />

      <header className="report-cafe-add-header">
        <div className="report-header-container">
          <button className="back-button" onClick={() => navigate("/my")}>
            <img src="/img/back-button.png" alt="뒤로가기" />
          </button>
          <h2>카페 제보</h2>
        </div>

        <div className="report-add-search">
          <input
            type="text"
            className="report-search-input"
            placeholder="카페를 검색해보세요 (지도에서 선택)"
            value={searchKeyword}
            readOnly
            onClick={handleSearchClick}
          />
          <button className="report-search-button" onClick={handleSearchClick}>
            <img src="/img/search.png" alt="Search" />
          </button>
        </div>
      </header>

      <section className="report-form">
        <div className="report-cafe-rating-container">
          <h4>평점</h4>
          <div className="report-cafe-rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={value <= rating ? "star selected" : "star"}
                onClick={() => handleRatingClick(value)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <CafeInformation onChange={handleCafeOptionChange} />

        <div className="report-text-form">
          <textarea
            className="report-textarea"
            placeholder="카페 정보를 입력해주세요.
                        와이파이, 콘센트, 화장실 등에 대한 정보를 작성해주세요!"
            maxLength={200}
            value={reportText}
            onChange={handleReportTextChange}
          />
          <div className="report-char-counter">
            {reportText.length}/200 {/* Current character count */}
          </div>
        </div>

        <div className="long-button-container">
          <LongButton optionText="제보하기" onClick={handleSubmit} />
        </div>
      </section>

      {showOptionPopup && (
        <Popup
          message="모든 옵션을 선택해주세요."
          onConfirm={() => setShowOptionPopup(false)}
          showCancel={false}
        />
      )}
      {showLoginPopup && (
        <Popup
          message="로그인이 필요합니다. 로그인 후 다시 시도해주세요."
          onConfirm={() => setShowLoginPopup(false)}
          showCancel={false}
        />
      )}

      {showNoCafePopup && (
        <Popup
          message="카페를 먼저 선택해주세요."
          onConfirm={() => setShowNoCafePopup(false)}
          showCancel={false}
        />
      )}
      <BottomBar />
    </div>
  );
};

export default ReportCafeAdd;