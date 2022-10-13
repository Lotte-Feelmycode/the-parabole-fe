import styled from '@emotion/styled';
import Head from 'next/head';
import * as COLOR from '@utils/constants/themeColor';

export default function Coupon({ couponInfo }) {
  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <div>
          <CouponCard>
            <h3></h3>
            <h3>{couponInfo.couponDetail}</h3>
            <br />
            <p>유효 기간: {couponInfo.expiresAt}</p>
            <Circle1 />
            <Circle2 />
          </CouponCard>
        </div>
      </body>
    </>
  );
}
const CouponCard = styled.div`
  // background: linear-gradient(135deg, #7158fe, #9d4de6);
  background: ${COLOR.ThemeBlueWhite};
  color: ${COLOR.MainBlue};
  text-align: center;
  padding: 50px 60px;
  margin-top: 50px;
  border-radius: 15px;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.15);
  position: relative;
`;
const Circle1 = styled.div`
  background: #f0fff3;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -25px;
`;
const Circle2 = styled.div`
  background: #f0fff3;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -25px;
`;
