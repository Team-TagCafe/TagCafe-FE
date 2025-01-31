import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar, BottomBar, LongButton } from "../components";
import CafeInformation from "../components/CafeInformation";
import "./ReviewWrite.css";
import { useCafe } from "../home/CafeContext";

const ReviewWrite = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cafes } = useCafe(); 

    const [reviewWriteText, setreviewWriteText] = useState("")

    const handleReviewWriteChange = (event) => {
        setreviewWriteText(event.target.value); // 입력값 상태 업데이트
    };

    const foundReview = cafes.find((cafe) => cafe.id === parseInt(id)) || {
        place_name: "카페 이름 없음",
        address_name: "주소 없음",
        saved: false,
        x: 0,
        y: 0,
        tags: [],
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

    const handleCafeOptionChange = (category, option) => {
        setCafeOptions((prevOptions) => ({
            ...prevOptions,
            [category]: option,
        }));
    };

    return (
        <div className="cafe-detail-edit-page">
            <TopBar
                title="# Review"
                showHamburger={true} />

            <header className="cafe-detail-edit-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <img src="/img/back-button.png" alt="뒤로가기" />
                </button>
                <h2>리뷰 작성</h2>
            </header>

            <section className="cafe-detail-cafe-info">
                <img src={foundReview.image || "/img/cafe-img.png"} alt={foundReview.place_name} className="cafe-detail-cafe-image" />
                <div>
                    <h3 className="cafe-detail-cafe-name">{foundReview.place_name || "카페 이름 없음"}</h3>
                    <p className="cafe-detail-cafe-address">{foundReview.address_name || "주소 없음"}</p>
                </div>
            </section>

            <section className="cafe-detail-form">
                <div className="cafe-detail-rating-container">
                    <h4>평점</h4>
                    <div className="cafe-detail-rating">
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

                <div className="cafe-detail-edit-form">
                    <textarea
                        className="cafe-detail-edit-textarea"
                        placeholder="이 카페는 카공하기 어땠나요?
                        좋았던 점, 아쉬운 점을 공유해보세요!"
                        maxLength={200}
                        value={reviewWriteText}
                        onChange={handleReviewWriteChange}
                    />
                    <div className="cafe-detail-edit-char-counter">
                        {reviewWriteText.length}/200 {/* 현재 글자 수와 최대 글자 수 표시 */}
                    </div>
                </div>
                <div className="cafe-detail-long-button-container">
                    <LongButton optionText="작성 완료" onClick={() => alert("작성 완료되었습니다!")} />
                </div>
            </section>

            <BottomBar />
        </div>
    );
};

export default ReviewWrite;
