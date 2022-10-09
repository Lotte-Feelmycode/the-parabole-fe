import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import CouponList from '@components/coupon/CouponList';
import styles from '@styles/Home.module.scss';

export default function SellersCouponList() {
  const props = {
    sellerId: 1,
  };

  return (
    <CommerceLayout>
      <SiteHead title="Seller's Coupon List" />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className={styles.section}>THE PARABOLE</h1>
          <h2 className={styles.section}>판매자가 등록한 쿠폰목록</h2>
          <CouponList {...props}></CouponList>
        </div>
      </section>
    </CommerceLayout>
  );
}
