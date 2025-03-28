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

  const fetchPhotosFromGoogle = (placeId) => {
    return new Promise((resolve, reject) => {
      const service = new window.google.maps.places.PlacesService(document.createElement("div"));
      service.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place.photos) {
          const urls = place.photos.map(photo => photo.getUrl({ maxWidth: 400 }));
          resolve(urls);
        } else {
          resolve([]); // 사진 없을 때 빈 배열 반환
        }
      });
    });
  };  

  const handleApprove = async () => {
    const confirm = window.confirm("해당 제보를 승인하시겠습니까?");
    if (!confirm) return;

    try {
      const photos = await fetchPhotosFromGoogle(report.googlePlaceId);
      const photoUrls = photos.slice(0, 5);
  
      const res = await fetch(`http://localhost:8080/report/admin/approve/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrls })
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
  
  const handleDelete = async () => {
    const confirm = window.confirm("해당 제보를 삭제하시겠습니까?");
    if (!confirm) return;
  
    try {
      const res = await fetch(`http://localhost:8080/report/admin/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("반려 처리 완료!");
        navigate("/admin/reports");
      } else {
        const text = await res.text();
        alert("삭제 실패: " + text);
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
      <button onClick={handleDelete} style={{ marginLeft: "10px"}}>반려</button>
    </div>
  );
};

export default AdminReportDetail;