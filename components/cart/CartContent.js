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
  const CommerceCartContentContainer = styled.div`
    background-color: ${ThemeWhite};
    border-radius: 6px;
    padding: 10px 20px;
    margin: 0px 10px;
  `;

  return (
    <CommerceCartContentContainer className="commerce-cart-content-container">
      {cartList &&
        cartList.map((item) => (
          <div className="seller-section" key={item.sellerId}>
            <CartContentHeader storeName={item.storeName} />
            <CartContentDetail
              userId={userId}
              cartItemList={item.cartItemList}
              checkBoxStates={checkBoxStates}
              cartCheckBoxChange={cartCheckBoxChange}
              cartInfoChange={cartInfoChange}
            />
            <CartContentFooter couponList={item.couponList} />
          </div>
        ))}
    </CommerceCartContentContainer>
  );
}
