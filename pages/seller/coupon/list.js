import SiteHead from '@components/common/SiteHead.js';
import styles from '@styles/Home.module.scss';
import CouponList from '@components/coupon/CouponList';
import { GET_DATA } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SellerLayout from '@components/seller/SellerLayout';

export default function SellersCouponList() {
  // TODO:
  // setUserId(현재로그인되어있는userId-세션,쿠키 등에서 얻어올 것임);
  const uidFromStorage = 4;

  const router = useRouter();
  const [role, setRole] = useState();
  const [userId, setUserId] = useState(uidFromStorage);
  const [sellerId, setSellerId] = useState();

  useEffect(() => {
    GET_DATA(`/user/role`, { userId }).then((res) => {
      if (res.message === 'ROLE_USER') {
        alert('잘못된 접근입니다.');
        router.push('/');
      } else if (res.message === 'ROLE_SELLER') {
        setRole('SELLER');
        setSellerId(res.data);
      } else {
        alert('로그인 후에 사용 가능합니다.');
        router.push('/user/signin');
      }
    });
  }, []);

  const sellerProps = {
    sellerId: sellerId,
  };

  if (role === 'SELLER') {
    return (
      <SellerLayout>
        <SiteHead title="Seller's Coupon List" />
        <section className="flex min-h-screen flex-col text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className={styles.section}>THE PARABOLE</h1>
            <h2 className={styles.section}>판매자가 등록한 쿠폰목록</h2>
            <CouponList {...sellerProps}></CouponList>
          </div>
        </section>
      </SellerLayout>
    );
  }
}
