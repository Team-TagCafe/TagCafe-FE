import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar, BottomBar, LongButton } from "../components";
import CafeInformation from "../components/CafeInformation";
import "./ReportAdd.css"

const ReportCafeAdd = () => {
  const navigate = useNavigate();
  const [reportText, setReportText] = useState("");
  const [searchValue, setSearchValue] = useState("");


  const handleSearchChange = (event) => {
    setSearchValue(event.target.value); // 검색 값 업데이트
  };

  const handleSearchFocus = () => {
    navigate("/report/search"); //report 카페검색 임시 페이지
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

  const handleSubmit = () => {
    alert("제보가 완료되었습니다!");
    navigate("/my");
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
            value={searchValue}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            className="report-search-input"
            placeholder="지역, 카페 이름으로 검색"
          />
          <button className="report-search-button">
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