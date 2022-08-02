import React, { useEffect, useState } from 'react';
import { InfoCard, TextContainer } from '../../components/Liststyle';
import { Column } from '../user-reserv/ReserveStyle';
import AdminReserveModal from './AdminReserveModal';
import { customAxios } from '../../utils/AxiosModule';
import Pagination from './AdminPagination';

const AdminReserveCard = () => {
  const [reserveData, setReserveData] = useState<any>();
  const [totals, setTotals] = useState<number>(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  //TODO : 페이지네이션 적용시켜야함
  const getFetchData = async () => {
    const result = await customAxios.get(
      `/reservation/admin/list?page=${page}&perPage=${limit}`,
    );

    setTotals(result.data.data.totalHospitals);
    setReserveData(result.data.data.ReservationsInfo);
    console.log(reserveData);
    console.log('page', page);
    console.log('perPage', limit);
  };

  useEffect(() => {
    getFetchData();
  }, [page]);

  // TODO : 렌더링이 늦게되는 문제
  const adminInfoContainer = () => {
    const res = [];
    for (let i = 0; i < reserveData?.Reservations?.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      res.push(
        <TextContainer key={i}>
          <Column>{reserveData?.customerInfoes[i]?.email}</Column>
          <Column>{reserveData?.customerInfoes[i]?.userName}</Column>
          <Column>{reserveData?.Reservations[i]?.hospital}</Column>
          <Column>{reserveData?.Reservations[i]?.rezDate}</Column>
          <Column>
            <AdminReserveModal reserveData={reserveData} idx={i} />
          </Column>
        </TextContainer>,
      );
    }
    return res;
  };

  return (
    <InfoCard>
      <>{adminInfoContainer()}</>
      <Pagination total={totals} limit={limit} page={page} setPage={setPage} />
    </InfoCard>
  );
};

export default AdminReserveCard;
