import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GET } from '@apis/defaultApi';
import styled from '@emotion/styled';
import SellerLayout from '@components/seller/SellerLayout';
import SiteHead from '@components/common/SiteHead';
import Heading from '@components/input/Heading';
import PostButton from '@components/input/Button';
import getTime from '@utils/functions';

export default function EventDetail() {
  const router = useRouter();
  const [eventId, setEventId] = useState(router.query.id);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const eventId = router.query.id;
    if (eventId) {
      setEventId(eventId);
      GET(`/event/${eventId}`).then((res) => {
        if (res && res.id == eventId) {
          setEvent(res);
        }
      });
    }
  }, [router.query]);
  return (
    <SellerLayout>
      <SiteHead title={'Seller Office'} />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <Heading title="이벤트 상세" type="h1" />
          <Divider />
          <Heading title={event.title} type="h2"></Heading>
          <span>
            이벤트 유형 :{' '}
            {event.type === 'RAFFLE' ? '추첨 이벤트' : '선착순 이벤트'}
          </span>
          <br />
          <span>이벤트 시작일시 : {getTime(event.startAt)}</span>
          <br />
          <span>이벤트 종료일시 : {getTime(event.endAt)}</span>
          <br />

          <Img src={event.eventImage.eventBannerImg}></Img>
          <br />
          <Img src={event.eventImage.eventDetailImg}></Img>
          <br />

          {event.status === '0' && (
            // 진행 전인 이벤트만 수정 및 삭제 가능
            // 수정 및 삭제 버튼 - 이벤트 핸들러 붙이기
            <DivHor>
              <PostButton buttonText="수정하기" />
              <PostButton buttonText="삭제하기" />
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
