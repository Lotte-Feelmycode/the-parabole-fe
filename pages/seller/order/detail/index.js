import SellerLayout from '@components/seller/SellerLayout';
import SiteHead from '@components/common/SiteHead.js';
import SellerOrderList from '@components/order/SellerOrderList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useGetToken } from '@hooks/useGetToken';
import { LINKS } from '@utils/constants/links';

export default function Home() {
  const router = useRouter();

  const [headers, setHeaders] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push(LINKS.SIGNIN);
      } else if (localStorage.getItem('role') === 'ROLE_USER') {
        alert('판매자 페이지입니다.');
        router.push(LINKS.MAIN);
      }
    }
    setHeaders(useGetToken());
  }, []);

  return (
    <SellerLayout>
      <SiteHead title="OrderListHome" />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div>
          <span className="text-3xl font-bold">주문 내역 조회</span>
        </div>
        <Divider />
        <div className="container py-12 mx-auto">
          <SellerOrderList headers={headers} />
        </div>
      </section>
    </SellerLayout>
  );
}

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;
