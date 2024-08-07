import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import searchIcon from '@assets/search_icon.svg';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const existingParams = searchParams.get('keyword');
  const [input, setInput] = useState(existingParams || '');
  const debouncedKeyword = useDebounce(input, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleUrlQuery = () => {
    if (searchParams.has('keyword')) {
      searchParams.set('keyword', debouncedKeyword);
    } else {
      if (debouncedKeyword) searchParams.append('keyword', debouncedKeyword);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    handleUrlQuery();
  }, [debouncedKeyword]);

  return (
    <Wrapper>
      <SearchIcon src={searchIcon} alt="search icon" />
      <InputDiv>
        <InputBox
          type="text"
          placeholder="배우고 싶은 언어, 기술을 검색해 보세요"
          value={input}
          onChange={handleChange}
        />
      </InputDiv>
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  border: 1px solid rgb(201, 202, 204);
  border-radius: 0.25rem;
  &:focus-within {
    border-color: rgb(82, 79, 161);
  }
`;

const SearchIcon = styled.img`
  width: 16px;
  height: 46px;
  padding-left: 16px;
`;

const InputDiv = styled.div`
  width: 100%;
  margin: 0 16px;
`;

const InputBox = styled.input`
  width: 100%;
  padding: 12px 0;
  border: none;
  background-color: transparent;
  font-size: 0.875rem;
  outline: none;
  line-height: 1.5;
`;
