import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export default function EventWinner({ eventWinner }) {
  const [winnerInfo, setWinnerInfo] = useState(eventWinner);

  useEffect(() => {
    setWinnerInfo(eventWinner);
  }, [eventWinner]);

  return (
    <tr
      key={eventWinner.eventWinnerId}
      className="text-base h-12 bg-white border-b hover:bg-gray-50"
    >
      <td className="py-4 px-4 w-40 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {eventWinner.userEmail}
      </td>
      <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {eventWinner.prizeName}
      </td>
    </tr>
  );
}
