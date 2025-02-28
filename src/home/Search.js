import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchResult from '../components/SearchResult';
import TopBar from '../components/TopBar';

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    // 검색어가 변경될 때마다 API 호출
    useEffect(() => {
        if (inputValue.trim() === '') {
            setResults([]);
            return;
        }

        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`http://localhost:8080/cafes/search?query=${inputValue}`);
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
    };

    const handleResultClick = (place) => {
        navigate('/home', { state: {place }});
        console.log(place)
    };

    const handleSearchClick = () => {
      navigate('/home', { state: {results } }); // 검색 결과를 Home으로 전달
      console.log(results)
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
