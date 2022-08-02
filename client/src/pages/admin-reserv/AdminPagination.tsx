import React from 'react';
import styled from 'styled-components';

interface IProps {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({ total, limit, page, setPage }: IProps) {
  // 페이지네이션 버튼의 갯수 구하기
  const numPages = Math.ceil(total / limit);

  const pageArr = Array.from(
    { length: numPages },
    (v: undefined, i: number) => i,
  );

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ◀
        </Button>
        {pageArr.map((num: number) => (
          <NumBtn
            key={num + 1}
            onClick={() => setPage(num + 1)}
            disabled={page === num + 1}
            isSelect={page === num + 1}
          >
            {num + 1}
          </NumBtn>
        ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          ▶
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  width: 30px;
  background: white;
  color: ${(props) => props.theme.palette.orange};
  font-size: 16px;
  line-height: 26px;
  text-align: center;

  &:hover {
    background: ${(props) => props.theme.palette.orange};
    color: white;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: white;
    cursor: auto;
    transform: revert;

    &:hover {
      color: ${(props) => props.theme.palette.orange};
    }
  }
`;

interface ISelect {
  isSelect: boolean;
}

const NumBtn = styled(Button)<ISelect>`
  font-weight: ${(props) => props.isSelect && 'bold'};
`;
