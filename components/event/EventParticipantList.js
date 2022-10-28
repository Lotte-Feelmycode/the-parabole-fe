import { GET_DATA } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import EventParticipant from './EventParticipant';

export default function EventParticipantList({ eventId }) {
  console.log(eventId);

  const [participantList, setParticipantList] = useState([]);

  useEffect(() => {
    GET_DATA(`/event/seller/participant/${eventId}`).then((res) => {
      setParticipantList(res);
    });
  }, [eventId]);

  return (
    <>
      {participantList && participantList.length > 0 ? (
        <table className="w-2/3 text-m text-center">
          <thead className="text-m uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="h-12">
              <td scope="col" className="py-1 px-2">
                이벤트 참여 일자
              </td>
              <td scope="col" className="py-1 px-4">
                이메일
              </td>
              <td scope="col" className="py-1 px-4">
                이름
              </td>
              <td scope="col" className="py-1 px-2">
                전화번호
              </td>
              <td scope="col" className="py-1 px-2">
                선택 경품
              </td>
            </tr>
          </thead>
          <tbody>
            {participantList &&
              participantList.map((participant) => (
                <EventParticipant participant={participant} />
              ))}
          </tbody>
        </table>
      ) : (
        <div className="font-semibold">
          현재 이벤트에 참가한 사용자가 없습니다.
        </div>
      )}
    </>
  );
}
