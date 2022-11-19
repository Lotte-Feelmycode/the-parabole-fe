import { GET_DATA } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import EventWinner from '@components/event/EventWinner';
export default function EventWinnerList({ eventId }) {
  const [eventWinnerList, setEventWinnerList] = useState([]);

  useEffect(() => {
    GET_DATA(`/event/seller/eventWinner/list/${eventId}`).then((res) => {
      setEventWinnerList(res);
    });
  }, [eventId]);

  return (
    <>
      <table className="w-full text-m text-center">
        <thead className="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="h-12">
            <td scope="col" className="py-1">
              이벤트 제목
            </td>
            <td scope="col" className="py-1">
              참여한 유저 이메일
            </td>
            <td scope="col" className="py-1">
              참여한 상품
            </td>
          </tr>
        </thead>
        <tbody>
          {eventWinnerList &&
            eventWinnerList.map((eventWinner) => (
              <EventWinner eventWinner={eventWinner} />
            ))}
        </tbody>
      </table>
    </>
  );
}
