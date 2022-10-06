import { useEffect, useState } from 'react';
import { GET } from '@apis/defaultApi';
import Event from '@components/event/Event';

export default function EventList() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    GET(`/event`).then((res) => {
      setEventList(res);
    });
  }, []);

  return (
    <ul className="event-list">
      {eventList.map((event) => (
        <li key={event.id}>
          <Event event={event} />
        </li>
      ))}
    </ul>
  );
}
