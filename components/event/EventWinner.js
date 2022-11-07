import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { getDateTime } from '@utils/functions';

export default function EventWinner({ eventWinner }) {
  const [winnerInfo, setWinnerInfo] = useState(eventWinner);

  useEffect(() => {
    setWinnerInfo(eventWinner);
  }, [eventWinner]);

  return (
    <tr>
      <Td>{eventWinner.eventTitle}</Td>
      <Td>{eventWinner.userEmail}</Td>
      <Td>{eventWinner.prizeName}</Td>
    </tr>
  );
}

const Td = styled.td`
  padding: 30px;
  font-family: 'SansLight';
`;
