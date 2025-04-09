import React, { useState, useEffect } from "react";
import "./FAQ.css";
import "./Policy.css";
import { TopBar } from "../components";
import LongButton from "../components/LongButton";

const FAQ = () => {
  const [openIndexes, setOpenIndexes] = useState([]); // 열려 있는 질문의 인덱스를 관리
  const [activeTab, setActiveTab] = useState("faq"); // 기본 탭: FAQ
  const [feedbackText, setFeedbackText] = useState("")
  const [qas, setQas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faq/qa", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("응답 상태 코드:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("받아온 데이터:", data);
        setQas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("FAQ 데이터를 불러오는 중 오류 발생:", error);
        setLoading(false);
      });
  }, []);

  // 🔹 질문 클릭 시 답변 표시/숨김
  const toggleAnswer = (index) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index) // 이미 열려 있으면 닫기
        : [...prevIndexes, index] // 닫혀 있으면 열기
    );
  };


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value); // 입력값 상태 업데이트
  };

  const handleSubmitFeedback = () => {
    if (feedbackText.trim() === "") {
      alert("내용을 입력해주세요!");
      return;
    }

    const userEmail = localStorage.getItem("email");

    fetch("/api/faq/feedback", {  // 절대 경로로 수정
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: feedbackText,
        email: userEmail, // ✅ 이메일도 함께 전송
      }),
    })
      .then((response) => {
        console.log("응답 상태 코드:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("서버 응답 데이터:", data);
        alert(data.message || "피드백이 정상적으로 제출되었습니다!");
        setFeedbackText(""); // 입력 필드 초기화
      })
      .catch((error) => {
        console.error("피드백 제출 중 오류 발생:", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <div className="faq-page">
      <TopBar title="# TagCafe" subtitle="FAQ" showClose showHamburger={false} />

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
          {qas.map((faq, index) => (
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
          <LongButton optionText="제출하기" onClick={handleSubmitFeedback} />
        </div>
      )}
    </div>
  );
};

export default FAQ;