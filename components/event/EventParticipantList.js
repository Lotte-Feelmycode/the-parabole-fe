import { GET_DATA } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import EventParticipant from './EventParticipant';
import { dto } from '@pages/seller/event/DummyData';
import { SortButton } from '@components/input/SortButton';
export default function EventParticipantList({ eventId }) {
  const [participantList, setParticipantList] = useState([]);

  useEffect(() => {
    console.log(dto);
    setParticipantList(dto.data);
    // if (eventId) {
    //   GET_DATA(`/event/seller/participant/${eventId}`).then((res) => {
    //     setParticipantList(res);
    //   });
    // }
  }, []);

  return (
    <>
      {participantList && participantList.length > 0 ? (
        <table className="text-center w-4/5 text-xl text-left text-gray-500 dark:text-gray-400">
          <caption className="py-5 text-left bg-white dark:text-white dark:bg-gray-800">
            <p className="text-xl font-semibold text-gray-900">
              이벤트 응모 고객 목록
            </p>
            <p className="mt-1 text-m text-gray-700">
              이벤트에 응모한 고객 목록을 확인할 수 있습니다.
            </p>
          </caption>
          <thead className="text-base text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className="h-12">
              <th scope="col" className="py-3 px-2 w-20">
                번호
              </th>
              <th scope="col" className="py-3 px-6 w-60">
                <div className="flex items-center justify-center">
                  이름
                  {/* <SortButton /> */}
                </div>
              </th>
              <th scope="col" className="py-3 px-6 w-60">
                이메일
              </th>
              <th scope="col" className="py-3 px-6 w-100">
                <div className="flex items-center justify-center">
                  선택 경품
                  {/* <SortButton /> */}
                </div>
              </th>
              <td scope="col" className="py-3 px-2 w-60">
                이벤트 참여 일자
              </td>
            </tr>
          </thead>
          <tbody>
            {participantList &&
              participantList.map((participant, index) => (
                <EventParticipant idx={index} participant={participant} />
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
