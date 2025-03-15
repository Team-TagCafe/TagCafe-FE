import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TopBar, BottomBar, LongButton } from "../components";
import CafeInformation from "../components/CafeInformation";
import "./ReviewWrite.css";

const ReviewWrite = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const cafe = location.state?.cafe || {
        cafeName: "카페 이름 없음",
        address: "주소 없음",
        image: "",
    };

    const [content, setContent] = useState("");
    const [rating, setRating] = useState(3); // 기본 평점 설정
    const [cafeOptions, setCafeOptions] = useState({
        wifi: "빠름",
        outlets: "없음",
        desk: "좁음",
        restroom: "외부",
        parking: "불가능",
    });

    const handleRatingClick = (value) => setRating(value);
    const handleCafeOptionChange = (category, option) => {
        setCafeOptions((prevOptions) => ({
            ...prevOptions,
            [category]: option,
        }));
    };

    const userEmail = localStorage.getItem("email");
    
    if (!userEmail) {
        alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
        return;
    }

    const handleReviewSubmit = async () => {
        const reviewData = {
            cafeId: parseInt(id),
            userEmail,
            rating,
            content,
            wifi: cafeOptions["wifi"],
            outlets: cafeOptions["outlets"],
            desk: cafeOptions["desk"],
            restroom: cafeOptions["restroom"],
            parking: cafeOptions["parking"],
        };

        try {
            const response = await fetch("http://localhost:8080/reviews/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                alert("리뷰가 저장되었습니다.");
                navigate(-1);
            } else {
                alert("리뷰 저장에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("리뷰 저장 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="cafe-detail-edit-page">
            <TopBar title="# Review" showHamburger={true} />

            <header className="cafe-detail-edit-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <img src="/img/back-button.png" alt="뒤로가기" />
                </button>
                <h2>리뷰 작성</h2>
            </header>

            <section className="cafe-detail-cafe-info">
                <img src={cafe.image || "/img/cafe-img.png"} alt={cafe.cafeName} className="cafe-detail-cafe-image" />
                <div>
                    <h3 className="cafe-detail-cafe-name">{cafe.cafeName}</h3>
                    <p className="cafe-detail-cafe-address">{cafe.address}</p>
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
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="cafe-detail-edit-char-counter">
                        {content.length}/200 {/* 현재 글자 수와 최대 글자 수 표시 */}
                    </div>
                </div>
                <div className="cafe-detail-long-button-container">
                    <LongButton optionText="작성 완료" onClick={handleReviewSubmit} />
                </div>
            </section>

            <BottomBar />
        </div>
    );
};

export default ReviewWrite;