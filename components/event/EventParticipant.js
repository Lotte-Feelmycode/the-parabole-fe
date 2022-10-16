import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { getTime } from '@utils/functions';

export default function EventParticipant({ participant }) {
  const [user, setUser] = useState(participant.user);

  useEffect(() => {
    console.log(participant.user);
    setUser(participant.user);
  }, [participant]);

  return (
    <tr>
      <Td>{getTime(participant.eventTimeStartAt)}</Td>
      <Td>{user.email}</Td>
      <Td>{user.name}</Td>
      <Td>{user.phone}</Td>
    </tr>
  );
}

const Td = styled.td`
  padding: 30px;
  font-family: 'SansLight';
`;
