import React, { useState, useEffect } from 'react';
import './TextInput.css';

function TextInput({ placeholder, value, onChange, onKeyDown }) {
    const [inputValue, setInputValue] = useState(value || ''); 

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue); // 상태 업데이트
        if (onChange) {
            onChange(event); // 부모 컴포넌트에 event 객체 전달
        }
    };

    const handleKeyDown = (event) => {
        if (onKeyDown) {
            onKeyDown(event);
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