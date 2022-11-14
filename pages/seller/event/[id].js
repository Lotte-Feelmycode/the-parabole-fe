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
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import Toast from '@components/common/ToastPopup';

export default function EventDetail() {
  const router = useRouter();
  const [eventId, setEventId] = useState(router.query.id);
  const [event, setEvent] = useState([]);

  const EVENT_BEFORE = 0;

  const [headers, setHeaders] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        toast('로그인 해주세요.');
        router.push('/signin');
      } else if (localStorage.getItem('role') === 'ROLE_USER') {
        toast.warn('판매자 페이지입니다.');
        router.push('/');
      }
    }
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
          toast.error('잘못된 요청입니다.');
          router.replace(`/seller/event/list`);
        }
      });
    }
  }, [router.query]);

  const deleteClickHandler = async (e) => {
    e.preventDefault();

    confirmAlert({
      title: '등록한 이벤트를 취소하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            DELETE(`/event/${eventId}`, {}).then((res) => {
              if (res && res.success == true) {
                toast('삭제 되었습니다. ');
                router.replace(`/seller/event/list`);
              }
            });
          },
        },
        {
          label: '아니오',
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  return (
    <SellerLayout>
      <SiteHead title={'Seller Office'} />

      <Toast />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <Heading title="이벤트 상세" type="h1" />
          <Divider />
          <Heading title={event.title} type="h2" />
          <br />
          <Heading title="이벤트 유형" type="h3" />
          <span>
            {getState(EVENT_TYPE, event.type)}
            &nbsp;이벤트
          </span>
          <br />
          <br />

          <Heading title="이벤트 일시" type="h3" />
          <div className="mb-8">
            <span>
              이벤트 시작일시 : {event.startAt && getDateTime(event.startAt)}
            </span>
            <br />
            <span>
              이벤트 종료일시 : {event.endAt && getDateTime(event.endAt)}
            </span>
          </div>

          <div className="mb-8">
            <Heading title="경품" type="h3" />
            <table className="w-2/3 text-m text-center px-4 pb-8">
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
            <Heading title="참여자" type="h3" />
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
