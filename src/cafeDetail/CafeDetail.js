import React from "react";
import { useParams } from "react-router-dom"
import {
  BottomBar,
  Bookmark,
  CafeInformationDetail,
} from "../components";
import './CafeDetail.css';
import ImageCarousel from "./ImageCarousel";

const CafeDetail = () => {
  const { id } = useParams(); // 카페 id

  return (
    <div className="cafe-detail-page">
      <div className="cafe-detail-image">
        <ImageCarousel />
      </div>

      <div className="cafe-detail-header">
        <div className="cafe-detail-header-text">
          <div className="cafe-detail-name">스테이 어도러블</div>
          <div className="cafe-detail-address">경기 용인시 기흥구 죽전로43번길 15-3 1층</div>
        </div>
        <Bookmark width="17px" height="31px" />
      </div>

      <div className="cafe-detail-divider"></div>
      <div className="cafe-info-title">카페 정보</div>
      <CafeInformationDetail />
      <div className="cafe-detail-divider"></div>

      <BottomBar />


    </div>
  );
};

export default CafeDetail;
