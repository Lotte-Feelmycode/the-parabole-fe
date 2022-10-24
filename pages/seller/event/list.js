import { GET_DATA } from '@apis/defaultApi';
import SellerLayout from '@components/seller/SellerLayout';
import { useRouter } from 'next/router';
import useInput from '@hooks/useInput';

import { useState, useEffect } from 'react';
import Heading from '@components/input/Heading';
import styled from '@emotion/styled';
import { getState, getTimeNotKor } from '@utils/functions';
import * as btn from '@components/input/Button';
import { EVENT_TYPE, EVENT_STATUS } from '@utils/constants/types';
import { ICON_SEARCH_MAGNIFY } from '@utils/constants/icons';

export default function EventList() {
  const [searchValue, onSearchValue] = useInput('');

  const router = useRouter();
  const [eventList, setEventList] = useState([]);

  // TODO : 로그인 정보 가져오기
  // const userId = localStorage.getItem("ID");
  const userId = 1;

  useEffect(() => {
    GET_DATA(`/event/seller/${userId}`).then((res) => {
      if (res) {
        setEventList(res);
      }
    });
  }, []);

  const onClickHandler = () => {
    alert('검색어 : ', searchValue);
  };

  const handleOnKeyPress = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      onClickHandler();
    }
  };

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
        <div className="pb-4 bg-white dark:bg-gray-900">
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <button onClick={onClickHandler}>
                <img src={ICON_SEARCH_MAGNIFY} />
              </button>
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={onSearchValue}
              onKeyUp={handleOnKeyPress}
              placeholder="이벤트 제목 또는 설명을 검색하세요."
              className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
            {/* <input type="text" id="table-search" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"> */}
          </div>
        </div>
        <table className="w-full text-m text-center">
          <thead className="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="h-12">
              <th scope="col" className="py-1 w-10">
                이벤트
                <br />
                번호
              </th>
              <th scope="col" className="py-1 px-10 w-24">
                이벤트 타입
              </th>
              <th scope="col" className="py-1 px-10 w-40">
                이벤트 제목
              </th>
              <th scope="col" className="py-1 px-10 w-40">
                이벤트 설명
              </th>
              <th scope="col" className="py-1 px-10 w-24">
                진행 상태
              </th>
              <th scope="col" className="py-1 px-10 w-40">
                이벤트 시작일시
              </th>
              <th scope="col" className="py-1 px-10 w-40">
                이벤트 종료일시
              </th>
            </tr>
          </thead>
          <tbody>
            {eventList && Array.isArray(eventList) && eventList.length > 0 ? (
              eventList.map((event, index) => (
                <tr
                  onClick={() => rowClickHandler(event)}
                  className="h-16 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td>{event.id}</td>
                  <td>
                    <Tags>{getState(EVENT_TYPE, event.type)}</Tags>
                  </td>
                  <td>{event.title}</td>
                  <td>{event.descript}</td>
                  <td>{getState(EVENT_STATUS, event.status)}</td>
                  <td>{getTimeNotKor(event.startAt)}</td>
                  <td>{getTimeNotKor(event.endAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-10">
                  등록된 이벤트가 없습니다. 이벤트를 등록해 보세요!
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Div>
          <btn.SmallPink
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
const IconSpan = styled.span`
  display: block;
  width: 20px;
  height: 20px;
`;
