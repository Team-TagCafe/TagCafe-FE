import React from 'react';

const ReportStatus = ({ status }) => {
  // 상태에 따른 이미지 매핑
  const getStatusImage = (status) => {
    switch (status) {
      case 'accepted': // 'accepted' 상태일 때
        return "/img/report-accepted.png";
      case 'denied': // 'denied' 상태일 때
        return "/img/report-denied.png";
      default: // 그 외의 경우(대기 상태 등)
        return "/img/report-wait.png";
    }
  };

  return (
    <div className="report-status">
      <img
        src={getStatusImage(status)} // 상태에 따라 이미지 경로 결정
        alt={status} // alt 텍스트로 상태 값 사용
        style={{ width: '22.5px', height: '22.5px', borderRadius: '50%' }}
      />
    </div>
  );
};

export default ReportStatus;
