import React from 'react';

const ReportStatus = ({ status }) => {
  // 상태에 따른 이미지 매핑
  const getStatusImage = (status) => {
    switch (status) {
      case 'accepted':
        return "/img/report-accepted.png";
      case 'denied':
        return "/img/report-denied.png";
      default:
        return "/img/report-wait.png";
    }
  };

  return (
    <div className="report-status">
      <img 
        src={getStatusImage(status)} // status를 props로 받아 이미지 변경
        alt={status} 
        style={{ width: '22.5px', height: '22.5px', borderRadius: '50%' }} 
      />
    </div>
  );
};

export default ReportStatus;
