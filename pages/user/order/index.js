import SiteHead from '@components/common/SiteHead.js';
import CommerceLayout from '@components/common/CommerceLayout';
import styled from '@emotion/styled';
import { createContext, useEffect, useState } from 'react';
import Input from '@components/input/Input';
import ProductList from '@components/order/OrderProductList';
import PayList from '@components/order/PayList';
import { POST, GET } from '@apis/defaultApi';
import { ThemeGray4 } from '@utils/constants/themeColor';
import { Blue } from '@components/input/Button';
import { useRouter } from 'next/router';
import { isEmpty, numberToMonetary } from '@utils/functions';
import { useGetToken } from '@hooks/useGetToken';

export const AppContext = createContext();

export default function OrderAndPayment() {
  const getUserId = 3;
  const router = useRouter();

  const [userId, setUserId] = useState(getUserId);
  const [orderInfoResponseDto, setOrderInfoResponseDto] = useState([]);
  const [payState, setPayState] = useState(-1);

  // TODO 초기값에 user정보 넣기
  const [receiverName, setReceiverName] = useState('');
  const [receivePhone, setReceivePhone] = useState('');
  const [receiveAddress, setReceiveAddress] = useState('');
  const [receiveMemo, setReceiveMemo] = useState('');

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

  function goToPayment() {
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

    POST(`/order`, { userId, orderPayState: payState }).then((res) => {
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
      total += products.productPrice * products.productCnt;
    });
    return total;
  }

  function sameAsUser(flag) {
    if (flag) {
      //TODO 사용자 정보 불러오기
      setReceiverName('더파라');
      setReceivePhone('01082828585');
    }
  }

  const input = {
    width: '14rem',
    borderRadius: '0.2rem',
    border: 'solid 1px ' + ThemeGray4,
    fontSize: '1rem',
    margin: 0,
  };

  return (
    <Div>
      <CommerceLayout>
        <SiteHead title="Order/Payment" />
        <OrderContainer className="order-container">
          <OrderSection className="order-section">
            <H1>주문/결제</H1>
            <H2>주문자</H2>
            <div>
              <InputContainer>
                <InputLable>주문자</InputLable>
                <Inputpart>
                  <Input
                    // TODO : user 정보 넣기
                    css={input}
                    attr={{ readOnly: true }}
                    value={'더파라'}
                  />
                </Inputpart>
              </InputContainer>
              <InputContainer>
                <InputLable>휴대전화</InputLable>
                <Inputpart>
                  <Input
                    // TODO : user 정보 넣기
                    css={input}
                    attr={{ readOnly: true }}
                    value={'01082828585'}
                  />
                </Inputpart>
              </InputContainer>
            </div>
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
            <div>
              <InputContainer>
                <InputLable>수령인</InputLable>
                <Inputpart>
                  <Input
                    type="text"
                    css={input}
                    value={receiverName}
                    onChange={(event) => {
                      setReceiverName(event.target.value);
                    }}
                  />
                </Inputpart>
              </InputContainer>
              <InputContainer>
                <InputLable>휴대전화</InputLable>
                <Inputpart>
                  <Input
                    type="text"
                    css={input}
                    value={receivePhone}
                    onChange={(event) => {
                      setReceivePhone(event.target.value);
                    }}
                  />
                </Inputpart>
              </InputContainer>
              <InputContainer>
                <InputLable>배송지 주소</InputLable>
                <Inputpart>
                  <Input
                    css={input}
                    value={receiveAddress}
                    onChange={(event) => {
                      setReceiveAddress(event.target.value);
                    }}
                  />
                </Inputpart>
              </InputContainer>
              <InputContainer>
                <InputLable>배송 메모</InputLable>
                <Inputpart>
                  <Input
                    css={input}
                    value={receiveMemo}
                    onChange={(event) => {
                      setReceiveMemo(event.target.value);
                    }}
                  />
                </Inputpart>
              </InputContainer>
            </div>
            <br />
            <hr />
            <br />
            <H2>상품 정보</H2>
            <ProductList productList={orderInfoResponseDto} />
            <br />
            <hr />
            <br />
            <div>
              <H2>쿠폰 / 할인</H2>
              <>총 금액 </>
              <Total>
                {numberToMonetary(getProductTotalPrice(orderInfoResponseDto))}원
              </Total>
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
                borderColor={ThemeGray4}
              >
                <h3>결제금액</h3>
                <TotalProductPriceSection>
                  <PayIndex>
                    <PayLable>총 상품금액</PayLable>
                    <PayPrice marginLeft="auto">
                      {numberToMonetary(
                        getProductTotalPrice(orderInfoResponseDto),
                      ) || 0}
                      원
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
                  <PayLargeIndex borderColor={ThemeGray4}>
                    <PayLargeLable>최종 결제 금액</PayLargeLable>
                    <PayLargePrice>
                      {numberToMonetary(
                        getProductTotalPrice(orderInfoResponseDto),
                      ) || 0}
                      원
                    </PayLargePrice>
                  </PayLargeIndex>
                </TotalProductPriceSection>
              </PayResultSection>
              <Blue
                buttonText={
                  numberToMonetary(getProductTotalPrice(orderInfoResponseDto)) +
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

const InputContainer = styled.div`
  display: inline-flex;
  width: 100%;
  margin: 10px 0;
`;

const InputLable = styled.span``;

const Inputpart = styled.div`
  margin: 0;
  margin-left: auto;
`;
