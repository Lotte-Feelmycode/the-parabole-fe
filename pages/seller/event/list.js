import SellerLayout from '@components/seller/SellerLayout';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import SiteHead from '@components/common/SiteHead';
import Heading from '@components/input/Heading';
import { useTable } from 'react-table';
import { useState, useMemo, useEffect } from 'react';
import { GET } from '@apis/defaultApi';

export default function EventList({ event }) {
  const router = useRouter();
  const [eventList, setEventList] = useState([]);
  // const sellerId = localStorage.getItem("ID");
  const sellerId = 1;

  useEffect(() => {
    GET(`/event/seller/${sellerId}`).then((res) => {
      setEventList(res);
      // console.log('res', res);
    });
  }, []);

  const onClick = (row) => {
    console.log(row.values.id);
    const eventId = row.values.id;
    router.push(
      {
        pathname: `/seller/event/${eventId}`,
      },
      `/seller/event/${eventId}`,
    );
  };

  const columnData = [
    {
      accessor: 'id',
      Header: '이벤트 번호',
    },
    {
      accessor: 'type',
      Header: '이벤트 타입',
      Cell: ({ cell: { value } }) => <Balance values={value} />,
    },
    {
      accessor: 'title',
      Header: '이벤트 제목',
    },
    {
      accessor: 'descript',
      Header: '이벤트 설명',
    },
    {
      accessor: 'status',
      Header: '진행 상태',
    },
    {
      accessor: 'startAt',
      Header: '이벤트 시작일시',
    },
    {
      accessor: 'endAt',
      Header: '이벤트 종료일시',
    },
  ];

  // const dummydata = useMemo(
  //   () => [
  //     {
  //       id: '1',
  //       type: '선착순',
  //       title: 'LOTTE VIBE ON',
  //       descript: '바로 이곳이 브랜드 컬렉션',
  //       status: '0',
  //       startAt: '2021-08-03 01:14:47',
  //       endAt: '2021-08-03 01:15:49',
  //     },
  //   ],
  //   [],
  // );

  const data = useMemo(
    () =>
      eventList.map((event) => ({
        id: event.id,
        type: event.type,
        title: event.title,
        descript: event.descript,
        status: event.status,
        startAt: event.startAt,
        endAt: event.endAt,
      })),
    [],
  );
  const columns = useMemo(() => columnData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <SellerLayout>
      <SiteHead title={'Seller Office'} />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <Heading title="이벤트 목록" type="h1" />
          <Divider />
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((header) => (
                // getHeaderGroupProps를 통해 header 배열을 호출한다
                <Tr {...header.getHeaderGroupProps()}>
                  {header.headers.map((col) => (
                    // getHeaderProps는 각 셀 순서에 맞게 header를 호출한다
                    <th {...col.getHeaderProps()}>{col.render('Header')}</th>
                  ))}
                </Tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  // getRowProps는 각 row data를 호출해낸다 //
                  <tr {...row.getRowProps()} onClick={() => onClick(row)}>
                    {row.cells.map((cell) => (
                      // getCellProps는 각 cell data를 호출해낸다
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </SellerLayout>
  );
}

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;

const Tags = styled.span`
  background-color: black;
  color: #fff;
  //font-size: 1.2rem;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 3rem;
`;

// const Table = styled.table`
//   1px solid black;
// `;

const Tr = styled.tr`
  background-color: #dde2ec';
  padding: 1rem;
  text-align : center;
  
`;

const Balance = ({ values }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* {values.map((coin, idx) => {
        return <Tags key={idx}>{coin}</Tags>;
      })} */}
      <Tags>{values}</Tags>
    </div>
  );
};
