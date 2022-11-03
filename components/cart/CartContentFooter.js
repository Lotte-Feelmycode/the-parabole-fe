import styled from '@emotion/styled';
import { SmallLineBlue } from '@components/input/Button';
import { useState } from 'react';
import CartCouponModal from './CartCouponModal';

export default function CartContentFooter({
  cartItemDtoList,
  storeName,
  couponDto,
}) {
  const [modalState, setModalState] = useState(false);
  let contentTotalPrice = 0;
  if (cartItemDtoList && cartItemDtoList.length > 0) {
    cartItemDtoList.forEach((item) => {
      contentTotalPrice =
        (contentTotalPrice + item.product.productPrice) * item.count;
    });
  }

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
          couponDto={couponDto}
          contentTotalPrice={contentTotalPrice}
          storeName={storeName}
        />
      )}
    </ContentFooterSection>
  );
}
