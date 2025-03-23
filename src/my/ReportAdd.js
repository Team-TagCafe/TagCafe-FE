/*global kakao*/

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TopBar, BottomBar, LongButton } from "../components";
import CafeInformation from "../components/CafeInformation";
import "./ReportAdd.css"

const ReportCafeAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reportText, setReportText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const userEmail= localStorage.getItem("email");
  const [selectedCafe, setSelectedCafe] = useState(null);

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
    와이파이: "",
    콘센트: "",
    책상: "",
    화장실: "",
    주차: "",
  });

  const handleCafeOptionChange = (category, option) => {
    setCafeOptions((prevOptions) => ({
      ...prevOptions,
      [category]: option,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedCafe) {
      alert("카페를 먼저 선택해주세요.");
      return;
    }
  
    const { place_name, id: kakaoPlaceId } = selectedCafe;
  
    try {
      const response = await fetch('http://localhost:8080/report', {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          userEmail: userEmail, 
          kakaoPlaceId: kakaoPlaceId,
          content: reportText,
          wifi: cafeOptions["와이파이"],
          outlet: cafeOptions["콘센트"],
          desk: cafeOptions["책상"],
          restroom: cafeOptions["화장실"],
          parking: cafeOptions["주차"]
        }),
      });
  
      if (response.ok) {
        alert("제보가 완료되었습니다!");
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

      <BottomBar />
    </div>
  );
};

export default ReportCafeAdd;