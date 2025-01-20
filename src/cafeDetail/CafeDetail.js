import React from "react";
import { useParams } from "react-router-dom"
import { BottomBar } from "../components";

const CafeDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>카페 상세 페이지</h1>
      <p>카페 ID: {id}</p>
      <BottomBar />

    </div>
  );
};

export default CafeDetail;
