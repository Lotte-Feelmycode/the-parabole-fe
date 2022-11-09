import SiteHead from '@components/common/SiteHead.js';
import styles from '@styles/Home.module.scss';
import SellerLayout from '@components/seller/SellerLayout';
import CouponList from '@components/coupon/CouponList';
import { useGetToken } from '@hooks/useGetToken';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SellersCouponList() {
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

  return (
    <SellerLayout>
      <SiteHead title="Seller's Coupon List" />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className={styles.section}>THE PARABOLE</h1>
          <h2 className={styles.section}>판매자가 등록한 쿠폰목록</h2>
          <CouponList />
        </div>
      </section>
    </SellerLayout>
  );
}
