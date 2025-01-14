import React, { useState } from "react";
import "./FAQ.css";
import "./Policy.css";
import LongButton from "../components/LongButton";

const FAQ = () => {
  const [openIndexes, setOpenIndexes] = useState([]); // 열려 있는 질문의 인덱스를 관리
  const [activeTab, setActiveTab] = useState("faq"); // 기본 탭: FAQ
  const [feedbackText, setFeedbackText] = useState("")

  const toggleAnswer = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index)); // 이미 열려 있으면 닫기
    } else {
      setOpenIndexes([...openIndexes, index]); // 닫혀 있으면 열기
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value); // 입력값 상태 업데이트
  };

  const faqs = [
    {
      category: "서비스 관련",
      question: "필터를 어떻게 사용하나요?",
      answer: "필터는 검색창 옆의 버튼을 클릭하여 사용할 수 있습니다.",
    },
    {
      category: "서비스 관련",
      question: "회원 가입 없이 사용할 수 있나요?",
      answer: "회원 가입 없이도 일부 서비스를 이용할 수 있습니다.",
    },
    {
      category: "기능 관련",
      question: "내가 좋아하는 카페를 추가할 수 있나요?",
      answer: "내 프로필에서 좋아하는 카페를 추가할 수 있습니다.",
    },
  ];

  return (
    <div className="faq-page">
      {/* 헤더 */}
      <div className="policy-header">
        <div className="title-container">
          <h1 className="policy-title"># TagCafe</h1>
          <span className="policy-subtitle">FAQ</span>
        </div>
        <button className="close-button" onClick={() => window.history.back()}>
          ×
        </button>
      </div>

      {/* 탭 메뉴 */}
      <div className="faq-tabs">
        <button
          className={`faq-tab ${activeTab === "faq" ? "active" : ""}`}
          onClick={() => handleTabClick("faq")}
        >
          자주 묻는 질문
        </button>
        <button
          className={`faq-tab ${activeTab === "feedback" ? "active" : ""}`}
          onClick={() => handleTabClick("feedback")}
        >
          의견 및 오류 제보
        </button>
      </div>

      {/* 탭 내용 */}
      {activeTab === "faq" ? (
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleAnswer(index)}>
                <div className="faq-category">{faq.category}</div>
                <div className="faq-q">Q {faq.question}</div>
                <img
                  src={
                    openIndexes.includes(index)
                      ? "/img/toggle-up.png"
                      : "/img/toggle-down.png"
                  }
                  alt="toggle"
                  className="faq-toggle-icon"
                />
              </div>
              {openIndexes.includes(index) && (
                <div className="faq-answer">A {faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="feedback-form">
          <textarea
            className="feedback-textarea"
            placeholder="좋은 의견이 있거나 서비스에 오류가 있다면 편하게 알려주세요!"
            maxLength={200}
            value={feedbackText}
            onChange={handleFeedbackChange}
          />
          <div className="feedback-char-counter">
            {feedbackText.length}/200 {/* 현재 글자 수와 최대 글자 수 표시 */}
          </div>          
          <LongButton optionText="제출하기" onClick={() => alert("제출되었습니다!")} />
        </div>
      )}
    </div>
  );
};

export default FAQ;