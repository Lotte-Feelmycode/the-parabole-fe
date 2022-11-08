import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { getDateTime } from '@utils/functions';

export default function EventParticipant({ participant }) {
  const [partinfo, setPartinfo] = useState(participant);

  useEffect(() => {
    setPartinfo(partinfo);
  }, [participant]);

  return (
    <tr
      key={partinfo.id}
      className="h-12 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <td>{partinfo.user.email}</td>
      <td>{partinfo.user.name}</td>
      <td>{partinfo.eventPrizes[0].productName}</td>
      <td>{getDateTime(partinfo.eventTimeStartAt)}</td>
    </tr>
  );
}
