import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import EventList from '@components/event/EventList';
import styles from '@styles/Home.module.scss';

export default function EventHome() {
  return (
    <CommerceLayout>
      <SiteHead title="EventHome" />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className={styles.section}>THE PARABOLE</h1>
          <h2 className={styles.section}>이벤트목록</h2>
          <EventList />
        </div>
      </section>
    </CommerceLayout>
  );
}
