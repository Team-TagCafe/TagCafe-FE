/*global kakao*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar, SearchResult } from '../components';

const Search = ({ onPlaceSelect }) => {
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (value) => {
    setInputValue(value); // Search 컴포넌트 내에서 상태 업데이트

    // 카카오 지도 API로 검색
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(value + ' 카페', (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setResults(data);
      }
    });
  };

  const handleResultClick = (place) => {
    onPlaceSelect(place); // 선택한 장소 정보를 부모로 전달
    console.log(place); // 전달된 장소 정보를 콘솔에 출력

    // selectedPlace를 state로 전달하면서 navigate
    navigate('/home', { state: { selectedPlace: place } });
  };


  return (
    <>
      <TopBar
        showSearchAndFilter={true}
        onSearchPlaceChange={handleInputChange} // 실시간으로 입력값을 부모로 전달
      />
      <div>
        <ul>
          {results.map((place) => (
            <li key={place.id} onClick={() => handleResultClick(place)}
              style={{ listStyleType: 'none', padding: '4px 0', cursor: 'pointer' }}>
              <SearchResult
                cafeName={place.place_name}
                address={place.address_name}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;

