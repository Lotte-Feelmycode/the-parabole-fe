import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import styles from '@styles/Home.module.scss';
import UserCouponList from '@components/coupon/UserCouponList';
import CouponList from '@components/coupon/CouponList';
import { GET } from '@apis/defaultApi';
import { useEffect, useState } from 'react';

export default function SellerCouponList() {
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState(2);
  const [sellerId, setSellerId] = useState();

  // TODO:
  // setUserId(현재로그인되어있는userId-세션,쿠키 등에서 얻어올 것임);

  useEffect(() => {
    GET(`/user/role`, { userId }).then((res) => {
      if (res.message === 'ROLE_USER') {
        setRole('USER');
      }
      if (res.message === 'ROLE_SELLER') {
        setRole('SELLER');
        setSellerId(res.data);
      }
    });
  }, []);

  const userProps = {
    userId: userId,
  };

  const sellerProps = {
    sellerId: sellerId,
  };

  if (role === 'USER') {
    return (
      <CommerceLayout>
        <SiteHead title="User's Coupon List" />
        <section className="flex min-h-screen flex-col text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className={styles.section}>THE PARABOLE</h1>
            <h2 className={styles.section}>사용자가 보유한 쿠폰목록</h2>
            <UserCouponList {...userProps}></UserCouponList>
          </div>
        </section>
      </CommerceLayout>
    );
  }

  if (role === 'SELLER') {
    return (
      <CommerceLayout>
        <SiteHead title="Seller's Coupon List" />
        <section className="flex min-h-screen flex-col text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className={styles.section}>THE PARABOLE</h1>
            <h2 className={styles.section}>판매자가 등록한 쿠폰목록</h2>
            <CouponList {...sellerProps}></CouponList>
          </div>
        </section>
      </CommerceLayout>
    );
  }
}
