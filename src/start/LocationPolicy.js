import React from "react";
import { useNavigate } from "react-router-dom";
import "./Policy.css";

function LocationPolicy() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="policy-page">
      {/* 상단 바 */}
      <div className="policy-header">
        <div className="title-container">
          <h1 className="policy-title"># TagCafe</h1>
          <span className="policy-subtitle">위치서비스 약관</span>
        </div>
        <button className="close-button" onClick={handleBack}>
          ×
        </button>
      </div>

      {/* 위치서비스 약관 내용 */}
      <div className="policy-content">
        <p>
          본 위치서비스 이용약관(이하 "약관")은 앱 이름이 제공하는 위치
          서비스(이하 "서비스")의 이용과 관련하여 본앱과 사용자 간의 권리,
          의무 및 책임 사항을 규정합니다. 사용자는 본 약관에 동의함으로써 위치
          기반 서비스를 이용할 수 있습니다.
        </p>

        <h3>1. 위치정보의 수집 및 이용</h3>
        <ul>
          <li>
            본 앱은 사용자의 위치정보를 수집하여 다음과 같은 목적에 사용합니다:
          </li>
          <ul>
            <li>사용자의 위치와 근접한 서비스 정보 제공</li>
            <li>맞춤형 추천 서비스 제공</li>
            <li>
              위치 기반으로 한 도착 및 주변 서비스 제공
            </li>
          </ul>
        </ul>

        <h3>2. 위치정보의 제3자 제공</h3>
        <p>
          본 앱은 수집된 위치정보를 제3자에게 제공하지 않습니다. 단, 아래의
          경우 예외로 합니다:
        </p>
        <ul>
          <li>사용자가 별도로 동의한 경우</li>
          <li>법령에 따라 요구되는 경우</li>
        </ul>

        <h3>3. 위치정보의 보유 및 파기</h3>
        <ul>
          <li>
            본 앱은 위치정보를 서비스 제공 목적으로 필요한 기간 동안만 보유하며,
            목적 달성 후 즉시 파기합니다.
          </li>
          <li>
            사용자가 서비스 이용 중단을 요청하거나 동의를 철회할 경우 위치정보를
            즉시 삭제합니다.
          </li>
        </ul>

        <h3>4. 위치정보의 동의 철회</h3>
        <p>
          사용자는 본 앱의 위치정보 이용에 대해 동의하거나 철회할 수 있습니다.
        </p>

        <h3>5. 사용자의 권리</h3>
        <ul>
          <li>
            사용자는 앱이 위치정보를 수집 및 이용하는 것에 대해 동의하지 않을
            권리가 있으며, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
          </li>
        </ul>

        <h3>6. 서비스 중단</h3>
        <p>
          본 앱은 아래와 같은 경우 위치 서비스 제공을 제한하거나 중단할 수
          있습니다:
        </p>
        <ul>
          <li>시스템 점검, 업데이트, 유지보수</li>
          <li>사용자 기기의 위치정보 설정 미활성화</li>
          <li>천재지변, 통신 장애 등 불가항력</li>
        </ul>

        <h3>7. 책임의 제한</h3>
        <p>
          본 앱은 위치정보의 정확성, 완전성, 신뢰성에 대해 보증하지 않으며,
          이로 인해 발생한 손해에 대해 책임을 지지 않습니다.
        </p>

        <h3>8. 위치정보 관리책임자</h3>
        <p>
          위치정보와 관련된 문의는 아래 위치정보 관리책임자에게 연락해 주시기
          바랍니다:
        </p>
        <ul>
          <li>이메일: [example@email.com]</li>
          <li>연락처: [전화번호]</li>
        </ul>

        <h3>9. 분쟁 해결</h3>
        <p>
          위치정보와 관련하여 발생한 분쟁은 사용자와의 대화를 통해 해결하며,
          협의가 이루어지지 않을 경우 관련 법령에 따라 처리됩니다.
        </p>

        <h3>10. 적용 일자</h3>
        <p>본 약관은 [YYYY-MM-DD]부터 적용됩니다.</p>
      </div>
    </div>
  );
}

export default LocationPolicy;