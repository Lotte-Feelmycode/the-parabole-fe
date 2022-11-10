import SellerLayout from '@components/seller/SellerLayout';
import SiteHead from '@components/common/SiteHead.js';
import SellerOrderList from '@components/order/SellerOrderList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useGetToken } from '@hooks/useGetToken';

export default function Home() {
  const router = useRouter();

  const [headers, setHeaders] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push('/signin');
      } else if (localStorage.getItem('role') === 'ROLE_USER') {
        alert('판매자 페이지입니다.');
        router.push('/');
      }
    }
    setHeaders(useGetToken());
  }, []);

  const userId = 1;
  const [sellerId, setSellerId] = useState(router.query.id);

  useEffect(() => {
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
          <SellerOrderList sellerId={userId} />
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
