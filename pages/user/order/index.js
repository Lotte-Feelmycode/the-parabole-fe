import SiteHead from '@components/common/SiteHead.js';
import CommerceLayout from '@components/common/CommerceLayout';
import styled from '@emotion/styled';
import { createContext, useEffect, useState } from 'react';
import Input from '@components/input/Input';
import * as btn from '@components/input/Button';
import ProductList from '@components/order/ProductList';
import { numberToMonetary } from '@utils/moneyUtil';
import PayList from '@components/order/PayList';
import { POST } from '@apis/defaultApi';
import { getOrderTotal } from '@utils/functions';

export const AppContext = createContext();

export default function OrderAndPayment({ produts }) {
  const getUserId = 1;

  const [userId, setUserId] = useState(getUserId);
  // product를 받아서 값을 넣어야 하지만 지금은 그냥 들어가 있는 테스트 값
  const [product, setProduct] = useState([
    {
      productId: 1,
      productName: '한우국밥',
      productPrice: 10000,
      productCnt: 5,
    },
    {
      productId: 2,
      productName: '돼지국밥',
      productPrice: 8000,
      productCnt: 1,
    },
  ]);

  function getSum() {
    let sum = 0;
    for (var i = 0; i < product.length; i++) {
      sum = sum + product[i].productPrice;
    }
    return sum;
  }

  function orderProduct() {
    POST(
      `/orderinfo?userId=` + userId,
      {
        orderInfoDto: product,
      }.then((res) => {
        setProduct(res);
      }),
    );
  }

  const input = {
    width: '14rem',
    borderRadius: '0.2rem',
    backgroundColor: '#e1e1e1',
    border: 'none',
    fontSize: '1rem',
    margin: '10px auto',
  };

  return (
    <Div>
      <CommerceLayout>
        <SiteHead title="Order / Payment" />
        <section className="flex min-h-screen flex-col text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <H1>주문 목록</H1>
            <H2>주문자 정보</H2>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <TdTitle>주문자</TdTitle>
                  <Td>
                    <Input css={input} />
                  </Td>
                </tr>
                <tr>
                  <TdTitle>휴대전화</TdTitle>
                  <Td>
                    <Input css={input} />
                  </Td>
                </tr>
              </tbody>
            </table>
            <br />
            <hr />
            <br />
            <H2>수령자 정보</H2>
            <div>(체크박스가 들어갈 것(주문자 정보와 동일)</div>
            {/* <btn.SmallLineWhite buttonText={'주문자 정보와 동일'} /> */}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <TdTitle>수령인</TdTitle>
                  <Td>
                    <Input css={input} />
                  </Td>
                </tr>
                <tr>
                  <TdTitle>휴대전화</TdTitle>
                  <Td>
                    <Input css={input} />
                  </Td>
                </tr>
                <tr>
                  <TdTitle>배송지 주소</TdTitle>
                  <Td>
                    <Input css={input} />
                  </Td>
                </tr>
                <tr>
                  <TdTitle>배송 메모</TdTitle>
                  <Td>
                    <Input css={input} />
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
              <>총 금액</>
              <Total>{numberToMonetary(getOrderTotal(product))}원</Total>
            </div>
            <br />
            <hr />
            <br />
            <div>
              <H2>결제방식</H2>
              <PayList />
            </div>
            <br />
            <br />
            <btn.Blue
              buttonText={numberToMonetary(getSum()) + '원 결제하기'}
              onClickFunc={orderProduct}
            />
          </div>
        </section>
      </CommerceLayout>
    </Div>
  );
}

const Div = styled.div`
  font-size: 1.3rem;
`;

const Total = styled.span`
  font-size: 1.3rem;
`;

const Td = styled.td`
  text-align: center;
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
`;
