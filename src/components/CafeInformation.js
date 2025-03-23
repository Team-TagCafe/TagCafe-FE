import React, { useState, useEffect } from "react";
import SelectTag from "./selectTag";      
import "./CafeInformation.css";

function CafeInformation({ onChange, selectedOptions={} }) {
  const [internalSelectedOptions, setInternalSelectedOptions] = useState(selectedOptions);

  useEffect(() => {
    
    if (
      Object.keys(selectedOptions).length > 0 && 
      JSON.stringify(internalSelectedOptions) !== JSON.stringify(selectedOptions)
    ) {
      setInternalSelectedOptions(selectedOptions);
    }
  }, [selectedOptions]); //부모 컴포넌트에서 변경된 값 반영

  const handleOptionSelect = (category, option) => {
    // 렌더링 중 호출 방지용 안전장치
    if (!option || typeof option !== "string") return;
  
    setInternalSelectedOptions((prev) => {
      const newOptions = {
        ...prev,
        [category]: option,
      };
      if (onChange) {
        setTimeout(() => {
          onChange(category, option); // ⏱️ 렌더링 이후 비동기로 호출
        }, 0);
      }
      return newOptions;
    });
  };

const categoryLabels = {
  wifi: "와이파이",
  outlets: "콘센트",
  desk: "책상",
  restroom: "화장실",
  parking: "주차",
};

const options = {
  wifi: ["빠름", "보통", "없음"],
  outlets: ["자리마다", "일부", "없음"],
  desk: ["넓음", "적당함", "좁음"],
  restroom: ["실내", "외부"],
  parking: ["가능(무료)", "가능(유료)", "가능(일부)", "불가능"],
};

const reverseOptionMap = {
  가능_무료: "가능(무료)",
  가능_유료: "가능(유료)",
  불가능: "불가능",
  가능_일부: "가능(일부)",
};

const icons = {
  wifi: "/img/wifi.png",
  outlets: "/img/plug.png",
  desk: "/img/desk.png",
  restroom: "/img/toilet.png",
  parking: "/img/park.png",
};

  return (
    <div className="cafe-information">
      {Object.keys(options).map((category) => (
        <div key={category} className="cafe-information__group">
          <div className="cafe-information__header">
            <img
              src={icons[category]}
              alt={`${category} icon`}
              className="cafe-information__icon"
            />
            <h4>{categoryLabels[category] || category}</h4> 
          </div>
          <div className="cafe-information__options">
            {options[category].map((option) => (
              <SelectTag
                key={option}
                tagText={option}
                isSelected={reverseOptionMap[internalSelectedOptions[category]] === option || internalSelectedOptions[category] === option} // 비교 로직 수정                
                onClick={() => handleOptionSelect(category, option)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CafeInformation;