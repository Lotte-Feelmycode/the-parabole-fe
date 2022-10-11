import { GET } from '@apis/defaultApi';
import SellerLayout from '@components/seller/SellerLayout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Heading from '@components/input/Heading';
import styled from '@emotion/styled';
import getTime from '@utils/functions';
import * as btn from '@components/input/Button';
import { EVENT_TYPE, EVENT_STATUS } from '@utils/constants/types';

export default function EventList() {
  const router = useRouter();
  const [eventList, setEventList] = useState([]);

  // TODO : 로그인 정보 가져오기
  // const userId = localStorage.getItem("ID");
  const userId = 1;

  useEffect(() => {
    GET(`/event/seller/${userId}`).then((res) => {
      setEventList(res.data);
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

  const onSubmitHandler = () => {
    router.push({ pathname: `/seller/event/new` });
  };

  return (
    <>
      <SellerLayout>
        <Heading title="이벤트 목록" type="h1" />
        <Divider />
        <table class="w-full text-m text-center">
          <thead class="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr class="h-12">
              <th scope="col" class="py-1 w-10">
                이벤트
                <br />
                번호
              </th>
              <th scope="col" class="py-1 px-10 w-24">
                이벤트 타입
              </th>
              <th scope="col" class="py-1 px-10 w-40">
                이벤트 제목
              </th>
              <th scope="col" class="py-1 px-10 w-40">
                이벤트 설명
              </th>
              <th scope="col" class="py-1 px-10 w-24">
                진행 상태
              </th>
              <th scope="col" class="py-1 px-10 w-40">
                이벤트 시작일시
              </th>
              <th scope="col" class="py-1 px-10 w-40">
                이벤트 종료일시
              </th>
            </tr>
          </thead>
          <tbody>
            {eventList &&
              eventList.map((event, index) => (
                <tr
                  onClick={() => rowClickHandler(event)}
                  class="h-16 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td>{event.id}</td>
                  <td>
                    <Tags>{EVENT_TYPE.filter((value) => value.code === event.type)[0].name}</Tags>
                  </td>
                  <td>{event.title}</td>
                  <td>{event.descript}</td>
                  <td>{EVENT_STATUS.filter((value) => value.code == event.status)[0].name}</td>               
                  <td>{getTime(event.startAt)}</td>
                  <td>{getTime(event.endAt)}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <Div>
          <btn.SmallBlue
            buttonText="등록하기"
            name="btnPost"
            onClickFunc={onSubmitHandler}
          />
        </Div>
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

const Div = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 20px;
`;
