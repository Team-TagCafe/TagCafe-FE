import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar, BottomBar, LongButton } from "../components";
import CafeInformation from "../components/CafeInformation";
import Popup from "../components/Popup"; // Assuming Popup component exists
import "./MyEdit.css";
const optionMap = {
  "가능(무료)": "가능_무료",
  "가능(유료)": "가능_유료",
  "불가능": "불가능",
  "가능(일부)": "가능_일부",
};

const ReportEdit = () => {
  const { reportedCafeId } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [cafeOptions, setCafeOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [reportEditText, setReportEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/report/${reportedCafeId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        const parseOption = (val) => optionMap[val] || val;

        const options = {
          wifi: parseOption(data.wifi),
          outlets: parseOption(data.outlets),
          desk: parseOption(data.desk),
          restroom: parseOption(data.restroom),
          parking: parseOption(data.parking),
        };

        setReportData(data);
        setCafeOptions(options);
        setSelectedOptions(options);
        setReportEditText(data.content || "");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [reportedCafeId]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

    
      const requestBody = {
        content: reportEditText,
        wifi: cafeOptions.wifi,
        outlets: cafeOptions.outlets,
        desk: cafeOptions.desk,
        restroom: cafeOptions.restroom,
        parking: cafeOptions.parking,
      };

      console.log("Request body:", requestBody);

      const response = await fetch(`http://localhost:8080/report/${reportedCafeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      setShowEditPopup(true);
    } catch (error) {
        console.error("Error updating report:", error);
        alert("제보 수정에 실패했습니다.");
      } finally {
        setLoading(false);
      }
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



  return (
    <div className="my-edit-page">
      <TopBar title="# My" />

      <header className="my-edit-header">
        <button className="back-button" onClick={() => navigate("/my")}>
          <img src="/img/back-button.png" alt="뒤로가기" />
        </button>
        <h2>제보 수정</h2>
      </header>

      {loading ? (
        <div>불러오는 중...</div>
      ) : error ? (
        <div>오류 발생: {error}</div>
      ) : !reportData ? (
        <div>불러오는 중...</div>
      ) : (
        <>
          <section className="my-cafe-info">
            <img
              src={"/img/cafe-img.png"}
              alt={reportData.cafeName}
              className="my-cafe-image"
            />
            <div>
              <h3 className="my-cafe-name">{reportData.cafeName}</h3>
              <p className="my-cafe-address">{reportData.address}</p>
            </div>
          </section>

        </>
      )}

      <section className="my-form">
        <CafeInformation onChange={handleCafeOptionChange} selectedOptions={selectedOptions} />

        <div className="my-edit-form">
          <textarea
            className="my-edit-textarea"
            placeholder="이 카페에 대해 제보하고 싶은 내용을 입력해주세요."
            maxLength={200}
            value={reportEditText}
            onChange={(e) => setReportEditText(e.target.value)}
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

      {showEditPopup && (
        <Popup 
          message={`제보한 카페 "${reportData.cafeName}"의 내용이 수정되었습니다.`} 
          onConfirm={() => {
            setShowEditPopup(false);
            navigate("/my");
        }}
          showCancel={false}
        />
      )}
    </div>
  );
};

export default ReportEdit;
