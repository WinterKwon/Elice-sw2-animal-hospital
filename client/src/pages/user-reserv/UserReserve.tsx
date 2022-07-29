import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Title } from '../../components/InfoForm';
import { Header } from '../../components/Liststyle';
import ReserveCard from './ReserveCard';
import { Container, Column } from './ReserveStyle';
import Pagination from '../home/Pagenation';
import { atom, useRecoilState } from 'recoil';

// 바뀐 로컬 주소 URL
const API_URL = 'http://localhost:5100';

export const StatusState = atom({
  key: 'statusState', // unique ID (다른 atoms/selectors을 구별하기 위해서)
  default: { _id: '', name: '' }, // default value (aka initial value)
});
function UserReserve() {
  const token = localStorage.getItem('token');
  const [resInfo, setResInfo] = useState<any>({
    Reservations: [],
    hospInfoes: [],
    petInfoes: [],
    rezStatusInfoes: [],
  });
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<any>({ perPage: 10 });
  const [status, setStatus] = useRecoilState(StatusState); // todo => 리팩토링!!

  useEffect(() => {
    axios
      .get(
        `${API_URL}/reservation/user/list?page=${page}&perPage=${pages.perPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        const data = res.data.data;
        const check = Object.values(data.ReservationsInfo);
        setPages({
          perPage: data.perPage,
          totalPage: data.totalHospitals,
        });
        setPage(data.page);
        setResInfo(check);
      });
  }, [page]);

  // todo => 리팩토링! 더 좋은 방법있는지 찾아보기
  useEffect(() => {
    axios
      .get(`${API_URL}/reservationStatus/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setStatus(res.data[2]));
  }, []);

  const InfoArr = [];
  // useCallback 사용해보기
  if (resInfo.length > 0) {
    for (let i = 0; i < resInfo[0].length; i++) {
      InfoArr.push({
        ...resInfo[0][i],
        reservationId: resInfo[0][i]?._id,
        ...resInfo[1][i],
        ...resInfo[2][i],
        ...resInfo[3][i],
        hpName: resInfo[1][i]?.name,
        petName: resInfo[2][i]?.name,
        resName: resInfo[3][i]?.name,
      });
    }
  }

  return (
    <Container>
      <Title>내 예약 확인하기</Title>
      <Header>
        <Column>no</Column>
        <Column>날짜/시간</Column>
        <Column>병원</Column>
        <Column>예약현황</Column>
        <Column></Column>
      </Header>

      {InfoArr.map((res: any, i: number) => (
        <ReserveCard key={i} res={res} idx={i} />
      ))}
      <Pagination
        total={pages?.totalPage}
        limit={pages.perPage}
        page={page}
        setPage={(page: number) => setPage(page)}
      />
    </Container>
  );
}

export default UserReserve;
