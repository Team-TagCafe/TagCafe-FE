import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminReports = () => {
  const [pendingReports, setPendingReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/report/admin/pending")      
    .then((res) => res.json())
      .then(setPendingReports)
      .catch(console.error);
  }, []);

  return (
    <div className="admin-reports">
      <h2>미승인 제보 목록</h2>
      {pendingReports.length === 0 ? (
        <p>승인 대기 중인 제보가 없습니다.</p>
      ) : (
        <ul className="admin-report-list">
          {pendingReports.map((report) => (
            <li
              key={report.reportedCafeId}
              className="admin-report-item"
              onClick={() => navigate(`/admin/reports/${report.reportedCafeId}`)}
            >
              <div><strong>{report.cafeName || "이름 없음"}</strong> ({report.kakaoPlaceId})</div>
              <div><small>작성자: {report.userEmail}</small></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminReports;