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
    console.log(headers);
    GET_DATA(`/order`, '', headers).then((res) => {
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
