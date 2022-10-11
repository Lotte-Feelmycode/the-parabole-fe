import styled from '@emotion/styled';
import { useRouter } from 'next/router';

export default function Order({ order }) {
  const router = useRouter();

  const orderState = [
    { value: 'BEFORE_PAY', name: '입금전' },
    { value: 'PAY_COMPLETE', name: '결제완료' },
    { value: 'BEFORE_DELIVERY', name: '배송준비' },
    { value: 'DELIVERY', name: '배송중' },
    { value: 'DELIVERY_COMPLETE', name: '배송완료' },
    { value: 'ORDER_CANCEL', name: '취소' },
    { value: 'REFUND', name: '반품' },
  ];

  const orderPayState = [
    { key: 'CARD', name: '카드결제' },
    { key: 'BANK_TRANSFER', name: '실시간 계좌이체' },
    { key: 'PHONE', name: '휴대폰결제' },
    { key: 'VIRTUAL_ACCOUNT', name: '가상계좌' },
    { key: 'KAKAO_PAY', name: '카카오페이' },
    { key: 'TOSS', name: '토스' },
    { key: 'WITHOUT_BANK', name: '무통장입금' },
    { key: 'NAVER_PAY', name: '네이버페이' },
  ];

  const getPayState = (prop) => {
    console.log(prop);
    const payState = orderPayState.map((state) => {
      console.log(state.key, state.name, state.key === prop);
      if (state.key === prop) return state.name;
    });
    return payState;
  };

  const SelectBox = (props) => {
    return (
      <select defaultValue={props.defaultValue}>
        {props.options.map((option) => (
          <option value={option.value}>{option.name}</option>
        ))}
      </select>
    );
  };

  return (
    <tr>
      <Td>
        <img src={order.productThumbnailImg} />
      </Td>
      <Td>{order.userEmail}</Td>
      <Td>{order.productName}</Td>
      <Td>{order.productDiscountPrice}</Td>
      <Td>{order.productPrice}</Td>
      <Td>{order.productCnt}</Td>
      <Td>{order.productRemain}</Td>
      <Td>
        <SelectBox options={orderState} defaultValue={order.state} />
      </Td>
      <Td>{getPayState(order.payState)}</Td>
      <Td></Td>
    </tr>
  );
}

const Td = styled.td`
  padding: 30px;
  font-family: 'SansLight';
`;
