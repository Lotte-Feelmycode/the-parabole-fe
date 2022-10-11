import SiteHead from '@components/common/SiteHead.js';
import UserOrderList from '@components/order/UserOrderList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState(router.query.id);

  useEffect(() => {
    setUserId(router.query.id);
  }, [router]);

  return (
    <>
      <SiteHead title="UserOrderList" />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1>OrderList</h1>
          <UserOrderList userId={userId} />
        </div>
      </section>
    </>
  );
}
