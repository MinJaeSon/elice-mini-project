import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as PrevButton } from '@assets/arrow_left.svg';
import { ReactComponent as NextButton } from '@assets/arrow_right.svg';
import CoursesType from '@/typing/typing';

type hoverStateType = {
  prev: boolean;
  next: boolean;
};

type visiblePagesType = {};

interface PaginationProps {
  courseCount: number;
  courses: CoursesType[];
  count: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchParams: URLSearchParams;
}

const Pagination: React.FC<PaginationProps> = ({
  courseCount,
  courses,
  count,
  setOffset,
  currentPage,
  setCurrentPage,
  searchParams,
}) => {
  const [isHover, setIsHover] = useState<hoverStateType>({ prev: false, next: false });
  const [totalPage, setTotalPage] = useState(0);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [isDisable, setIsDisable] = useState(false);

  const handleArrowLeftHover = () => {
    setIsHover((prevState) => ({
      ...prevState,
      prev: !prevState.prev,
    }));
  };

  const handleArrowRightHover = () => {
    setIsHover((prevState) => ({
      ...prevState,
      next: !prevState.next,
    }));
  };

  const handleClick = (number: number) => {
    setCurrentPage(number);
    setOffset((number - 1) * 20);
    const updatedVisiblePages = Array.from({ length: 5 }, (_, i) =>
      number <= 2 ? i + 1 : number >= totalPage - 1 ? totalPage - 4 + i : number + i - 2,
    );
    setVisiblePages(updatedVisiblePages);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
    setOffset((currentPage - 2) * 20);
    const updatedVisiblePages = Array.from({ length: 5 }, (_, i) => currentPage + i - 3);
    setVisiblePages(updatedVisiblePages);
  };

  const handleNextPage = () => {
    if (currentPage === totalPage) return;
    setCurrentPage((prev) => prev + 1);
    setOffset(currentPage * 20);
    const updatedVisiblePages = Array.from({ length: 5 }, (_, i) => currentPage + i - 1);
    setVisiblePages(updatedVisiblePages);
  };

  useEffect(() => {
    setTotalPage(Math.ceil(courseCount / count));
    console.log('totalPage:', totalPage);
  }, [courseCount, searchParams]);

  useEffect(() => {
    const initialVisiblePages = totalPage >= 5 ? 5 : totalPage;
    setVisiblePages(Array.from({ length: initialVisiblePages }, (_, i) => i + 1));
  }, [totalPage]);

  return (
    <Wrapper>
      <ArrowButton
        as={PrevButton}
        stroke={isHover.prev ? '#524fa1' : '#666'}
        onMouseOver={handleArrowLeftHover}
        onMouseLeave={handleArrowLeftHover}
        onClick={handlePrevPage}
      />
      <PageDiv>
        {visiblePages.map((number) => (
          <PageButton
            key={number}
            selectedStyle={currentPage === number}
            onClick={() => handleClick(number)}
          >
            <span>{number}</span>
          </PageButton>
        ))}
      </PageDiv>
      <ArrowButton
        as={NextButton}
        stroke={isHover.next ? '#524fa1' : '#666'}
        onMouseOver={handleArrowRightHover}
        onMouseLeave={handleArrowRightHover}
        onClick={handleNextPage}
      />
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

const ArrowButton = styled.img`
  width: 17px;
  height: 17px;
  padding: 3.5px;
  border-radius: 0.25rem;
  cursor: pointer;
  &:first-child {
    margin-right: 0.375rem;
    &:hover {
      background-color: #efeffd;
    }
  }
  &:last-child {
    margin-left: 0.375rem;
    &:hover {
      background-color: #efeffd;
    }
  }
`;

const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const PageButton = styled.button<{ selectedStyle: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 6px;
  padding: 1px 6px;
  border-radius: 0.25rem;
  border: none;
  background-color: transparent;
  color: #999;
  font-weight: 700;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  &:hover {
    background-color: #efeffc;
    color: #524fa1;
  }
  ${({ selectedStyle }) => selectedStyle && `background-color: #524fa1; color: #fff;`}
  span {
    display: flex;
    justify-content: center;
  }
`;
