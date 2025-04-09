import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminReports = () => {
  const [allReports, setAllReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/report/admin/all")
      .then((res) => res.json())
      .then(setAllReports)
      .catch(console.error);
  }, []);

  return (
    <div className="admin-reports">
      <h2>모든 제보 목록</h2>

      <section>
        <h3>검토중</h3>
        <ul className="admin-report-list">
          {allReports.filter(r => r.status === "PENDING").map((report) => (
            <li key={report.reportedCafeId} className="admin-report-item" onClick={() => navigate(`/admin/reports/${report.reportedCafeId}`)}>
              <div><strong>{report.cafeName || "이름 없음"}</strong> ({report.kakaoPlaceId})</div>
              <div><small>작성자: {report.userEmail}</small></div>
            </li>
          ))}
        </ul>
      </section>

      <br></br>
      <section>
        <h3>승인됨</h3>
        <ul className="admin-report-list">
          {allReports.filter(r => r.status === "APPROVED").map((report) => (
            <li key={report.reportedCafeId} className="admin-report-item" onClick={() => navigate(`/admin/reports/${report.reportedCafeId}`)}>
              <div><strong>{report.cafeName || "이름 없음"}</strong> ({report.kakaoPlaceId})</div>
              <div><small>작성자: {report.userEmail}</small></div>
            </li>
          ))}
        </ul>
      </section>

      <br></br>

      <section>
        <h3>반려됨</h3>
        <ul className="admin-report-list">
          {allReports.filter(r => r.status === "REJECTED").map((report) => (
            <li key={report.reportedCafeId} className="admin-report-item" onClick={() => navigate(`/admin/reports/${report.reportedCafeId}`)}>
              <div><strong>{report.cafeName || "이름 없음"}</strong> ({report.kakaoPlaceId})</div>
              <div><small>작성자: {report.userEmail}</small></div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminReports;