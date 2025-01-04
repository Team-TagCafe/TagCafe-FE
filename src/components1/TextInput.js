import React, { useState } from 'react';
import './TextInput.css'; // 스타일 파일을 따로 관리할 경우

function TextInput({ placeholder, value, onChange, onKeyDown }) {
    const [inputValue, setInputValue] = useState(value || ''); // 기본 값 설정

    // 입력 값 변경 시 처리
    const handleChange = (event) => {
        setInputValue(event.target.value);
        if (onChange) {
            onChange(event.target.value); // 부모 컴포넌트로 값 전달
        }
    };

    // 엔터키를 눌렀을 때의 동작
    const handleKeyDown = (event) => {
        if (onKeyDown) {
            onKeyDown(event); // 부모 컴포넌트로 이벤트 전달
        }
    };

    return (
        <input
            type="text"
            className="text-input"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
        />
    );
}

export default TextInput;
