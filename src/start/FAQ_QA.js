import React, { useState } from "react";
import "./FAQ_QA.css";
import "./Policy.css"

const FAQQA = () => {
  const [openIndexes, setOpenIndexes] = useState([]); // 열려 있는 질문의 인덱스를 관리

  const toggleAnswer = (index) => {
    if (openIndexes.includes(index)) {
      // 이미 열려 있으면 닫기
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      // 닫혀 있으면 열기
      setOpenIndexes([...openIndexes, index]);
    }
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

      {/* 메뉴 탭 */}
      <div className="faq-tabs">
        <button className="faq-tab active">자주 묻는 질문</button>
        <button className="faq-tab">의견 및 오류 제보</button>
      </div>

      {/* FAQ 리스트 */}
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <div className="faq-category">{faq.category}</div>
              <div className="faq-q">
                Q {faq.question}
              </div>
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
    </div>
  );
};

export default FAQQA;