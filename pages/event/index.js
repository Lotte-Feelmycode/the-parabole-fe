import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import EventList from '@components/event/EventList';
import styled from '@emotion/styled';

export default function EventHome() {
  return (
    <CommerceLayout>
      <SiteHead title="EventHome" />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <H1>이벤트목록</H1>
          <EventList />
        </div>
      </section>
    </CommerceLayout>
  );
}

const H1 = styled.div`
  font-size: 2rem;
  margin: 1rem;
`;
