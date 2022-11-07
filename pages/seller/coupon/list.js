import SiteHead from '@components/common/SiteHead.js';
import styles from '@styles/Home.module.scss';
import SellerLayout from '@components/seller/SellerLayout';
import CouponList from '@components/coupon/CouponList';

export default function SellersCouponList() {
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
