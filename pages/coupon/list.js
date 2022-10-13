import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import styles from '@styles/Home.module.scss';
import UserCouponList from '@components/coupon/UserCouponList';
import { GET } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function UsersCouponList() {
  // TODO:
  // setUserId(현재로그인되어있는userId-세션,쿠키 등에서 얻어올 것임);
  const uidFromStorage = 4;

  const router = useRouter();
  const [role, setRole] = useState();
  const [userId, setUserId] = useState(uidFromStorage);

  useEffect(() => {
    GET(`/user/role`, { userId }).then((res) => {
      if (res.message === 'ROLE_USER') {
        setRole('USER');
        setUserId(res.data);
      } else if (res.message === 'ROLE_SELLER') {
        alert('잘못된 접근입니다.');
        router.push('/seller/main');
      } else {
        alert('로그인 후에 사용 가능합니다.');
        router.push('/user/signin');
      }
    });
  }, []);

  const userProps = {
    userId: userId,
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
}
