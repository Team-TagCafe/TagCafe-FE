import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchResult from '../components/SearchResult';
import TopBar from '../components/TopBar';

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([]);
    const [noResultsMessage, setNoResultsMessage] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false); // 검색 버튼을 눌렀을 때만 체크
    const navigate = useNavigate();

    // 검색어가 변경될 때마다 API 호출
    useEffect(() => {
        if (inputValue.trim() === '') {
            setResults([]);
            return;
        }

        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cafes/search?query=${inputValue}`);
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [inputValue]);

    const handleInputChange = (value) => {
        setInputValue(value);
        setSearchTriggered(false); // 검색어 변경 시, 메시지 초기화
    };

    const handleResultClick = (place) => {
        navigate('/home', { state: { place } });
    };

    const handleSearchClick = () => {
        setSearchTriggered(true); // 검색 버튼을 눌렀다는 표시

        if (results.length === 0) {
            setNoResultsMessage('검색 결과가 없습니다.');
            return;
        }
        navigate('/home', { state: { results, searchTerm: inputValue } }); // 검색 결과 & 검색어를 Home으로 전달
    };

    return (
        <>
            <TopBar
                showSearch
                showClose={true}
                showHamburger={false}
                onSearchPlaceChange={handleInputChange}
                onSearchClick={handleSearchClick}
            />
            <div>
                {searchTriggered && results.length === 0 && (
                    <p style={{ color: "#422919", textAlign: "center", marginTop: "10px" }}>
                        {noResultsMessage}
                    </p>
                )}
                <ul>
                    {results.map((place) => (
                        <li key={place.cafeId} onClick={() => handleResultClick(place)}
                            style={{ listStyleType: 'none', padding: '10px 0', cursor: 'pointer' }}>
                            <SearchResult cafeName={place.cafeName} address={place.address} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Search;
