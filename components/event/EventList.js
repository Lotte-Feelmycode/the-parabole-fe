import { useEffect, useState } from 'react';
import { GET } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import Event from '@components/event/Event';
//import TestCompo from '@components/event/TestCompo';

export default function EventList() {
  const router = useRouter();

  const [eventList, setEventList] = useState([]);
  const [val, setVal] = useState();

  var idval;

  useEffect(() => {
    console.log(router);
    GET(`/event`).then((res) => {
      console.log('RES', res);

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
