import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/report/admin/pending/${id}`)      
    .then((res) => res.json())
      .then(setReport)
      .catch(console.error);
  }, [id]);

  const handleApprove = async () => {
    const confirm = window.confirm("해당 제보를 승인하시겠습니까?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:8080/report/admin/approve/${id}`, {
        method: "POST",
      });
      if (res.ok) {
        alert("승인 완료!");
        navigate("/admin/reports");
      } else {
        const text = await res.text();
        alert("승인 실패: " + text);
      }
    } catch (e) {
      console.error(e);
      alert("오류 발생");
    }
  };

  if (!report) return <p>불러오는 중...</p>;

  return (
    <div className="admin-report-detail">
      <h2>제보 상세</h2>
      <p><strong>카페 이름:</strong> {report.cafeName}</p>
      <p><strong>카카오 ID:</strong> {report.kakaoPlaceId}</p>
      <p><strong>내용:</strong> {report.content}</p>
      <p><strong>작성자:</strong> {report.userEmail}</p>
      <button onClick={handleApprove}>승인</button>
    </div>
  );
};

export default AdminReportDetail;