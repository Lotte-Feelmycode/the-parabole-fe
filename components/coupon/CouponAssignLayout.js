import styled from '@emotion/styled';
import UserSearchBar from './UserSearchBar';

export default function CouponAssignLayout({ children }) {
  return (
    <>
      <Main>
        <Section>{children}</Section>
        <UserSearchBar />
      </Main>
    </>
  );
}

const Main = styled.nav`
  display: 'flex',
  flexDirection: 'row',
`;

const Section = styled.nav`
  width: '1024px';
`;
