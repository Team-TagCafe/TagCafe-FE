import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminReports = () => {
  const [pendingReports, setPendingReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/report/admin/pending")
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
        <ul>
          {pendingReports.map((report) => (
            <li key={report.reportedCafeId} onClick={() => navigate(`/admin/reports/${report.reportedCafeId}`)}>
              {report.cafeName || "이름 없음"} ({report.kakaoPlaceId})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminReports;