import { useEffect, useState } from 'react';
import { GET_DATA } from '@apis/defaultApi';
import Event from '@components/event/Event';
import styled from '@emotion/styled';

export default function EventList() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    GET_DATA(`/event`).then((res) => {
      setEventList(res);
    });
  }, []);

  return (
    <>
      <List>
        {eventList && eventList.map((event) => <Event event={event} />)}
      </List>
    </>
  );
}

const List = styled.div`
  display: inline-block;
`;
