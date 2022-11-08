import styled from '@emotion/styled';
import { ThemeWhite } from '@utils/constants/themeColor';
import CartContentDetail from '@components/cart/CartContentDetail';
import CartContentFooter from '@components/cart/CartContentFooter';
import CartContentHeader from '@components/cart/CartContentHeader';

export default function CartContent({
  userId,
  cartBySellerDtoList,
  checkBoxStates,
  cartCheckBoxChange,
  cartInfoChange,
}) {
  const CommerceCartContentContainer = styled.div``;

  const CartStoreSection = styled.div`
    background-color: ${ThemeWhite};
    border-radius: 6px;
    margin-bottom: 20px;

    @media (max-width: 1024px) {
      padding: 10px 10px;
    }
    @media (min-width: 1024px) {
      padding: 10px 20px;
      margin: 30px 0;
    }
  `;

  return (
    <CommerceCartContentContainer className="commerce-cart-content-container">
      {cartBySellerDtoList &&
        cartBySellerDtoList.map((item) => (
          <CartStoreSection className="cart-store-section" key={item.sellerId}>
            <CartContentHeader storeName={item.storeName} />
            <CartContentDetail
              userId={userId}
              storeName={item.storeName}
              cartItemDtoList={item.cartItemDtoList}
              checkBoxStates={checkBoxStates}
              cartCheckBoxChange={cartCheckBoxChange}
              cartInfoChange={cartInfoChange}
            />
            <CartContentFooter
              couponDto={item.couponDto}
              storeName={item.storeName}
              cartItemDtoList={item.cartItemDtoList}
            />
          </CartStoreSection>
        ))}
    </CommerceCartContentContainer>
  );
}
