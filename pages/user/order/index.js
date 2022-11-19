import { createContext, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { POST, GET } from '@apis/defaultApi';
import { useGetToken } from '@hooks/useGetToken';
import { isEmpty } from '@utils/functions';
import { ThemeGray3 } from '@utils/constants/themeColor';
import { ORDER_PAY } from '@utils/constants/types';
import { LINKS } from '@utils/constants/links';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import PayList from '@components/order/PayList';
import OrderSidebar from '@components/order/OrderSidebar';
import OrdererSection from '@components/order/OrdererSection';
import OrderDetail from '@components/order/OrderDetail';

export const LoginHeaderContext = createContext('');
export const CouponContext = createContext([]);
export const CouponDispatchContext = createContext(null);

export default function OrderAndPayment() {
  const router = useRouter();

  const [orderId, setOrderId] = useState(0);
  const [totalOrderInfoCount, setTotalOrderInfoCount] = useState(0);
  const [orderBySellerDtoList, setOrderBySellerDtoList] = useState([]);
  const [payState, setPayState] = useState(-1);

  const [getUserName, setUserName] = useState('');
  const [getUserPhone, setUserPhone] = useState('');

  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [receiverSimpleAddress, setReceiverSimpleAddress] = useState('');
  const [receiverDetailAddress, setReceiverDetailAddress] = useState('');
  const [receiverMemo, setReceiverMemo] = useState('');

  const couponReducer = (state, action) => {
    let orderInfoIdList = new Array();
    switch (action.type) {
      case 'INIT':
        const list = action.data.orderBySellerDtoList;
        if (list) {
          list.forEach((item) => {
            const parameter = {
              key: item.sellerId,
              state: -1,
              couponName: '',
              description: '',
              discountPrice: 0,
              serialNo: '',
            };
            orderInfoIdList.push(parameter);
          });
        }
        return orderInfoIdList;
      case 'SET':
        state.forEach((coupon) => {
          if (action.data.key === coupon.key) {
            let newCoupon = {
              key: action.data.key,
              state: action.data.state,
              couponName: action.data.couponName,
              description: action.data.description,
              discountPrice: action.data.discountPrice,
              serialNo: action.data.serialNo,
            };
            orderInfoIdList.push(newCoupon);
          } else {
            orderInfoIdList.push(coupon);
          }
        });
        return orderInfoIdList;
      default:
        throw new Error('invalid action type');
    }
  };
  const [stateList, dispatch] = useReducer(couponReducer, new Array());

  // 결제 금액 변수
  const [productTotalPrice, setProductTotalPrice] = useState(0);

  const [headers, setHeaders] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push(LINKS.SIGNIN);
      }
    }
    const getToken = useGetToken();
    setHeaders(getToken);

    GET(`/orderinfo`, null, getToken).then((res) => {
      console.log(res);
      if (res && res.data) {
        setOrderId(res.data.orderId);
        setTotalOrderInfoCount(res.data.cnt);
        setOrderBySellerDtoList(res.data.orderBySellerDtoList);
        getProductTotalPrice({
          orderBySellerDtoList: res.data.orderBySellerDtoList,
        });
        dispatch({
          type: 'INIT',
          data: { orderBySellerDtoList: res.data.orderBySellerDtoList },
        });
      } else {
        alert('주문 정보가 없습니다.');
        router.push(LINKS.MAIN);
      }
    });

    GET(`/user`, '', getToken).then((res) => {
      if (res && res.data) {
        setUserName(res.data.username);
        setUserPhone(res.data.phone);
      }
    });
  }, []);

  function goToPayment() {
    if (payState === -1) {
      alert('결제수단을 선택해서 결제를 진행해주세요');
      return;
    }

    if (isEmpty(getUserName)) {
      alert('주문자 이름을 입력해주세요');
      return;
    }

    if (isEmpty(getUserPhone)) {
      alert('주문자 번호를 입력해주세요');
      return;
    }

    if (isEmpty(receiverName)) {
      alert('수령인을 입력해주세요');
      return;
    }

    if (isEmpty(receiverPhone)) {
      alert('수령인 전화번호를 입력해주세요');
      return;
    }

    if (isEmpty(receiverSimpleAddress)) {
      alert('수령인 주소를 입력해주세요');
      return;
    }

    let payStateString = '';
    ORDER_PAY.forEach((state) => {
      if (state.index === payState) {
        payStateString = state.value;
      }
    });
    let orderInfoRequestList = new Array();
    stateList.forEach((state) => {
      if (state.serialNo && state.serialNo !== '') {
        let orderInfoIdList = new Array();
        orderBySellerDtoList.forEach((orderBySellerDto) => {
          if (orderBySellerDto.sellerId === state.key) {
            orderBySellerDto.orderInfoResponseDtos.forEach(
              (orderInfoResponseDto) => {
                orderInfoIdList.push(orderInfoResponseDto.id);
              },
            );
          }
        });
        orderInfoRequestList.push({
          couponSerialNo: state.serialNo,
          orderInfoIdList: orderInfoIdList,
        });
      }
    });

    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push(LINKS.SIGNIN);
      }
    }
    const getToken = useGetToken();
    setHeaders(getToken);

    POST(
      `/order`,
      {
        orderId,
        orderInfoRequestList: orderInfoRequestList,
        receiverName: receiverName,
        receiverPhone: receiverPhone,
        addressSimple: receiverSimpleAddress,
        addressDetail: receiverDetailAddress,
        deliveryComment: receiverMemo,
        orderPayState: payStateString,
      },
      getToken,
    ).then((res) => {
      console.log(res);
      if (res) {
        if (res.success) {
          router.push(LINKS.MYPAGE);
        } else {
          alert('주문에 실패했습니다. 다시시도해주세요');
        }
      }
    });
  }

  function payStateClick(event) {
    if (event === payState) {
      setPayState(-1);
    } else {
      setPayState(event);
    }
  }

  function getProductTotalPrice({ orderBySellerDtoList }) {
    let totalPrice = 0;
    orderBySellerDtoList.forEach((orderBySellerDto) => {
      const orderInfoResponseDtos = orderBySellerDto.orderInfoResponseDtos;
      orderInfoResponseDtos.forEach((orderInfoResponseDto) => {
        totalPrice =
          totalPrice +
          orderInfoResponseDto.productPrice * orderInfoResponseDto.productCnt;
      });
    });
    setProductTotalPrice(totalPrice);
  }

  return (
    <CommerceLayout>
      <SiteHead title="Order/Payment" />
      <CouponContext.Provider value={stateList}>
        <CouponDispatchContext.Provider value={dispatch}>
          <LoginHeaderContext.Provider value={headers}>
            <OrderContainer className="order-container">
              <OrderSection className="order-section">
                <H1>주문/결제</H1>
                <div>
                  <H2>주문정보</H2>
                  <OrdererSection
                    getUserName={getUserName}
                    getUserPhone={getUserPhone}
                    setUserPhone={setUserPhone}
                    receiverName={receiverName}
                    receiverPhone={receiverPhone}
                    receiverSimpleAddress={receiverSimpleAddress}
                    receiverDetailAddress={receiverDetailAddress}
                    receiverMemo={receiverMemo}
                    setReceiverName={setReceiverName}
                    setReceiverPhone={setReceiverPhone}
                    setReceiverSimpleAddress={setReceiverSimpleAddress}
                    setReceiverDetailAddress={setReceiverDetailAddress}
                    setReceiverMemo={setReceiverMemo}
                  />
                </div>
                <HR />
                <div>
                  <H2>상품 정보</H2>
                  <OrderDetail
                    orderBySellerDtoList={orderBySellerDtoList}
                    headers={headers}
                  />
                </div>
                <HR />
                <div>
                  <H2>결제방식</H2>
                  <PayList index={payState} setIndex={payStateClick} />
                </div>
                <EndOfOrderSection>
                  <HR />
                </EndOfOrderSection>
              </OrderSection>
              <OrderSidebar
                goToPayment={goToPayment}
                productTotalPrice={productTotalPrice}
              />
            </OrderContainer>
          </LoginHeaderContext.Provider>
        </CouponDispatchContext.Provider>
      </CouponContext.Provider>
    </CommerceLayout>
  );
}

const OrderContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
  font-size: 1.3rem;
`;

const OrderSection = styled.div`
  padding-left: 0px;
  max-width: 100%;
  flex: 1 0 0px;
`;

const EndOfOrderSection = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }
`;

const H1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

const H2 = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
`;

const HR = styled.hr`
  color: ${ThemeGray3};
  background-color: ${ThemeGray3};
  border-color: ${ThemeGray3};
  margin: 3rem 0;
`;
