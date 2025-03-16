import React, { useState, useEffect } from "react";
import SelectTag from "./selectTag";      
import "./CafeInformation.css";

function CafeInformation({ onChange, selectedOptions }) {
  const [internalSelectedOptions, setInternalSelectedOptions] = useState(selectedOptions);

  useEffect(() => {
    setInternalSelectedOptions(selectedOptions);
  }, [selectedOptions]); // ✅ 부모 컴포넌트에서 변경된 값 반영

  const handleOptionSelect = (category, option) => {
    setInternalSelectedOptions((prev) => ({
      ...prev,
      [category]: prev[category] === option ? "" : option,
    }));
    if (onChange) {
      onChange(category, option);
    }
  };

  const options = {
    와이파이: ["빠름", "보통", "없음"],
    콘센트: ["자리마다", "일부", "없음"],
    책상: ["넓음", "적당함", "좁음"],
    화장실: ["실내", "외부"],
    주차: ["가능(무료)", "가능(유료)", "가능(일부)", "불가능"],
  };

  const icons = {
    와이파이: "/img/wifi.png",
    콘센트: "/img/plug.png",
    책상: "/img/desk.png",
    화장실: "/img/toilet.png",
    주차: "/img/park.png",
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
            <h4>{category}</h4>
          </div>
          <div className="cafe-information__options">
            {options[category].map((option) => (
              <SelectTag
                key={option}
                tagText={option}
                isSelected={internalSelectedOptions[category] === option}
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