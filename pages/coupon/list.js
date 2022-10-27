import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import styles from '@styles/Home.module.scss';
import UserCouponList from '@components/coupon/UserCouponList';
import { GET } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function UsersCouponList() {
  return (
    <CommerceLayout>
      <SiteHead title="User's Coupon List" />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className={styles.section}>THE PARABOLE</h1>
          <h2 className={styles.section}>사용자가 보유한 쿠폰목록</h2>
          <UserCouponList />
        </div>
      </section>
    </CommerceLayout>
  );
}
