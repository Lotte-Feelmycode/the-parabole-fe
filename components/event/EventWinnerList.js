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
      <table className="text-center w-4/5">
        <thead className="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="h-12">
            <th scope="col" className="py-3 px-2 w-20">
              유저 이메일
            </th>
            <th scope="col" className="py-3 px-2 w-20">
              응모 경품
            </th>
          </tr>
        </thead>
        <tbody>
          {eventWinnerList &&
            eventWinnerList.map((eventWinner) => (
              <EventWinner eventWinner={eventWinner} />
            ))}
        </tbody>
        <tfoot>
            <tr className="text-right font-semibold bg-gray-100 text-gray-900 dark:text-white">
                <td className="py-2 px-4" colSpan="2">당첨자 수 : {eventWinnerList && eventWinnerList.length}명</td>
            </tr>
        </tfoot>
      </table>
    </>
  );
}
