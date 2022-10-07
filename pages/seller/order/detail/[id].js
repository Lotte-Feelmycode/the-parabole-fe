import SellerLayout from '@components/seller/SellerLayout';
import SiteHead from '@components/common/SiteHead.js';
import SellerOrderList from '@components/order/SellerOrderList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [sellerId, setSellerId] = useState(router.query.id);

  useEffect(() => {
    setSellerId(router.query.id);
  }, [router]);

  return (
    <SellerLayout>
      <SiteHead title="OrderListHome" />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1>THE PARABOLE SELLER OFFICE</h1>
          {/* TODO: sellerId는 로그인한 판매자의 userId를 받아와야 함 */}
          <SellerOrderList sellerId={sellerId} />
        </div>
      </section>
    </SellerLayout>
  );
}
