import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';

export default function Home() {
  return (
    <CommerceLayout>
      <SiteHead title={'Home'} />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1>THE PARABOLE</h1>
        </div>
      </section>
    </CommerceLayout>
  );
}
