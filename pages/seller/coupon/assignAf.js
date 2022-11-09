import SiteHead from '@components/common/SiteHead';
import SellerLayout from '@components/seller/SellerLayout';
import { useGetToken } from '@hooks/useGetToken';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CouponAssignAf() {
  const router = useRouter();
  useEffect(() => {
    let sellerId, role;
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      sellerId = localStorage.getItem('sellerId');
      role = localStorage.getItem('role');
    }
    if (
      sellerId === 'undefined' ||
      sellerId === undefined ||
      sellerId === 'null' ||
      role === 'ROLE_USER'
    ) {
      alert('판매자 페이지입니다.');
      router.push('/');
    }
    useGetToken();
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
