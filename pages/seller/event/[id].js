import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GET, DELETE } from '@apis/defaultApi';
import styled from '@emotion/styled';
import SellerLayout from '@components/seller/SellerLayout';
import SiteHead from '@components/common/SiteHead';
import { Pink } from '@components/input/Button';
import { getDateTime, getState } from '@utils/functions';
import { EVENT_TYPE } from '@utils/constants/types';
import EventParticipant from '@components/event/EventParticipantList';
import { useGetToken } from '@hooks/useGetToken';
import EventSampleModal from '@components/event/EventSampleModal';
import { NO_IMAGE } from '@utils/constants/images';
import EventWinnerList from '@components/event/EventWinnerList';
import { LINKS } from '@utils/constants/links';
import { ICON_COUPON } from '@utils/constants/icons';

export default function EventDetail() {
  const router = useRouter();
  const [eventId, setEventId] = useState(router.query.id);
  const [event, setEvent] = useState([]);
  const [modalState, setModalState] = useState(false);

  const EVENT_BEFORE = 0;
  const EVENT_PRGS = 1;
  const EVENT_END = 2;

  const [headers, setHeaders] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push(LINKS.SIGNIN);
      } else if (localStorage.getItem('role') === 'ROLE_USER') {
        alert('판매자 페이지입니다.');
        router.push(LINKS.MAIN);
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
          alert('잘못된 요청입니다.');
          router.replace(`/seller/event/list`);
        }
      });
    }
  }, [router.query]);

  const deleteClickHandler = async (e) => {
    e.preventDefault();
    DELETE(`/event/${eventId}`, {}, useGetToken()).then((res) => {
      if (res && res.success == true && confirm('삭제하시겠습니까?')) {
        alert('삭제 되었습니다. ');
        router.replace(`/seller/event/list`);
      }
    });
  };

  function showBenefitModal(e) {
    e.preventDefault();

    setModalState(true);
  }

  return (
    <SellerLayout>
      <SiteHead title={'Seller Office'} />

      <section className="flex min-h-screen flex-col text-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto items-center">
          <div className="text-4xl font-bold mb-2">이벤트 상세</div>
          <Divider />
          <div className="flex flex-col mb-14">
            <span className="py-1 px-3 text-2xl font-bold mb-2 bg-gray-50">
              이벤트 제목
            </span>
            <span className="ml-2 text-xl font-bold mb-1">"{event.title}"</span>
            <span className="ml-2">{event.descript}</span>
          </div>

          <div className="flex flex-col mb-14">
            <span className="py-1 px-3 text-2xl font-bold mb-2 bg-gray-50">
              이벤트 유형
            </span>
            <span className="text-l ml-2">
              {getState(EVENT_TYPE, event.type)} 이벤트
            </span>
          </div>

          <div className="flex flex-col mb-14">
            <span className="py-1 px-3 text-2xl font-bold mb-2 bg-gray-50">
              이벤트 일시
            </span>
            {event.type === 'FCFS' && (
              <div className="ml-2 text-xl font-bold text-rose-700">
                📌 선착순 이벤트는 정각부터 50분간 진행됩니다.
              </div>
            )}
            <span className="ml-2">
              이벤트 시작일시 : {event.startAt && getDateTime(event.startAt)}
            </span>
            <span className="ml-2">
              이벤트 종료일시 : {event.endAt && getDateTime(event.endAt)}
            </span>
          </div>

          <div className="flex flex-col mb-14">
            <span className="py-1 px-3 text-2xl font-bold mb-2 bg-gray-50">
              이벤트 경품
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {event.eventPrizes &&
                event.eventPrizes.map((eventPrize, index) => (
                  <div
                    key={index}
                    className="text-gray-900 border-1 border py-2 px-8 mb-4 h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left"
                  >
                    {eventPrize.prizeType === 'PRODUCT' ? (
                      <>
                        <img
                          alt="team"
                          className="flex-shrink-0 rounded-lg w-24 h-24 object-cover object-center sm:mb-0 mb-4"
                          src={eventPrize.productImg || NO_IMAGE}
                        />
                        <div className="flex-grow sm:pl-8">
                          <h2 className="title-font font-bold text-lg text-gray-900">
                            {eventPrize.productName}
                          </h2>
                          <h3 className="text-gray-500 mb-2">
                            상품 번호 : {eventPrize.productId}
                          </h3>
                          <p className="mb-4">수량 {eventPrize.stock}개</p>
                        </div>
                        <div className="mb-4 justify-self-end rounded-full py-2 px-4 bg-pink-400 text-white font-bold">
                          상품
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          alt="team"
                          className="flex-shrink-0 rounded-lg w-28 h-28 object-contain sm:mb-0 mb-4"
                          src={ICON_COUPON}
                        />
                        <div className="flex-grow sm:pl-8">
                          <h2 className="title-font font-bold text-lg text-gray-900">
                            {eventPrize.couponName}
                          </h2>
                          <h3 className="text-gray-500 mb-2">
                            쿠폰 번호 : {eventPrize.couponId}
                          </h3>
                          <p className="mb-4">수량 {eventPrize.stock}개</p>
                        </div>
                        <div className="mb-4 justify-self-end rounded-full py-2 px-4 bg-pink-400 text-white font-bold">
                          쿠폰
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <span className="py-1 px-3 text-2xl font-bold mb-2 bg-gray-50">
              이벤트 응모 고객 목록
            </span>
            <span className="ml-2 text-m text-gray-700">
              이벤트에 응모한 고객 목록을 확인할 수 있습니다.
            </span>
          </div>

          <div className="mb-12 overflow-y-auto max-h-96">
            <EventParticipant eventId={eventId}></EventParticipant>
          </div>

          <div className="flex flex-col mb-14">
            <span className="py-1 px-3 text-2xl font-bold mb-2 bg-gray-50">
              이벤트 당첨 고객
            </span>
            {/* TODO : 이벤트 당첨자 리스트 수정예정 */}
            {event.status === EVENT_END ? (
              <div className="mb-12 overflow-y-auto max-h-96">
                <EventWinnerList eventId={eventId} />
              </div>
            ) : (
              <div className="ml-2">이벤트 종료 후 추첨됩니다.</div>
            )}
          </div>

          <div className="flex flex-col mb-14">
            <span className="py-1 px-3 text-2xl font-bold mb-2 bg-gray-50">
              이벤트 이미지
            </span>
            <div className="ml-2">
              <Img
                src={
                  (event.eventImage && event.eventImage.eventBannerImg) ||
                  NO_IMAGE
                }
              />
            </div>
            <div className="ml-2">
              <Img
                src={
                  (event.eventImage && event.eventImage.eventDetailImg) ||
                  NO_IMAGE
                }
              />
            </div>
          </div>

          {modalState && (
            <EventSampleModal setModalState={setModalState} event={event} />
          )}

          {event.status === EVENT_BEFORE && (
            <div className="flex flex-row">
              <div className="mr-4">
                <Pink
                  buttonText="미리보기"
                  onClickFunc={(e) => showBenefitModal(e)}
                />
              </div>
              <div>
                <Pink buttonText="삭제하기" onClickFunc={deleteClickHandler} />
              </div>
            </div>
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
