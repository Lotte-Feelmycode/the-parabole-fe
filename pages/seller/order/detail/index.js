import SellerLayout from '@components/seller/SellerLayout';
import SiteHead from '@components/common/SiteHead.js';
import SellerOrderList from '@components/order/SellerOrderList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

export default function Home() {
  const router = useRouter();
  const [sellerId, setSellerId] = useState(router.query.id);

  useEffect(() => {
    console.log(router.query.id);
    setSellerId(router.query.id);
  }, [router.query.id]);

  // TODO: userID 값 가져오기
  return (
    <SellerLayout>
      <SiteHead title="OrderListHome" />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <H1>THE PARABOLE SELLER OFFICE</H1>
          {/* TODO: sellerId는 로그인한 판매자의 userId를 받아와야 함 */}
          <SellerOrderList sellerId={2} />
        </div>
      </section>
    </SellerLayout>
  );
}

const H1 = styled.h1`
  font-size: 30px;
  margin-bottom: 30px;
  font-family: 'SansBold';
`;
