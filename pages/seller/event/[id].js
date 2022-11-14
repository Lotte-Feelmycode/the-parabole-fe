import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GET, DELETE } from '@apis/defaultApi';
import styled from '@emotion/styled';
import SellerLayout from '@components/seller/SellerLayout';
import SiteHead from '@components/common/SiteHead';
import Heading from '@components/input/Heading';
import * as btn from '@components/input/Button';
import { getDateTime, getState } from '@utils/functions';
import { PRIZE_TYPE, EVENT_TYPE } from '@utils/constants/types';
import EventParticipant from '@components/event/EventParticipantList';
import { useGetToken } from '@hooks/useGetToken';
import * as ICON from '@utils/constants/icons';

export default function EventDetail() {
  const router = useRouter();
  const [eventId, setEventId] = useState(router.query.id);
  const [event, setEvent] = useState([]);

  const EVENT_BEFORE = 0;

  const [headers, setHeaders] = useState();

  useEffect(() => {
    // if (typeof window !== 'undefined' && typeof window !== undefined) {
    //   if (localStorage.getItem('userId') === null) {
    //     alert('로그인 해주세요.');
    //     router.push('/signin');
    //   } else if (localStorage.getItem('role') === 'ROLE_USER') {
    //     alert('판매자 페이지입니다.');
    //     router.push('/');
    //   }
    // }
    setHeaders(useGetToken());
  }, []);

  useEffect(() => {
    const eventId = router.query.id;
    if (eventId) {
      setEventId(eventId);
      GET(`/event/${eventId}`).then((res) => {
        if (res && res.data.id == eventId) {
          setEvent(res.data);
        } else {
          alert('잘못된 요청입니다.');
          router.replace(`/seller/event/list`);
        }
      });
    }
  }, [router.query]);

  const deleteClickHandler = async (e) => {
    e.preventDefault();
    DELETE(`/event/${eventId}`, {}).then((res) => {
      if (res && res.success == true && confirm('삭제하시겠습니까?')) {
        alert('삭제 되었습니다. ');
        router.replace(`/seller/event/list`);
      }
    });
  };

  return (
    <SellerLayout>
      <SiteHead title={'Seller Office'} />

      <section className="flex min-h-screen flex-col text-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto items-center">
          <a className="flex flex-row">
            <span className="w-9 h-9 mr-2 rounded-full inline-flex justify-center">
              <img src={ICON.ICON_LIST}></img>
            </span>
            <span className="text-4xl font-bold mb-2">이벤트 상세</span>
          </a>
          <Divider />
          <div className="mb-8">
            <span className="text-2xl font-bold mb-2">{event.title}</span>
          </div>
          <div className="flex flex-col mb-8">
            <span className="text-xl font-bold">이벤트 유형</span>
            <span className="text-l ml-2">
              {getState(EVENT_TYPE, event.type)} 이벤트
            </span>
          </div>

          <div className="flex flex-col mb-8">
            <span className="text-xl font-bold">이벤트 일시</span>
            <span className="ml-2">
              이벤트 시작일시 : {event.startAt && getDateTime(event.startAt)}
            </span>
            <span className="ml-2">
              이벤트 종료일시 : {event.endAt && getDateTime(event.endAt)}
            </span>
          </div>

          <div className="flex flex-col mb-8">
            <span className="text-xl font-bold mb-2">경품</span>
            <table className="ml-2 w-2/3 text-m text-center px-4 pb-8">
              <thead className="text-base text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr className="h-14">
                  <th scope="col" className="py-3 px-4 w-20">
                    경품 타입
                  </th>
                  <th scope="col" className="py-3 px-4 w-20">
                    상품/쿠폰 번호
                  </th>
                  <th scope="col" className="py-3 px-10 w-40">
                    상품/쿠폰명
                  </th>
                  <th scope="col" className="py-3 px-2 w-10">
                    수량
                  </th>
                </tr>
              </thead>
              <tbody>
                {event.eventPrizes &&
                  event.eventPrizes.map((eventPrize, index) => (
                    <>
                      <tr
                        key={eventPrize.id}
                        className="h-12 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td>{getState(PRIZE_TYPE, eventPrize.prizeType)}</td>
                        {eventPrize.prizeType === 'PRODUCT' ? (
                          <>
                            <td>{eventPrize.productId}</td>
                            <td>{eventPrize.productName}</td>
                          </>
                        ) : (
                          <>
                            <td>{eventPrize.couponId}</td>
                            <td>{eventPrize.couponDetail}</td>
                          </>
                        )}
                        <td>{eventPrize.stock}</td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mb-8">
            <EventParticipant eventId={eventId}></EventParticipant>
          </div>
          <Heading title="이벤트 이미지" type="h3" />
          <Img src={event.eventImage && event.eventImage.eventBannerImg}></Img>
          <br />
          <Img src={event.eventImage && event.eventImage.eventDetailImg}></Img>
          <br />
          {event.status === EVENT_BEFORE && (
            // TODO: 수정 (꼭 필요한지?)
            <DivHor>
              <btn.Pink
                buttonText="삭제하기"
                onClickFunc={deleteClickHandler}
              ></btn.Pink>
            </DivHor>
          )}
        </div>
      </section>
    </SellerLayout>
  );
}

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;

const Img = styled.img`
  max-width: 60%;
`;

const DivHor = styled.div`
  display: flex;
  flex-direction: row;
`;
