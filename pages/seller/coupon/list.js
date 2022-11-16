import SiteHead from '@components/common/SiteHead.js';
import styles from '@styles/Home.module.scss';
import SellerLayout from '@components/seller/SellerLayout';
import CouponList from '@components/coupon/CouponList';
import { useGetToken } from '@hooks/useGetToken';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Heading from '@components/input/Heading';
import { Divider } from '@mui/material';

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
      <Heading title="쿠폰 목록" type="h1" />
      <div className="py-1" />
      <Divider />
      <CouponList />
    </SellerLayout>
  );
}
