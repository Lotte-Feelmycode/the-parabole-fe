import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { getDateTime } from '@utils/functions';

export default function EventParticipant({ idx, participant }) {
  const [partinfo, setPartinfo] = useState(participant);

  useEffect(() => {
    setPartinfo(partinfo);
  }, [participant]);

  return (
    <tr
      key={partinfo.id}
      className="text-base h-12 bg-white border-b hover:bg-gray-50"
    >
      <td className="py-4 px-2">{idx + 1}</td>
      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {partinfo.userName}
      </td>
      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {partinfo.userEmail}
      </td>
      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {partinfo.eventPrizes[0].coupon.name ||
          partinfo.eventPrizes[0].product.name}
      </td>
      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {getDateTime(partinfo.eventTimeStartAt)}
      </td>
    </tr>
  );
}
