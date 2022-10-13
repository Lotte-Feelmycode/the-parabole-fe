import SiteHead from '@components/common/SiteHead.js';
import CommerceLayout from '@components/common/CommerceLayout';
import styled from '@emotion/styled';
import { createContext, useState } from 'react';
import Input from '@components/input/Input';
import * as btn from '@components/input/Button';
import * as color from '@utils/constants/themeColor';
import ProductList from '@components/order/ProductList';
import { numberToMonetary } from '@utils/moneyUtil';
import PayList from '@components/order/PayList';
import { POST } from '@apis/defaultApi';
import { getOrderTotal } from '@utils/functions';

export const AppContext = createContext();

export default function OrderAndPayment({ produts }) {
  const getUserId = 1;
  const OriginSize = { height: '55px', padding: '0.5em 1.5em 0.5em 1.5em' };
  const size = OriginSize;
  const theme = color.BlueTheme;

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

  const orderInfoDto = {
    productId: 2,
    productName: '돼지국밥',
    productPrice: 8000,
    productCnt: 1,
  };
  function getSum() {
    let sum = 0;
    for (var i = 0; i < product.length; i++) {
      sum = sum + product[i].productPrice;
    }
    return sum;
  }

  function orderProduct() {
    POST(`/orderinfo?userId=` + userId, {
      orderInfoDto: product,
    });
    console.log('order');
  }
  // function selectPay(cnt) {
  //   return <PayList />;
  // }

  function selected() {}

  const [userId, setUserId] = useState(getUserId);
  const [payState, setPayState] = useState();

  return (
    <>
      <CommerceLayout>
        <SiteHead title="Order / Payment" />
        <section className="flex min-h-screen flex-col text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <H1>주문 목록</H1>
            <h2>주문자 정보</h2>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <td>주문자</td>
                  <Td>
                    <Input />
                  </Td>
                </tr>
                <tr>
                  <td>휴대전화</td>
                  <Td>
                    <Input />
                  </Td>
                </tr>
              </tbody>
            </table>
            <br />
            <hr />
            <br />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <td>수령자 정보</td>
                  <Td>
                    <btn.SmallLineWhite buttonText={'주문자 정보와 동일'} />
                  </Td>
                </tr>
                <tr>
                  <td>수령인</td>
                  <Td>
                    <Input />
                  </Td>
                </tr>
                <tr>
                  <td>휴대전화</td>
                  <Td>
                    <Input />
                  </Td>
                </tr>
                <tr>
                  <td>배송지 주소</td>
                  <Td>
                    <Input />
                  </Td>
                </tr>
                <tr>
                  <td>배송 메모</td>
                  <Td>
                    <Input />
                  </Td>
                </tr>
              </tbody>
            </table>
            <br />
            <hr />
            <br />
            <h2>상품 정보</h2>
            <ProductList productList={product} />
            <br />
            <hr />
            <br />
            <div>
              <h1>쿠폰 / 할인</h1>
              <table>
                <tbody>
                  <tr>
                    <td>총금액</td>
                    <td>{numberToMonetary(getOrderTotal(product))}원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <hr />
            <br />
            <div>
              <h2>결제방식</h2>
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
    </>
  );
}

const Button = styled.button`
  background-color: ${color.ThemeBlueWhite};
  padding: 15px;
  border-radius: 0.25rem;
  margin: 5px;
  &:hover {
    background-color: ${color.ColorBlue2};
    cursor: pointer;
  }
`;

const Td = styled.td`
  text-align: center;
`;

const H2 = styled.span`
  font-size: 15px;
`;

const H1 = styled.h1`
  font-size: 30px;
  margin-bottom: 30px;
  font-family: 'SansBold';
`;
