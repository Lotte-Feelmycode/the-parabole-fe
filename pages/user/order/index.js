import SiteHead from '@components/common/SiteHead.js';
import CommerceLayout from '@components/common/CommerceLayout';
import styled from '@emotion/styled';
import { createContext, useEffect, useState } from 'react';
import Input from '@components/input/Input';
import ProductList from '@components/product/OrderProductList';
import PayList from '@components/order/PayList';
import { POST, GET } from '@apis/defaultApi';
import { ThemeGray2 } from '@utils/constants/themeColor';
import { Blue } from '@components/input/Button';
import { useRouter } from 'next/router';
import { isEmpty, numberToMonetary } from '@utils/functions';

export const AppContext = createContext();

export default function OrderAndPayment() {
  const getUserId = 3;
  const router = useRouter();

  const [userId, setUserId] = useState(getUserId);
  const [product, setProduct] = useState([]);
  const [orderInfoResponseDto, setOrderInfoResponseDto] = useState([]);
  const [payState, setPayState] = useState(-1);

  // TODO 초기값에 user정보 넣기
  const [receiverName, setReceiverName] = useState('');
  const [receivePhone, setReceivePhone] = useState('');
  const [receiveAddress, setReceiveAddress] = useState('');
  const [receiveMemo, setReceiveMemo] = useState('');

  useEffect(() => {
    GET(`/orderinfo`, { userId }).then((res) => {
      console.log(res);
      if (res && res.data) {
        setOrderInfoResponseDto(res.data);
      } else {
        alert('주문 정보가 없습니다.');
        router.push('/');
      }
    });
  }, []);

  useEffect(() => {
    if (orderInfoResponseDto && orderInfoResponseDto.length > 0) {
      orderInfoResponseDto.forEach((dto) => {
        setProduct([
          ...product,
          {
            orderInfoId: dto.id,
            orderinfoState: dto.state,
            userId: dto.userId,
            userEmail: dto.userEmail,
            productId: dto.productId,
            productName: dto.productName,
            productCnt: dto.productCnt,
            productRemain: dto.productRemain,
            productPrice: dto.productPrice,
            productDiscountPrice: dto.productDiscountPrice,
            productThumbnailImg: dto.productThumbnailImg,
          },
        ]);
      });
    }
  }, [orderInfoResponseDto]);

  function goToPayment() {
    const orderState = '주문 확정';

    if (payState === -1) {
      alert('결제수단을 선택해서 결제를 진행해주세요');
      return;
    }
    if (isEmpty(receiverName)) {
      alert('수령인을 입력해주세요');
      return;
    }
    if (isEmpty(receivePhone)) {
      alert('수령인 전화번호를 입력해주세요');
      return;
    }
    if (isEmpty(receiveAddress)) {
      alert('수령인 주소를 입력해주세요');
      return;
    }

    POST(`/order`, { userId, orderState }).then((res) => {
      console.log(res);
      if (res) {
        if (res.success) {
          router.push('/user/mypage');
        } else {
          alert('주문에 실패했습니다. 다시시도해주세요');
        }
      }
    });
  }

  function getProductTotalPrice(products) {
    if (!products) return;
    let total = 0;
    products.map((products) => {
      total += products.productPrice;
    });
    return total;
  }

  function sameAsUser(flag) {
    if (flag) {
      //TODO 사용자 정보 불러오기
      setReceiverName('userId.userName');
      setReceivePhone('userId.userPhone');
    }
  }

  const input = {
    width: '14rem',
    borderRadius: '0.2rem',
    border: 'solid 1px ' + ThemeGray2,
    fontSize: '1rem',
    margin: '10px auto',
  };

  return (
    <Div>
      <CommerceLayout>
        <SiteHead title="Order/Payment" />
        <OrderContainer className="order-container">
          <OrderSection className="order-section">
            <H1>주문/결제</H1>
            <H2>주문자</H2>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <TdTitle>주문자</TdTitle>
                  <Td>
                    <Input
                      // TODO : user 정보 넣기
                      css={input}
                      attr={{ readOnly: true }}
                      value={'userId.name'}
                    />
                  </Td>
                </tr>
                <tr>
                  <TdTitle>휴대전화</TdTitle>
                  <Td>
                    <Input
                      // TODO : user 정보 넣기
                      css={input}
                      attr={{ readOnly: true }}
                      value={'userId.phone'}
                    />
                  </Td>
                </tr>
              </tbody>
            </table>
            <br />
            <hr />
            <br />
            <H2>수령자</H2>
            <SameAsUserSection>
              <input
                type="checkBox"
                onChange={(event) => {
                  sameAsUser(event.target.checked);
                }}
              />
              <span> 주문자 정보와 동일</span>
            </SameAsUserSection>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <TdTitle>수령인</TdTitle>
                  <Td>
                    <Input
                      type="text"
                      css={input}
                      value={receiverName}
                      onChange={(event) => {
                        setReceiverName(event.target.value);
                      }}
                    />
                  </Td>
                </tr>
                <tr>
                  <TdTitle>휴대전화</TdTitle>
                  <Td>
                    <Input
                      type="text"
                      css={input}
                      value={receivePhone}
                      onChange={(event) => {
                        setReceivePhone(event.target.value);
                      }}
                    />
                  </Td>
                </tr>
                <tr>
                  <TdTitle>배송지 주소</TdTitle>
                  <Td>
                    <Input
                      css={input}
                      value={receiveAddress}
                      onChange={(event) => {
                        setReceiveAddress(event.target.value);
                      }}
                    />
                  </Td>
                </tr>
                <tr>
                  <TdTitle>배송 메모</TdTitle>
                  <Td>
                    <Input
                      css={input}
                      value={receiveMemo}
                      onChange={(event) => {
                        setReceiveMemo(event.target.value);
                      }}
                    />
                  </Td>
                </tr>
              </tbody>
            </table>
            <br />
            <hr />
            <br />
            <H2>상품 정보</H2>
            <ProductList productList={product} />
            <br />
            <hr />
            <br />
            <div>
              <H2>쿠폰 / 할인</H2>
              <>총 금액 </>
              <Total>{numberToMonetary(getProductTotalPrice(product))}원</Total>
            </div>
            <br />
            <hr />
            <br />
            <div>
              <H2>결제방식</H2>
              <PayList index={payState} setIndex={setPayState} />
            </div>
          </OrderSection>
          <SideBarSection className="sidebar-section">
            <StickyContainer>
              <PayResultSection
                className="pay-result-section"
                borderColor={ThemeGray2}
              >
                <h3>결제금액</h3>
                <TotalProductPriceSection>
                  <PayIndex>
                    <PayLable>총 상품금액</PayLable>
                    <PayPrice marginLeft="auto">
                      {numberToMonetary(getProductTotalPrice(product)) || 0}원
                    </PayPrice>
                  </PayIndex>
                  <PayIndex>
                    <PayLable>할인금액</PayLable>
                    <PayPrice marginLeft="auto">{0}원</PayPrice>
                  </PayIndex>
                  <PayIndex>
                    <PayLable>배송비</PayLable>
                    <PayPrice marginLeft="auto">{0}원</PayPrice>
                  </PayIndex>
                  <PayLargeIndex borderColor={ThemeGray2}>
                    <PayLargeLable>최종 결제 금액</PayLargeLable>
                    <PayLargePrice>
                      {numberToMonetary(getProductTotalPrice(product)) || 0}원
                    </PayLargePrice>
                  </PayLargeIndex>
                </TotalProductPriceSection>
              </PayResultSection>
              <Blue
                buttonText={
                  numberToMonetary(getProductTotalPrice(product)) +
                  '원 결제하기'
                }
                onClickFunc={goToPayment}
                css={{ width: '100%' }}
              />
            </StickyContainer>
          </SideBarSection>
        </OrderContainer>
        <br />
        <hr />
      </CommerceLayout>
    </Div>
  );
}

const OrderContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
`;

const OrderSection = styled.div`
  padding-left: 0px;
  max-width: 100%;
  flex: 1 0 0px;
`;

const SideBarSection = styled.div`
  padding-top: 60px;
  margin-left: 40px;
  flex: 0 1 0px;
  max-width: 100%;
  min-width: 300px;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 81px;
  padding-top: 40px;
`;

const PayResultSection = styled.div`
  border: solid 1px ${(props) => props.borderColor};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-bottom: 10px;
  padding: 20px;
`;

const PayIndex = styled.div`
  display: inline-flex;
  margin-top: 5px;
`;

const PayLable = styled.h4`
  font-size: 1rem;
`;

const PayPrice = styled.span`
  margin-left: auto;
  font-size: 1rem;
`;

const PayLargeIndex = styled.div`
  border-top: solid 1px ${(props) => props.borderColor};
  display: inline-flex;
  margin-top: 20px;
  padding-top: 19px;
`;

const PayLargeLable = styled.h4`
  font-size: 1.2rem;
`;

const PayLargePrice = styled.span`
  margin-left: auto;
  font-size: 1.2rem;
`;

const TotalProductPriceSection = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

const SameAsUserSection = styled.div`
  padding: 5px 0;
  font-size: 1rem;
`;

const Div = styled.div`
  font-size: 1.3rem;
`;

const Total = styled.span`
  font-size: 1.3rem;
`;

const Td = styled.td`
  text-align: right;
  width: 10rem;
`;

const TdTitle = styled.td`
  font-size: 1.2rem;
  width: 5rem;
`;

const H1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

const H2 = styled.p`
  font-size: 2rem;
  margin-bottom: 20px;
`;
