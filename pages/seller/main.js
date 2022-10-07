import SellerLayout from '@components/seller/SellerLayout';
import SiteHead from '@components/common/SiteHead.js';
import Link from 'next/link';
export default function Home() {
  return (
    <SellerLayout>
      <SiteHead title={'Seller Office'} />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1>THE PARABOLE SELLER OFFICE</h1>
          <Link href="/seller/main">
            <a>📌홈</a>
          </Link>
          <hr />
          <Link href="/seller/event/list">
            <a>📌이벤트</a>
          </Link>
        </div>
      </section>
    </SellerLayout>
  );
}
