import { useState } from 'react';
import EventParticipant from './EventParticipant';
import SortButton from '@components/input/SortButton';
import { isEmpty } from '@utils/functions';
export default function EventParticipantList({ participantList }) {

  const [mailSortDesc, setMailSortDesc] = useState(false);
  const [nameSortDesc, setNameSortDesc] = useState(false);
  const [dateSortDesc, setDateSortDesc] = useState(true);

  function sortListByMail(e) {
    e.preventDefault();

    let copyArray = [...participantList];

    if (mailSortDesc) {
      copyArray.sort(function (a, b) {
        if (!(isEmpty(a) || isEmpty(b)))
          // 내림차순
          return a.userEmail > b.userEmail
            ? -1
            : a.userEmail < b.userEmail
            ? 1
            : 0;
      });
      setMailSortDesc(false);
    } else {
      copyArray.sort(function (a, b) {
        // 오름차순
        if (!(isEmpty(a) || isEmpty(b)))
          return a.userEmail < b.userEmail
            ? -1
            : a.userEmail > b.userEmail
            ? 1
            : 0;
      });
      setMailSortDesc(true);
    }

    setParticipantList(copyArray);
  }

  function sortListByName(e) {
    e.preventDefault();
    let copyArray = [...participantList];

    if (dateSortDesc) {
      copyArray.sort(function (a, b) {
        if (!(isEmpty(a) || isEmpty(b)))
          // 내림차순
          return a.userName > b.userName ? -1 : a.userName < b.userName ? 1 : 0;
      });
      setDateSortDesc(false);
    } else {
      copyArray.sort(function (a, b) {
        // 오름차순
        if (!(isEmpty(a) || isEmpty(b)))
          return a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0;
      });
      setDateSortDesc(true);
    }

    setParticipantList(copyArray);
  }

  function sortListByDate(e) {
    e.preventDefault();

    let copyArray = [...participantList];

    if (nameSortDesc) {
      copyArray.sort(function (a, b) {
        if (!(isEmpty(a) || isEmpty(b)))
          // 내림차순
          return a.eventTimeStartAt > b.eventTimeStartAt
            ? -1
            : a.eventTimeStartAt < b.eventTimeStartAt
            ? 1
            : 0;
      });
      setNameSortDesc(false);
    } else {
      copyArray.sort(function (a, b) {
        if (!(isEmpty(a) || isEmpty(b)))
          // 오름차순
          return a.eventTimeStartAt < b.eventTimeStartAt
            ? -1
            : a.eventTimeStartAt > b.eventTimeStartAt
            ? 1
            : 0;
      });
      setNameSortDesc(true);
    }

    setParticipantList(copyArray);
  }

  return (
    <>
      {participantList && participantList.length > 0 ? (
        <table className="text-center w-4/5 text-xl text-left text-gray-500 dark:text-gray-400">
          <thead className="text-base text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className="h-12">
              <th scope="col" className="py-3 px-2 w-20">
                번호
              </th>
              <th scope="col" className="py-3 px-6 w-60">
                <div className="flex items-center justify-center">
                  이름
                  <SortButton
                    onClickFunc={(e) => sortListByName(e)}
                  ></SortButton>
                </div>
              </th>
              <th scope="col" className="py-3 px-6 w-60">
                <div className="flex items-center justify-center">
                  이메일
                  <SortButton
                    onClickFunc={(e) => sortListByMail(e)}
                  ></SortButton>
                </div>
              </th>
              <th scope="col" className="py-3 px-6 w-100">
                <div className="flex items-center justify-center">
                  선택 경품
                </div>
              </th>
              <td scope="col" className="py-3 px-2 w-60">
                <div className="flex items-center justify-center">
                  응모일시
                  <SortButton
                    onClickFunc={(e) => sortListByDate(e)}
                  ></SortButton>
                </div>
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
        <div className="ml-2 font-semibold">
          현재 이벤트에 참가한 사용자가 없습니다.
        </div>
      )}
    </>
  );
}
