import styled from '@emotion/styled';
import { ThemeWhite } from '@utils/constants/themeColor';
import CartContentDetail from '@components/cart/CartContentDetail';
import CartContentFooter from '@components/cart/CartContentFooter';
import CartContentHeader from '@components/cart/CartContentHeader';

export default function CartContent({
  cartBySellerDtoList,
  checkBoxStates,
  cartCheckBoxChange,
  cartInfoChange,
}) {
  function ShowCartStore({ item }) {
    let contentTotalPrice = 0;
    const cartItemDtoList = item.cartItemDtoList;
    if (cartItemDtoList && cartItemDtoList.length > 0) {
      cartItemDtoList.forEach((item) => {
        contentTotalPrice =
          (contentTotalPrice + item.product.productPrice) * item.count;
      });
    }

    return (
      <CartStoreSection className="cart-store-section">
        <CartContentHeader storeName={item.storeName} />
        <CartContentDetail
          storeName={item.storeName}
          cartItemDtoList={item.cartItemDtoList}
          checkBoxStates={checkBoxStates}
          cartCheckBoxChange={cartCheckBoxChange}
          cartInfoChange={cartInfoChange}
        />
        <CartContentFooter
          contentTotalPrice={contentTotalPrice}
          storeName={item.storeName}
          sellerId={item.sellerId}
        />
      </CartStoreSection>
    );
  }

  return (
    <CommerceCartContentContainer className="commerce-cart-content-container">
      {cartBySellerDtoList &&
        cartBySellerDtoList.map((item) => (
          <ShowCartStore item={item} key={item.sellerId} />
        ))}
    </CommerceCartContentContainer>
  );
}

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
