import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GET, DELETE } from '@apis/defaultApi';
import styled from '@emotion/styled';
import SellerLayout from '@components/seller/SellerLayout';
import SiteHead from '@components/common/SiteHead';
import Heading from '@components/input/Heading';
import * as btn from '@components/input/Button';
import getTime from '@utils/functions';
import { EVENT_TYPE, EVENT_STATUS } from '@utils/constants/types';

export default function EventDetail() {
  const router = useRouter();
  const [eventId, setEventId] = useState(router.query.id);
  const [event, setEvent] = useState([]);

  const EVENT_BEFORE = 0;
  useEffect(() => {
    const eventId = router.query.id;
    if (eventId) {
      setEventId(eventId);
      GET(`/event/${eventId}`).then((res) => {
        if (res && res.data.id == eventId) {
          setEvent(res.data);
        }
      });
    }
  }, [router.query]);

  const deleteClickHandler = async (e) => {
    e.preventDefault();
    DELETE(`/event/${eventId}`, {}).then((res) => {
      if (res && res.success == true) {
        //TODO: 수정필요
        alert('삭제 되었습니다. ');
        router.push({ pathname: `/seller/event/list` }, `/seller/event/list`);
      }
    });
  };

  return (
    <SellerLayout>
      <SiteHead title={'Seller Office'} />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <Heading title="이벤트 상세" type="h1" />
          <Divider />
          <Heading title={event.title} type="h2" />
          <br />
          <Heading title="이벤트 유형" type="h3" />
          <span>
            {EVENT_TYPE.filter((value) => value.code === event.type)[0].name}
            &nbsp;이벤트
          </span>
          <br />
          <br />
          <Heading title="이벤트 일시" type="h3" />
          <span>
            이벤트 시작일시 : {event.startAt && getTime(event.startAt)}
          </span>
          <br />
          <span>이벤트 종료일시 : {event.endAt && getTime(event.endAt)}</span>
          <br />

          <br />
          <Heading title="이벤트 이미지" type="h3" />
          <Img src={event.eventImage && event.eventImage.eventBannerImg}></Img>
          <br />
          <Img src={event.eventImage && event.eventImage.eventDetailImg}></Img>
          <br />

          {event.status === EVENT_BEFORE && (
            // TODO: 수정
            <DivHor>
              <btn.LineBlue buttonText="수정하기" />
              <btn.Blue
                buttonText="삭제하기"
                onClickFunc={deleteClickHandler}
              ></btn.Blue>
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
