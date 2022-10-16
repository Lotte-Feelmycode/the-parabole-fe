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
      <table class="w-full text-m text-center">
        <thead class="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr class="h-12">
            <td scope="col" class="py-1">
              이벤트 시작일자
            </td>
            <td scope="col" class="py-1">
              참여한 유저 이메일
            </td>
            <td scope="col" class="py-1">
              참여한 유저 이름
            </td>
            <td scope="col" class="py-1">
              참여한 유저 전화번호
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
    </>
  );
}
