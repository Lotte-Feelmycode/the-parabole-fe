import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { GET, POST } from '@apis/defaultApi';
import { ThemeGray5 } from '@utils/constants/themeColor';
import CommerceLayout from '@components/common/CommerceLayout';
import CartContent from '@components/cart/CartContent';
import CartHeader from '@components/cart/CartHeader';
import CartFooter from '@components/cart/CartFooter';
import CartSidebar from '@components/cart/CartSidebar';
import EmptyCart from '@components/cart/EmptyCart';
import { useGetToken } from '@hooks/useGetToken';

export default function Cart() {
  const router = useRouter();
  // TODO: userId 집어넣기
  const userId = 3;

  useEffect(() => {
    let userId;
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      userId = localStorage.getItem('userId');
    }
    if (userId === 'undefined' || userId === undefined || userId === 'null') {
      alert('로그인 해주세요.');
      router.push('/signin');
    }
    useGetToken();
  }, []);

  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartId, setCartId] = useState(userId);
  const [cartBySellerDtoList, setCartBySellerDtoList] = useState([]);
  const [checkBoxStates, setCheckBoxStates] = useState(new Map());
  const [numberOfChekced, setNumberOfChekced] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCheckBoxFlag, setTotalCheckBoxFlag] = useState(true);

  const clearCheckBoxStates = () => {
    setCheckBoxStates((prev) => new Map(prev.clear()));
  };

  const addCheckBoxStates = (key, value) => {
    setCheckBoxStates((prev) => new Map([...prev, [key, value]]));
  };

  const upsertCheckBoxStates = (key, value) => {
    setCheckBoxStates((prev) => new Map(prev).set(key, value));
  };

  useEffect(() => {
    GET(`/cart/list`, { userId }).then((res) => {
      console.log(res);
      if (res) {
        if (res.success) {
          setCartId(res.data.cartId);
          setCartItemCount(res.data.cnt);
          setCartBySellerDtoList(res.data.cartBySellerDtoList);
        }
      } else {
        console.log('장바구니 오류', res);
      }
    });
  }, []);

  useEffect(() => {
    clearCheckBoxStates();
    setNumberOfChekced(0);
    setTotalPrice(0);
    if (cartItemCount > 0 && cartBySellerDtoList) {
      cartBySellerDtoList.forEach((dto) => {
        const cartItemDtoList = dto.cartItemDtoList;
        {
          cartItemDtoList.forEach((item) => {
            addCheckBoxStates(item.cartItemId, false);
          });
        }
      });
    }
    totalCheckBoxChange(true);
  }, [cartBySellerDtoList]);

  useEffect(() => {
    if (cartItemCount < numberOfChekced) setNumberOfChekced(cartItemCount);
    if (0 > numberOfChekced) setNumberOfChekced(0);
    setTotalCheckBoxFlag(cartItemCount === numberOfChekced ? true : false);
  }, [numberOfChekced]);

  function cartInfoChange({ cartItemId, cnt }) {
    cartBySellerDtoList.forEach((dto) => {
      const cartItemDtoList = dto.cartItemDtoList;
      cartItemDtoList.forEach((item) => {
        if (item.cartItemId === cartItemId) {
          if (checkBoxStates.get(cartItemId)) {
            const changedPrice =
              totalPrice -
              item.product.productPrice * item.count +
              item.product.productPrice * cnt;
            setTotalPrice(changedPrice);
          }
          item.count = cnt;
        }
      });
    });
  }

  function cartCheckBoxChange({ cartItemId, flag }) {
    if (checkBoxStates.get(cartItemId) !== flag) {
      if (flag) {
        setNumberOfChekced(numberOfChekced + 1);
        cartBySellerDtoList.forEach((dto) => {
          const cartItemDtoList = dto.cartItemDtoList;
          cartItemDtoList.forEach((item) => {
            if (item.cartItemId === cartItemId) {
              setTotalPrice(
                totalPrice + item.product.productPrice * item.count,
              );
            }
          });
        });
      } else {
        setNumberOfChekced(numberOfChekced - 1);
        cartBySellerDtoList.forEach((dto) => {
          const cartItemDtoList = dto.cartItemDtoList;
          cartItemDtoList.forEach((item) => {
            if (item.cartItemId === cartItemId) {
              setTotalPrice(
                totalPrice - item.product.productPrice * item.count,
              );
            }
          });
        });
      }
      upsertCheckBoxStates(cartItemId, flag);
    }
  }

  function totalCheckBoxChange(flag) {
    let calcTotalPrice = 0;
    let checkCount = numberOfChekced;

    if (flag) {
      if (cartBySellerDtoList && cartItemCount > 0) {
        cartBySellerDtoList.forEach((dto) => {
          const cartItemDtoList = dto.cartItemDtoList;
          if (cartItemDtoList && cartItemDtoList.length > 0) {
            cartItemDtoList.forEach((item) => {
              if (checkBoxStates.get(item.cartItemId) !== flag) {
                calcTotalPrice =
                  calcTotalPrice + item.product.productPrice * item.count;
                upsertCheckBoxStates(item.cartItemId, flag);
                checkCount = checkCount + 1;
              }
            });
          }
        });
      }
    } else {
      if (cartBySellerDtoList && cartItemCount > 0) {
        cartBySellerDtoList.forEach((dto) => {
          const cartItemDtoList = dto.cartItemDtoList;
          if (cartItemDtoList && cartItemDtoList.length > 0) {
            cartItemDtoList.forEach((item) => {
              if (checkBoxStates.get(item.cartItemId) !== flag) {
                upsertCheckBoxStates(item.cartItemId, flag);
                checkCount = checkCount - 1;
              }
            });
          }
        });
      }
    }

    setNumberOfChekced(checkCount);
    setTotalPrice(calcTotalPrice);
  }

  function GoToOrder() {
    if (cartBySellerDtoList && numberOfChekced > 0) {
      let orderInfoDto = [];
      cartBySellerDtoList.forEach((dto) => {
        const cartItemDtoList = dto.cartItemDtoList;
        cartItemDtoList.forEach((item) => {
          if (checkBoxStates.get(item.cartItemId) === true) {
            orderInfoDto.push({
              productId: item.product.productId,
              productCnt: item.count,
            });
          }
        });
      });
      POST(`/orderinfo`, {
        userId: userId,
        orderInfoDto: orderInfoDto,
      }).then((res) => {
        if (res && res.success) {
          router.push({ pathname: `/user/order` });
        } else {
          alert('다시 시도해주세요');
          console.log(res);
        }
      });
    } else {
      alert('주문할 상품을 선택해주세요');
    }
  }

  function CheckEmptyList({ count }) {
    if (count > 0) {
      return <ShowCart className="ShowCart" />;
    } else {
      return <EmptyCart className="EmptyCart" />;
    }
  }

  function ShowCart() {
    const CartSection = styled.div`
      display: flex;
    `;

    const CartContainer = styled.div`
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      width: 100%;
      box-sizing: border-box;
      min-height: 1px;
      flex-wrap: nowrap;
    `;

    const CartRow = styled.div`
      display: flex;
      position: relative;
      flex-wrap: wrap;
    `;

    const CommerceCart = styled.div`
      flex: 1 0 auto;
      position: relative;
      min-height: 1px;

      @media (max-width: 1024px) {
        padding-right: 7.5px;
        padding-left: 7.5px;
        width: 100%;
      }
      @media (min-width: 1024px) {
        padding-right: 1rem;
        padding-left: 1rem;
        width: 70%;
      }
    `;

    const CartSidebarSection = styled.div`
      flex: 1 0 auto;
      position: relative;
      @media (max-width: 1024px) {
        padding-right: 7.5px;
        padding-left: 7.5px;
        width: 100%;
      }
      @media (min-width: 1024px) {
        padding-right: 1rem;
        padding-left: 1rem;
        width: 30%;
      }
    `;

    return (
      <CartSection className="cart-section">
        <CartContainer>
          <CartRow>
            <CommerceCart className="commerce-cart">
              <CartHeader
                totalCheckBoxChange={totalCheckBoxChange}
                cartBySellerDtoList={cartBySellerDtoList}
                checkBoxStates={checkBoxStates}
                numberOfChekced={numberOfChekced}
                totalCheckBoxFlag={totalCheckBoxFlag}
                userId={userId}
              />
              <CartContent
                cartInfoChange={cartInfoChange}
                cartCheckBoxChange={cartCheckBoxChange}
                userId={userId}
                cartBySellerDtoList={cartBySellerDtoList}
                checkBoxStates={checkBoxStates}
              />
              <CartFooter length={cartItemCount} />
            </CommerceCart>
            <CartSidebarSection className="cart-sidebar-section">
              <CartSidebar
                GoToOrder={GoToOrder}
                totalPrice={totalPrice}
                numberOfChekced={numberOfChekced}
              />
            </CartSidebarSection>
          </CartRow>
        </CartContainer>
      </CartSection>
    );
  }

  return (
    <CommerceLayout className="commerce-layout">
      <CartPage>
        <CheckEmptyList count={cartItemCount} />
      </CartPage>
    </CommerceLayout>
  );
}

const CartPage = styled.div`
  background-color: ${ThemeGray5};
  margin: 20px 0;
  padding: 20px 0;
  border-radius: 15px;
`;
