import styled from '@emotion/styled';
import { ThemeWhite } from '@utils/constants/themeColor';
import CartContentDetail from '@components/cart/CartContentDetail';
import CartContentFooter from '@components/cart/CartContentFooter';
import CartContentHeader from '@components/cart/CartContentHeader';

export default function CartContent({
  userId,
  cartList,
  checkBoxStates,
  cartCheckBoxChange,
  cartInfoChange,
}) {
  const CommerceCartContentContainer = styled.div``;

  const CartStoreSection = styled.div`
    background-color: ${ThemeWhite};
    border-radius: 6px;
    padding: 10px 20px;
    margin: 0 10px;
    margin-bottom: 20px;
  `;

  return (
    <CommerceCartContentContainer className="commerce-cart-content-container">
      {cartList &&
        cartList.map((item) => (
          <CartStoreSection className="cart-store-section" key={item.sellerId}>
            <CartContentHeader storeName={item.storeName} />
            <CartContentDetail
              userId={userId}
              storeName={item.storeName}
              cartItemList={item.cartItemList}
              checkBoxStates={checkBoxStates}
              cartCheckBoxChange={cartCheckBoxChange}
              cartInfoChange={cartInfoChange}
            />
            <CartContentFooter
              couponList={item.couponList}
              storeName={item.storeName}
              cartItemList={item.cartItemList}
            />
          </CartStoreSection>
        ))}
    </CommerceCartContentContainer>
  );
}
