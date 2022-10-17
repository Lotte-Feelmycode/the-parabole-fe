import SiteHead from '@components/common/SiteHead.js';
import UserOrderList from '@components/order/UserOrderList';
import { useRouter } from 'next/router';
import CommerceLayout from '@components/common/CommerceLayout';
import styled from '@emotion/styled';
import { useState } from 'react';

export default function Home() {
  const getUserId = 1;

  const [userId, setUserId] = useState(getUserId);

  return (
    <>
      <CommerceLayout>
        <SiteHead title="UserOrderList" />
        <section className="flex min-h-screen flex-col text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <H1>주문 목록</H1>
            <UserOrderList userId={userId} />
          </div>
        </section>
      </CommerceLayout>
    </>
  );
}

const H1 = styled.h1`
  font-size: 30px;
  margin-bottom: 30px;
  font-family: 'SansBold';
`;
