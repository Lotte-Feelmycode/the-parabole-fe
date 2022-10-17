import SiteHead from '@components/common/SiteHead.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CommerceLayout from '@components/common/CommerceLayout';
import styled from '@emotion/styled';
import EventList from '@components/event/EventList';

export default function Event() {
  const router = useRouter();
  const [userId, setUserId] = useState(router.query.id);

  useEffect(() => {
    setUserId(router.query.id);
  }, [router]);

  return (
    <>
      <CommerceLayout>
        <SiteHead title="EventList" />
        <section className="flex min-h-screen flex-col text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <H1>이벤트 </H1>
            <EventList userId={userId} />
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
