import React, { useState } from 'react';
import './TextInput.css';

function TextInput({ placeholder, value, onChange, onKeyDown }) {
    const [inputValue, setInputValue] = useState(value || ''); // 기본 값 설정

    // 입력 값 변경 시 처리
    const handleChange = (event) => {
        setInputValue(event.target.value); // input값을 상태에 업데이트
        if (onChange) {
            onChange(event.target.value); // 부모 컴포넌트로 값 전달 (onChange 콜백 실행)
        }
    };

    // 엔터키를 눌렀을 때의 동작
    const handleKeyDown = (event) => {
        if (onKeyDown) {
            onKeyDown(event); // 부모 컴포넌트로 이벤트 전달 (onKeyDown 콜백 실행)
        }
    };

    return (
        <input
            type="text" // 텍스트 입력 필드로 설정
            className="text-input" // 스타일링을 위한 클래스
            value={inputValue} // 입력 필드에 표시될 값 (상태값)
            onChange={handleChange} // 입력값 변경 시 실행
            onKeyDown={handleKeyDown} // 키보드 입력 시 실행
            placeholder={placeholder} // 입력 필드의 placeholder 텍스트
        />
    );
}

export default TextInput;
