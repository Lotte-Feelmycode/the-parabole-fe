import { ORDER_PAY } from '@utils/constants/types';
import Pay from '@components/order/Pay';
import { useEffect, useState } from 'react';
import OrderList from './SellerOrderList';
import styled from '@emotion/styled';

export default function PayList() {
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(-1);

  useEffect(() => {}, [index]);

  const btnCss = {
    width: '12rem',
  };

  function clicked(idx) {
    setCount(count + 1);
    setIndex(idx);
  }

  function selectPay(name, idx) {
    if (idx === index) {
      return (
        <Pay
          buttonText={name}
          onClickFunc={() => clicked(idx)}
          css={{
            width: '12rem',
            border: '2px solid #0084FF',
          }}
        />
      );
    } else {
      return (
        <div>
          <Pay
            css={btnCss}
            buttonText={name}
            onClickFunc={() => clicked(idx)}
          />
        </div>
      );
    }
  }

  return (
    <>
      {ORDER_PAY.map((order) => (
        <a onClick={() => {}}>
          <Div>{selectPay(order.name, order.index)}</Div>
        </a>
      ))}
    </>
  );
}

const Div = styled.div`
  display: inline-block;
`;
