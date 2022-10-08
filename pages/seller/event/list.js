import { GET } from '@apis/defaultApi';
import SellerLayout from '@components/seller/SellerLayout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Heading from '@components/input/Heading';
import styled from '@emotion/styled';
import getTime from '@utils/functions';

export default function EventList() {
  const router = useRouter();
  const [eventList, setEventList] = useState([]);

  // TODO : 로그인 정보 가져오기
  // const sellerId = localStorage.getItem("ID");
  const sellerId = 1;

  useEffect(() => {
    GET(`/event/seller/${sellerId}`).then((res) => {
      setEventList(res);
    });
  }, []);

  const rowClickHandler = (row) => {
    const eventId = row.id;
    if (eventId && eventId > 0) {
      router.push(
        { pathname: `/seller/event/${eventId}` },
        `/seller/event/${eventId}`,
      );
    }
  };

  return (
    <>
      <SellerLayout>
        <Heading title="이벤트 목록" type="h1" />
        <Divider />
        <Table>
          {/* <Tr height="40">
            <th>이벤트 번호</th>
            <th>이벤트 타입</th>
            <th>이벤트 제목</th>
            <th>이벤트 설명</th>
            <th>진행 상태</th>
            <th>이벤트 시작일시</th>
            <th>이벤트 종료일시</th>
          </Tr> */}
          {eventList &&
            eventList.map((event, index) => (
              <Tr height="40" onClick={() => rowClickHandler(event)}>
                <td width="100">{event.id}</td>
                <td width="100">
                  <Tags>{event.type === 'RAFFLE' ? '추첨' : '선착순'}</Tags>
                </td>
                <td width="250">{event.title}</td>
                <td width="200">{event.descript}</td>
                {event.status === 0 && <td width="100">진행 전</td>}
                {event.status === 1 && <td width="100">진행 중</td>}
                {event.status === 2 && <td width="100">종료</td>}
                <td width="250">{getTime(event.startAt)}</td>
                <td width="250">{getTime(event.endAt)}</td>
              </Tr>
            ))}
        </Table>
      </SellerLayout>
    </>
  );
}

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;

const Table = styled.table`
  text-align: center;
`;

const Tr = styled.tr`
  border: 0.1px solid white;
  backgorund-color: white;
`;

const Th = styled.tr`
  border: 0.1px solid white;
  background-color: #e4e7eb78;
`;

const Tags = styled.span`
  background-color: black;
  color: #fff;
  font-size: 0.8rem;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 3rem;
`;
