/*global kakao*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCafe } from './CafeContext';
import { TopBar, SearchResult } from '../components';

const Search = ({ onPlaceSelect }) => {
  // const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { cafes, setSelectedPlace } = useCafe();
  const navigate = useNavigate();

  const handleInputChange = (value) => {
    setInputValue(value); // Search 컴포넌트 내에서 상태 업데이트

    // 카카오 지도 API로 검색
    // const ps = new kakao.maps.services.Places();
    // ps.keywordSearch(value + ' 카페', (data, status) => {
    //   if (status === kakao.maps.services.Status.OK) {
    //     setResults(data);
    //   }
    // });
  };

  const handleResultClick = (place) => {
    setSelectedPlace(place); // 선택한 장소를 전역 상태로 저장
    console.log(place); // 전달된 장소 정보를 콘솔에 출력

    // navigate
    navigate('/home');
  };


  return (
    <>
      <TopBar
        showSearch showClose={true}
        showHamburger={false}
        onSearchPlaceChange={handleInputChange} // 실시간으로 입력값을 부모로 전달
      />
      <div>
        <ul>
        {cafes
            .filter((cafe) => cafe.place_name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((place) => (
              <li key={place.id} onClick={() => handleResultClick(place)}
                style={{ listStyleType: 'none', padding: '10px 0', cursor: 'pointer' }}>
                <SearchResult cafeName={place.place_name} address={place.address_name} />
              </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;

