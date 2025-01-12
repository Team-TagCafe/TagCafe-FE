import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="privacy-policy-page">
      {/* 상단 바 */}
      <div className="privacy-policy-header">
        <div className="title-container">
          <h1 className="privacy-policy-title"># TagCafe</h1>
          <span className="privacy-policy-subtitle">개인정보처리방침</span>
       </div>
        <button className="close-button" onClick={handleBack}>
          ×
        </button>
      </div>

      {/* 개인정보처리방침 내용 */}
      <div className="privacy-policy-content">
        <p>
          [앱 이름] ("본 앱")은 사용자의 개인정보 보호를 중요하게 생각합니다.
          본 앱은 「개인정보 보호법」 및 관련 법령에 따라 사용자의 개인정보를
          적법하고 안전하게 처리하기 위해 최선을 다하고 있습니다.
        </p>
        <h3>1. 수집하는 개인정보 항목</h3>
        <p>본 앱은 다음과 같은 개인정보를 수집할 수 있습니다:</p>
        <ul>
          <li>
            <strong>필수 정보:</strong> 회원가입 시 제공되는 정보: 이름, 이메일
            주소, 비밀번호 서비스 이용 기록: 앱 사용 시간, 설정된 시간 제한
            정보
          </li>
          <li>
            <strong>선택 정보:</strong> 사용자가 설정한 알림 설정 및 기타
            개인화된 설정
          </li>
        </ul>

        <h3>2. 개인정보 수집 방법</h3>
        <p>본 앱은 다음과 같은 방법으로 개인정보를 수집합니다:</p>
        <ul>
          <li>회원가입 및 앱 사용 중 사용자가 직접 입력한 정보</li>
          <li>
            앱 사용 과정에서 자동으로 생성되고 수집되는 정보 (예: 사용 시간,
            통계 데이터)
          </li>
        </ul>

        <h3>3. 개인정보의 이용 목적</h3>
        <p>본 앱은 수집한 개인정보를 다음의 목적을 위해 사용합니다:</p>
        <ul>
          <li>서비스 제공: 앱 사용 시간 관리, 통계 제공, 사용자 알림 등</li>
          <li>사용자 지원: 문의 사항 처리 및 고객 지원 제공</li>
          <li>서비스 개선: 앱 사용 데이터를 기반으로 서비스 품질 향상</li>
        </ul>

        <h3>4. 개인정보의 보유 및 이용 기간</h3>
        <p>본 앱은 개인정보 보유 및 이용 기간을 다음과 같이 설정합니다:</p>
        <ul>
          <li>회원 정보: 회원 탈퇴 시 즉시 삭제</li>
          <li>서비스 이용 기록: 목적 달성 후 또는 사용자가 삭제 요청 시 즉시 삭제</li>
        </ul>

        <h3>5. 개인정보의 제3자 제공</h3>
        <p>
          본 앱은 사용자의 개인정보를 외부에 제공하지 않습니다. 다만, 법령에
          따라 필요한 경우 또는 사용자의 동의가 있는 경우에 한해 제공할 수
          있습니다.
        </p>

        <h3>6. 개인정보 처리 위탁</h3>
        <p>본 앱은 원활한 서비스 제공을 위해 개인정보 처리를 외부에 위탁하지 않습니다.</p>

        <h3>7. 개인정보의 안전성 확보 조치</h3>
        <p>본 앱은 사용자의 개인정보를 안전하게 보호하기 위해 다음과 같은 조치를 취하고 있습니다:</p>
        <ul>
          <li>데이터 암호화: 사용자의 데이터를 암호화하여 저장 및 전송</li>
          <li>접근 제한: 개인정보 접근 권한을 최소화하고 보안 시스템을 운영</li>
        </ul>

        <h3>8. 이용자의 권리</h3>
        <p>사용자는 언제든지 자신의 개인정보에 대한 다음의 권리를 행사할 수 있습니다:</p>
        <ul>
          <li>개인정보 조회, 수정, 삭제 요청</li>
          <li>개인정보 처리 정지 요청</li>
        </ul>

        <h3>9. 개인정보 보호책임자</h3>
        <p>개인정보와 관련된 문의 사항은 아래의 개인정보 보호책임자에게 연락해 주시기 바랍니다:</p>
        <ul>
          <li>성명: 김태그</li>
          <li>이메일: [example@email.com]</li>
        </ul>

        <h3>10. 개인정보처리방침의 변경</h3>
        <p>본 방침은 변경될 수 있으며, 변경 시 앱 내 공지사항을 통해 사전에 안내드립니다.</p>
        <p>최종 개정일: [YYYY-MM-DD]</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;