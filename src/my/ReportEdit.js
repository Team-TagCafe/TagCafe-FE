import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar, BottomBar, LongButton } from "../components";
import CafeInformation from "../components/CafeInformation";
import "./MyEdit.css";

const ReportEdit = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [reportEditText, setReportEditText] = useState("");

  const handleReportEditChange = (event) => {
    setReportEditText(event.target.value); // 입력값 상태 업데이트
  };

  const mockReports = [
    {
      reportId: "1",
      name: "스테이 어도러블",
      address: "경기 용인시 기흥구 죽전로43번길 15-3",
      wifi: "빠름",
      outlets: "일부",
      desk: "적당함",
      restroom: "외부",
      parking: "가능(무료)",
      description: "카페 환경이 조용하고 깔끔합니다.",
      image: "/img/cafe-img.png",
    },
  ];

  const foundReport = mockReports.find((r) => r.reportId === reportId) || {
    name: "스테이어도러블",
    address: "경기 용인시 기흥구 죽전로43번길 15-3",
    wifi: "빠름",
    outlets: "없음",
    desk: "좁음",
    restroom: "외부",
    parking: "불가능",
    description: "",
    image: "/img/cafe-img.png",
  };

  const [cafeOptions, setCafeOptions] = useState({
    와이파이: foundReport.wifi,
    콘센트: foundReport.outlets,
    책상: foundReport.desk,
    화장실: foundReport.restroom,
    주차: foundReport.parking,
  });

  const handleSubmit = () => {
    alert(`제보한 카페 \"${foundReport.name}\"의 내용이 수정되었습니다.`);
    navigate("/my");
  };

  const handleCafeOptionChange = (category, option) => {
    setCafeOptions((prevOptions) => ({
      ...prevOptions,
      [category]: option,
    }));
  };

  return (
    <div className="my-edit-page">
      <TopBar title="# My" />

      <header className="my-edit-header">
        <button className="back-button" onClick={() => navigate("/my")}>
          <img src="/img/back-button.png" alt="뒤로가기" />
        </button>
        <h2>제보 수정</h2>
      </header>

      <section className="my-cafe-info">
        <img
          src={foundReport.image || "/img/default-cafe.png"}
          alt={foundReport.name}
          className="my-cafe-image"
        />
        <div>
          <h3 className="my-cafe-name">{foundReport.name || "카페 이름 없음"}</h3>
          <p className="my-cafe-address">{foundReport.address || "주소 없음"}</p>
        </div>
      </section>

      <section className="my-form">
        <CafeInformation onChange={handleCafeOptionChange} />

        <div className="my-edit-form">
          <textarea
            className="my-edit-textarea"
            placeholder="이 카페에 대해 제보하고 싶은 내용을 입력해주세요."
            maxLength={200}
            value={reportEditText}
            onChange={handleReportEditChange}
          />
          <div className="my-edit-char-counter">
            {reportEditText.length}/200 {/* 현재 글자 수와 최대 글자 수 표시 */}
          </div>
        </div>

        <div className="my-long-button-container">
          <LongButton
            optionText="수정하기"
            onClick={handleSubmit}
          />
        </div>
      </section>

      <BottomBar />
    </div>
  );
};

export default ReportEdit;
