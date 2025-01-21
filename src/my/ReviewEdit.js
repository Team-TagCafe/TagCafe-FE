import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar, BottomBar, LongButton } from "../components";
import CafeInformation from "../components/CafeInformation";
import "./MyEdit.css";

const ReviewEdit = () => {
  const { cafeId } = useParams();
  const navigate = useNavigate();
  const [reviewEditText, setreviewEditText] = useState("")
  
  const handleReviewEditChange = (event) => {
    setreviewEditText(event.target.value); // 입력값 상태 업데이트
  };

  const mockReviews = [
    {
      cafeId: "1",
      name: "스테이 어도러블",
      address: "경기 용인시 기흥구 죽전로43번길 15-3",
      rating: 4,
      wifi: "빠름", 
      outlets: "일부",
      desk: "적당함",
      restroom: "외부",
      parking: "가능(무료)",
      description: "조용하고 공부하기 좋은 카페입니다.",
      image: "/img/cafe-img.png",
    },
  ];

  const foundReview = mockReviews.find((r) => r.cafeId === cafeId) || {
    name: "",
    address: "",
    rating: 0,
    wifi: "빠름",
    outlets: "없음",
    desk: "좁음",
    restroom: "외부",
    parking: "불가능",
    description: "",
    image: "",
  };

  const [rating, setRating] = useState(foundReview.rating);
  const [cafeOptions, setCafeOptions] = useState({
    와이파이: foundReview.wifi,
    콘센트: foundReview.outlets,
    책상: foundReview.desk,
    화장실: foundReview.restroom,
    주차: foundReview.parking,
  });

  const handleRatingClick = (value) => setRating(value);

  const handleSubmit = () => {
    alert(`카페 "${foundReview.name}"의 리뷰가 수정되었습니다.`);
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
        <h2>리뷰 수정</h2>
      </header>

      <section className="my-cafe-info">
        <img src={foundReview.image || "/img/default-cafe.png"} alt={foundReview.name} className="my-cafe-image" />
        <div>
          <h3 className="my-cafe-name">{foundReview.name || "카페 이름 없음"}</h3>
          <p className="my-cafe-address">{foundReview.address || "주소 없음"}</p>
        </div>
      </section>

      <section className="my-form">
      <div className="my-rating-container">
        <h4>평점</h4>
        <div className="my-rating">
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

        <div className="my-edit-form">
          <textarea
            className="my-edit-textarea"
            placeholder="이 카페는 카공하기 어땠나요?
                        좋았던 점, 아쉬운 점을 공유해보세요!"
            maxLength={200}
            value={reviewEditText}
            onChange={handleReviewEditChange}
          />
          <div className="my-edit-char-counter">
            {reviewEditText.length}/200 {/* 현재 글자 수와 최대 글자 수 표시 */}
          </div>          
        </div>   
        <div className="my-long-button-container">
          <LongButton optionText="제출하기" onClick={() => alert("제출되었습니다!")} />
        </div>           
      </section>

      <BottomBar />
    </div>
  );
};

export default ReviewEdit;