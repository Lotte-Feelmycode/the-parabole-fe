import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { GET_DATA } from '@apis/defaultApi';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import Event from '@components/event/Event';
import CustomSwiper from '@components/common/CustomSwiper';

export default function EventHome() {
  return (
    <CommerceLayout>
      <SiteHead title="이벤트" url="https://theparabole.shop/event" />
      <div className="container py-12">
        <CustomSwiper />
        <Row>
          <EventList />
        </Row>
      </div>
    </CommerceLayout>
  );
}

function EventList() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    GET_DATA(`/event`).then((res) => {
      setEventList(res);
    });
  }, []);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="flex justify-between items-end gap-4 mb-6">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold">
            이벤트 목록
          </h2>
        </div>
        <List className="contents list-none text-center whitespace-nowrap">
          {eventList &&
            eventList.map((event) => <Event event={event} key={event.id} />)}
        </List>
      </div>

      <PaginationSection></PaginationSection>
    </div>
  );
}

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-right: -10px;
  margin-left: -10px;
  align-items: stretch;
  margin-bottom: 40px;
`;

const PaginationSection = styled.div`
  text-align: center;
`;
