import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { getDateTime } from '@utils/functions';

export default function EventParticipant({ participant }) {
  const [partinfo, setPartinfo] = useState(participant);

  useEffect(() => {
    setPartinfo(partinfo);
  }, [participant]);

  return (
    <tr className="py-1">
      <td>{getDateTime(partinfo.eventTimeStartAt)}</td>
      <td>{partinfo.user.email}</td>
      <td>{partinfo.user.name}</td>
      <td>{partinfo.user.phone}</td>
      <td>{partinfo.eventPrizes[0].productName}</td>
    </tr>
  );
}
