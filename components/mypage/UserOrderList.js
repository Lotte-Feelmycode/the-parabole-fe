import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { GET_DATA } from '@apis/defaultApi';
import UserOrder from '@components/mypage/UserOrder';
import { ThemeGray5 } from '@utils/constants/themeColor';
import { Blue } from '@components/input/Button';
import { useRouter } from 'next/router';
import { LINKS } from '@utils/constants/links';

export default function OrderList({ headers }) {
  const [orderList, setOrderList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GET_DATA(`/order`, null, headers).then((res) => {
      if (res) {
        setOrderList(res);
      }
    });
  }, [headers]);

  if (orderList && orderList.length > 0) {
    return (
      <OrderListSection className="order-list-section">
        {orderList.map((order) => (
          <UserOrder order={order} key={order.id} />
        ))}
      </OrderListSection>
    );
  } else {
    return (
      <EmptyOrderList>
        <EmptyImageContainer>
          <EmptyImage src="/parabole.svg" />
        </EmptyImageContainer>
        <Blue
          buttonText={'구매하러가기'}
          onClickFunc={() => {
            router.push(LINKS.PRODUCT);
          }}
        />
      </EmptyOrderList>
    );
  }
}

const OrderListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const EmptyOrderList = styled.div`
  padding: 50px;
  text-align: center;
  background-color: ${ThemeGray5};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const EmptyImageContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;
const EmptyImage = styled.img`
  max-height: 350px;
  border-radius: 10px;
  margin: 10px;
`;

function UserOrder({ order }) {
  const router = useRouter();

  const goToProduct = (id) => {
    router.push({ pathname: `/product/${id}` });
  };

  return (
    <tr>
      <Td>
        <a
          className="product"
          onClick={() => goToProduct(order.productId || 0)}
        >
          <img src={order.productThumbnailImg} width="100%" margin="0" />
        </a>
      </Td>
      <Td>{order.productName}</Td>
      <Td>{order.productCnt}개</Td>
      <Td>{numberToMonetary(order.productPrice * order.productCnt)}원</Td>
      <Td>{getState(ORDER_STATE, order.state)}</Td>
      <Td>{getState(ORDER_PAY_STATE, order.payState)}</Td>
    </tr>
  );
}

const Td = styled.td`
  padding: 5px;
`;
