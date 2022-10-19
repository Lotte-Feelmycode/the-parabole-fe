import CommerceLayout from '@components/common/CommerceLayout';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { Blue, SmallLineWhite } from '@components/input/Button';
import {
  ThemeGray1,
  ThemeGray2,
  ThemeWhite,
} from '@utils/constants/themeColor';
import { useRouter } from 'next/router';
import { GET, DELETE, POST } from '@apis/defaultApi';
import CartProduct from '@components/product/CartProduct';
import { numberToMonetary } from '@utils/functions';

export default function Cart() {
  const router = useRouter();
  // TODO: userId 집어넣기
  const userId = 1;

  const [cartItemCount, setCartItemCount] = useState(1);
  const [cartId, setCartId] = useState(userId);
  const [itemList, setItemList] = useState([]);
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
          setCartItemCount(res.data.itemCount);
          setItemList(res.data.cartItemDto);
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
    if (cartItemCount > 0 && itemList) {
      itemList.forEach((item) => {
        addCheckBoxStates(item.cartItemId, false);
      });
    }
    TotalCheckBoxChange(true);
  }, [itemList]);

  useEffect(() => {
    if (cartItemCount < numberOfChekced) setNumberOfChekced(cartItemCount);
    if (0 > numberOfChekced) setNumberOfChekced(0);
    setTotalCheckBoxFlag(cartItemCount === numberOfChekced ? true : false);
  }, [numberOfChekced]);

  function cartInfoChange({ cartItemId, cnt }) {
    itemList.forEach((item) => {
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
  }

  function cartCheckBoxChange({ cartItemId, flag }) {
    if (checkBoxStates.get(cartItemId) !== flag) {
      if (flag) {
        setNumberOfChekced(numberOfChekced + 1);
        itemList.forEach((item) => {
          if (item.cartItemId === cartItemId) {
            setTotalPrice(totalPrice + item.product.productPrice * item.count);
          }
        });
      } else {
        setNumberOfChekced(numberOfChekced - 1);
        itemList.forEach((item) => {
          if (item.cartItemId === cartItemId) {
            setTotalPrice(totalPrice - item.product.productPrice * item.count);
          }
        });
      }
      upsertCheckBoxStates(cartItemId, flag);
    }
  }

  function TotalCheckBoxChange(flag) {
    var calcTotalPrice = 0;
    var checkCount = numberOfChekced;

    if (flag) {
      if (itemList && cartItemCount > 0) {
        itemList.forEach((item) => {
          if (checkBoxStates.get(item.cartItemId) !== flag) {
            calcTotalPrice =
              calcTotalPrice + item.product.productPrice * item.count;
            upsertCheckBoxStates(item.cartItemId, flag);
            checkCount = checkCount + 1;
          }
        });
      }
    } else {
      if (itemList && cartItemCount > 0) {
        itemList.forEach((item) => {
          if (checkBoxStates.get(item.cartItemId) !== flag) {
            upsertCheckBoxStates(item.cartItemId, flag);
            checkCount = checkCount - 1;
          }
        });
      }
    }
    setNumberOfChekced(checkCount);
    setTotalPrice(calcTotalPrice);
  }

  function GoToOrder() {
    if (itemList && numberOfChekced > 0) {
      var orderInfoDto = [];
      itemList.forEach((item) => {
        if (checkBoxStates.get(item.cartItemId) === true) {
          orderInfoDto.push({
            productId: item.product.productId,
            productCnt: item.count,
          });
        }
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
      padding: 5px;
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
      padding-right: 7.5px;
      padding-left: 7.5px;
      position: relative;
      min-height: 1px;
    `;

    const CartSidebarSection = styled.div`
      flex: 1 0 auto;
      padding-right: 7.5px;
      padding-left: 7.5px;
      position: relative;
    `;

    return (
      <CartSection className="cart-section">
        <CartContainer>
          <CartRow>
            <CommerceCart>
              <CartHeader />
              <CartContent />
              <CartFooter />
            </CommerceCart>
            <CartSidebarSection>
              <CartSidebar />
            </CartSidebarSection>
          </CartRow>
        </CartContainer>
      </CartSection>
    );
  }

  function EmptyCart() {
    const EmptySection = styled.div`
      display: flex;
      flex-direction: column;
      background-color: ${(props) => props.color};
      border-radius: 10px;
      padding: 10px;
      justify-content: center;
      align-content: center;
    `;

    const EmptyImageContainer = styled.div`
      text-align: center;
      display: flex;
      justify-content: center;
    `;

    const EmptyImage = styled.img`
      max-height: 350px;
    `;

    const EmptyButton = styled.div`
      text-align: center;
    `;
    return (
      <EmptySection color={ThemeWhite} className="empty-section">
        <EmptyImageContainer>
          <EmptyImage src="/parabole.svg" />
        </EmptyImageContainer>
        <EmptyButton>
          <Blue
            buttonText={'상품담으러가기'}
            onClickFunc={() => {
              router.push('/');
            }}
          />
        </EmptyButton>
      </EmptySection>
    );
  }

  function CartHeader() {
    const CommerceCartHeaderContainer = styled.div`
      z-index: 100;
      margin: 0;
      padding: 0;
    `;

    const CommerceCartHeaderContainerChild = styled.div`
      padding: 0 21px;
      background: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      margin: 0 0 11px;
      z-index: 100;
    `;

    const CommerceCartHeaderLeft = styled.span`
      flex: 0 0 auto;
      display: flex;
    `;
    const CommerceCartHeaderRight = styled.span`
      flex: 0 0 auto;
    `;

    const deleteCheckedItemBtn = () => {
      var deleteFlag = false;
      if (
        itemList &&
        numberOfChekced !== 0 &&
        confirm('선택한 상품을 장바구니에서 삭제하시겠습니까?')
      ) {
        itemList.map((item) => {
          if (checkBoxStates.get(item.cartItemId)) {
            const CartItemDeleteRequestDto = {
              userId: userId,
              cartItemId: item.cartItemId,
            };
            DELETE(`/cart/delete`, CartItemDeleteRequestDto);
            deleteFlag = true;
          }
        });
        if (deleteFlag) {
          router.reload();
        }
      } else {
        alert('상품을 선택해주세요');
      }
    };

    return (
      <CommerceCartHeaderContainer className="commerce-cart-header-container">
        <CommerceCartHeaderContainerChild>
          <CommerceCartHeaderLeft>
            <div className="mx-2">
              <input
                type="checkbox"
                onChange={(event) => TotalCheckBoxChange(event.target.checked)}
                checked={totalCheckBoxFlag}
              />
            </div>
            <span>모두 선택</span>
          </CommerceCartHeaderLeft>
          <CommerceCartHeaderRight>
            <SmallLineWhite
              buttonText="선택삭제"
              onClickFunc={() => {
                deleteCheckedItemBtn();
              }}
            />
          </CommerceCartHeaderRight>
        </CommerceCartHeaderContainerChild>
      </CommerceCartHeaderContainer>
    );
  }

  function CartContent() {
    var storeId;

    const CommerceCartContentContainer = styled.div`
      background-color: ${(props) => props.color};
      border-radius: 6px;
      padding: 10px 20px;
    `;

    const CartDetailSection = styled.div`
      padding-top: 5px;
      border-top: 1px solid white;
      border-bottom: 1px solid white;
      display: flex;
    `;

    const ProductCheckSection = styled.div`
      position: relative;
      display: block;
      flex: 0 0 auto;
      margin-right: 5px;
      padding: 5px;
    `;
    const ProductDetailSection = styled.div`
      position: relative;
      display: flex;
      flex: 1 0 auto;
    `;

    const ProductDeleteSection = styled.div`
      position: relative;
      flex: 0 0 auto;
      padding-left: 5px;
      display: block;
      margin-left: auto;

      &:hover {
        cursor: pointer;
      }
    `;

    const deleteCartItem = ({ input }) => {
      const CartItemDeleteRequestDto = {
        userId: userId,
        cartItemId: input,
      };
      if (confirm('장바구니에서 삭제하시겠습니까?')) {
        DELETE(`/cart/delete`, CartItemDeleteRequestDto);
        router.reload();
      }
    };

    return (
      <CommerceCartContentContainer
        className="commerce-cart-content-container"
        color={ThemeWhite}
      >
        {itemList &&
          itemList.map((item) => (
            <CartDetailSection key={item.cartItemId}>
              <ProductCheckSection>
                <input
                  type="checkbox"
                  onChange={(event) =>
                    cartCheckBoxChange({
                      cartItemId: item.cartItemId,
                      flag: event.target.checked,
                    })
                  }
                  checked={checkBoxStates.get(item.cartItemId)}
                />
              </ProductCheckSection>
              <ProductDetailSection>
                {/* <CartSellerInfo inputStoreId={item.product.sellerId} /> */}
                <CartProduct
                  userId={userId}
                  cartItemId={item.cartItemId}
                  product={item.product}
                  count={item.count}
                  setCountFunc={cartInfoChange}
                />
              </ProductDetailSection>
              <ProductDeleteSection>
                <button
                  onClick={() => deleteCartItem({ input: item.cartItemId })}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill={ThemeGray1}
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      fillRule="nonzero"
                      d="M6 4.6L10.3.3l1.4 1.4L7.4 6l4.3 4.3-1.4 1.4L6 7.4l-4.3 4.3-1.4-1.4L4.6 6 .3 1.7 1.7.3 6 4.6z"
                    />
                  </svg>
                </button>
              </ProductDeleteSection>
            </CartDetailSection>
          ))}
      </CommerceCartContentContainer>
    );
  }

  function CartFooter() {
    return (
      <div className="text-right">
        <span>총 {itemList.length} 개</span>
      </div>
    );
  }

  function CartSidebar() {
    const CommerceCartSidebar = styled.div`
      display: block;
      padding-top: 35px;
      position: relative;
      width: 100%;
      min-height: 1px;
      box-sizing: border-box;
    `;

    const StickyContainer = styled.div`
      position: sticky;
      top: 81px;
      transition: top 0.1s ease 0s;
      margin: 0;
      padding: 0;
    `;

    const StickyChild = styled.div`
      position: relative;
      padding: 5px 0;
    `;

    const CommerceCartSummery = styled.div`
      margin-bottom: 20px;
      border-radius: 6px;
      padding: 10px 20px;
      background-color: ${(props) => props.color};
      display: flex;
    `;

    const TotalPriceLabelSection = styled.div`
      flex: 0 1 auto;
      display: block;
    `;

    const TotalPriceLabel = styled.dt`
      font-weight: 700;
      font-size: 15px;
    `;

    const TotalPriceValueSection = styled.div`
      flex: 0 0 auto;
      margin-left: auto;
      text-align: right;
      display: block;
    `;

    const TotalPriceValue = styled.dd`
      text-align: right;
      font-size: 24px;
      font-weight: 700;
    `;

    return (
      <CommerceCartSidebar className="commerce-cart-sidebar">
        <StickyContainer>
          <StickyChild>
            <CommerceCartSummery color={ThemeWhite}>
              <TotalPriceLabelSection>
                <TotalPriceLabel>
                  <span>총 가격 : </span>
                </TotalPriceLabel>
              </TotalPriceLabelSection>
              <TotalPriceValueSection>
                <TotalPriceValue>
                  <span>{numberToMonetary(totalPrice) || 0}</span>원
                </TotalPriceValue>
              </TotalPriceValueSection>
            </CommerceCartSummery>
            <Blue
              buttonText={numberOfChekced + '개 상품 구매하기'}
              css={{ width: '100%' }}
              onClickFunc={GoToOrder}
            />
          </StickyChild>
        </StickyContainer>
      </CommerceCartSidebar>
    );
  }

  return (
    <CommerceLayout className="commerce-layout">
      <CartPage
        className="flex min-h-screen flex-col body-font"
        color={ThemeGray2}
      >
        <div className="container px-5 py-24 mx-auto" color={ThemeGray2}>
          <CheckEmptyList count={cartItemCount} />
        </div>
      </CartPage>
    </CommerceLayout>
  );
}

const CartPage = styled.section`
  background-color: ${(props) => props.color};
`;
