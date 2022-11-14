import { GET_DATA, POST_DATA } from '@apis/defaultApi';
import SellerLayout from '@components/seller/SellerLayout';
import { useRouter } from 'next/router';
import useInput from '@hooks/useInput';

import { useState, useEffect } from 'react';
import Heading from '@components/input/Heading';
import styled from '@emotion/styled';
import { getDateTime, getState } from '@utils/functions';
import { SmallPink } from '@components/input/Button';
import { EVENT_TYPE, EVENT_STATUS } from '@utils/constants/types';
import { ICON_SEARCH_MAGNIFY } from '@utils/constants/icons';
import Selectbox from '@components/input/SelectBox';
import { useGetToken } from '@hooks/useGetToken';
import SortButton from '@components/input/SortButton';
import StatusSummary from '@components/event/EventStatusSummary';

export default function EventList() {
  const [searchValue, onSearchValue] = useInput('');
  const [searchStatus, onSearchStatus] = useInput();
  const [searchType, onSearchType] = useInput();
  const [startAtSortDesc, setStartAtSortDesc] = useState(false);
  const [endAtSortDesc, setEndAtSortDesc] = useState(false);

  const router = useRouter();
  const [eventList, setEventList] = useState([]);

  const [headers, setHeaders] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push('/signin');
      } else if (localStorage.getItem('role') === 'ROLE_USER') {
        alert('판매자 페이지입니다.');
        router.push('/');
      }
    }
    setHeaders(useGetToken());
  }, []);

  useEffect(() => {
    const params = {
      eventType:
        searchType == null || searchType == '이벤트 타입' ? '' : searchType,
      eventStatus:
        searchValue == null || searchStatus == '진행 상태' ? -1 : searchStatus,
      eventTitle: searchValue,
    };

    //TODO: 셀러리스트
    GET_DATA('/event/list', params, headers).then((res) => {
      if (res) {
        setEventList(res);
      }
    });

  }, [searchValue, searchStatus, searchType]);

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
  
  function sortListByStartAt(e) {
    e.preventDefault();

    let copyArray = [...eventList];

    if (startAtSortDesc) {
      copyArray.sort(function (a, b) {
        // 내림차순
        return a.startAt > b.startAt ? -1 : a.startAt < b.startAt ? 1 : 0;
      });
      setStartAtSortDesc(false);
    } else {
      copyArray.sort(function (a, b) {
        // 오름차순
        return a.startAt < b.startAt ? -1 : a.startAt > b.startAt ? 1 : 0;
      });
      setStartAtSortDesc(true);
    }

    setEventList(copyArray);
  }

  function sortListByEndAt(e) {
    e.preventDefault();

    let copyArray = [...eventList];

    if (endAtSortDesc) {
      copyArray.sort(function (a, b) {
        // 내림차순
        return a.endAt > b.endAt ? -1 : a.endAt < b.endAt ? 1 : 0;
      });
      setEndAtSortDesc(false);
    } else {
      copyArray.sort(function (a, b) {
        // 오름차순
        return a.endAt < b.endAt ? -1 : a.endAt > b.endAt ? 1 : 0;
      });
      setEndAtSortDesc(true);
    }

    setEventList(copyArray);
  }
  return (
    <>
      <SellerLayout>
        <Heading title="이벤트 목록" type="h1" />
        <StatusSummary eventList={eventList}/>
        <Divider />
        <Selectbox
          props={EVENT_STATUS}
          value={searchStatus}
          onChange={onSearchStatus}
          categoryName="진행 상태"
        />
        <Selectbox
          props={EVENT_TYPE}
          value={searchType}
          onChange={onSearchType}
          categoryName="이벤트 타입"
        />

        <div className="pb-4 bg-white dark:bg-gray-900">
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <button>
                <img src={ICON_SEARCH_MAGNIFY} />
              </button>
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={onSearchValue}
              placeholder="이벤트 제목을 검색하세요."
              className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
          </div>
        </div>
        <table className="w-full text-m text-center">
          <thead className="text-m text-gray-700 uppercase bg-rose-50 dark:bg-gray-700 dark:text-gray-400">
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
                <div className="flex items-center justify-center">
                  이벤트 시작일시
                  <SortButton
                    onClickFunc={(e) => sortListByStartAt(e)}
                  ></SortButton>
                </div>
              </th>
              <th scope="col" className="py-1 px-10 w-40">
                <div className="flex items-center justify-center">
                  이벤트 종료일시
                  <SortButton
                    onClickFunc={(e) => sortListByEndAt(e)}
                  ></SortButton>
                </div>
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
                  <td>{getDateTime(event.startAt)}</td>
                  <td>{getDateTime(event.endAt)}</td>
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
          <SmallPink
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
