import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar, BottomBar, LongButton } from "../components";
import CafeInformation from "../components/CafeInformation";
import Popup from "../components/Popup";
import "./MyEdit.css";

const ReviewEdit = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(null);
  const [reviewEditText, setReviewEditText] = useState("");
  const [rating, setRating] = useState(0);
  const [cafeOptions, setCafeOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({
    wifi: "",
    outlets: "",
    desk: "",
    restroom: "",
    parking: ""
  });
  const [showEditPopup, setShowEditPopup] = useState(false);

  const optionMap = {
    "가능(무료)": "가능_무료",
    "가능(유료)": "가능_유료",
    "불가능": "불가능",
    "가능(일부)": "가능_일부",
  };

  const reverseOptionMap = {
    가능_무료: "가능(무료)",
    가능_유료: "가능(유료)",
    불가능: "불가능",
    가능_일부: "가능(일부)",
  };

  useEffect(() => {
    if (!reviewId || reviewId === "undefined") {
      console.error("Invalid reviewId:", reviewId);
      return;
    }

    const fetchReview = async () => {
      try {
        const response = await fetch(`http://localhost:8080/my/reviews/${reviewId}`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        setReviewData(data.review);
        setReviewEditText(data.review.content);
        setRating(data.review.rating);

        const options = {
          wifi: data.review.wifi,
          outlets: data.review.outlets,
          desk: data.review.desk,
          restroom: data.review.restroom,
          parking: data.review.parking,
        };

        setCafeOptions(options);
        setSelectedOptions(options);

        setReviewData((prev) => ({
          ...prev,
          cafeName: data.cafeName,
          cafeAddress: data.cafeAddress,
        }));
      } catch (error) {
        console.error("Error fetching review:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [reviewId]);

  const handleReviewEditChange = (event) => {
    setReviewEditText(event.target.value);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleCafeOptionChange = (category, option) => {
    const newOptionValue = optionMap[option] || option;

    setCafeOptions((prevOptions) => ({
      ...prevOptions,
      [category]: newOptionValue,
    }));

    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [category]: newOptionValue,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const requestBody = {
        content: reviewEditText,
        rating,
        wifi: cafeOptions.wifi,
        outlets: cafeOptions.outlets,
        desk: cafeOptions.desk,
        restroom: cafeOptions.restroom,
        parking: cafeOptions.parking,
      };

      const response = await fetch(`http://localhost:8080/my/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Failed to update review");

      setShowEditPopup(true); // Show popup instead of navigating immediately
    } catch (error) {
      console.error("Error updating review:", error);
      alert("리뷰 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
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
        <img src={reviewData?.image || "/img/cafe-img.png"} alt={reviewData?.name || "카페 이미지"} className="my-cafe-image" />
        <div>
          <h3 className="my-cafe-name">{reviewData?.cafeName || "카페 이름 없음"}</h3>
          <p className="my-cafe-address">{reviewData?.cafeAddress || "주소 없음"}</p>
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

       <CafeInformation onChange={handleCafeOptionChange} selectedOptions={selectedOptions} />
        
        <div className="my-edit-form">
          <textarea
            className="my-edit-textarea"
            placeholder="이 카페는 카공하기 어땠나요? 좋았던 점, 아쉬운 점을 공유해보세요!"
            maxLength={200}
            value={reviewEditText}
            onChange={handleReviewEditChange}
          />
          <div className="my-edit-char-counter">
            {reviewEditText.length}/200
          </div>
        </div>

        <div className="my-long-button-container">
          <LongButton optionText="제출하기" onClick={handleSubmit} />
        </div>
      </section>

      {showEditPopup && (
        <Popup
          message="리뷰가 수정되었습니다."
          onConfirm={() => {
              setShowEditPopup(false);
              navigate("/my");
          }}
          showCancel={false}
        />
      )}

      <BottomBar />
    </div>
  );
};

export default ReviewEdit;