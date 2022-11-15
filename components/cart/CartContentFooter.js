import { useState, useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { SmallLineBlue } from '@components/input/Button';
import CartCouponModal from '@components/cart/CartCouponModal';
import { LoginHeaderContext } from '@pages/user/cart/index';
import { GET_DATA } from '@apis/defaultApi';

export default function CartContentFooter({
  contentTotalPrice,
  storeName,
  sellerId,
}) {
  const headers = useContext(LoginHeaderContext);
  const [modalState, setModalState] = useState(false);
  const [couponArray, setCouponArray] = useState([]);

  useEffect(() => {
    GET_DATA(
      `/coupon`,
      { sellerId, totalFee: contentTotalPrice },
      headers,
    ).then((res) => {
      console.log(res);
      if (res) {
        setCouponArray(res);
      }
    });
  }, []);

  const showModal = () => {
    setModalState(true);
  };

  const ContentFooterSection = styled.div`
    text-align: right;
    padding-top: 10px;
  `;

  return (
    <ContentFooterSection>
      <SmallLineBlue buttonText={'쿠폰보기'} onClickFunc={showModal} />
      {modalState && (
        <CartCouponModal
          setModalState={setModalState}
          storeName={storeName}
          sellerId={sellerId}
          couponArray={couponArray}
          contentTotalPrice={contentTotalPrice}
        />
      )}
    </ContentFooterSection>
  );
}
