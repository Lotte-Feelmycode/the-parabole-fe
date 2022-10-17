import SiteHead from '@components/common/SiteHead';
import SellerLayout from '@components/seller/SellerLayout';

export default function CouponAssignAf() {
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
