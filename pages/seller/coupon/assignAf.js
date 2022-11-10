import SiteHead from '@components/common/SiteHead';
import SellerLayout from '@components/seller/SellerLayout';
import { useGetToken } from '@hooks/useGetToken';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CouponAssignAf() {
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
      <SiteHead title="Coupon Assign Complete" />
      <p>
        이 페이지는 중간 발표 이후에 작업합니다. 따라서 쿠폰 배정 버튼은 현재
        동작 X 상태입니다.
      </p>
    </SellerLayout>
  );
}
