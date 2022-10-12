import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ORDER_STATE } from '@utils/constants/types';
import { ORDER_PAY_STATE } from '@utils/constants/types';

export default function Order({ order }) {
  const router = useRouter();

  const getPayState = (prop) => {
    const payState = ORDER_PAY_STATE.map((state) => {
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
        <SelectBox options={ORDER_STATE} defaultValue={order.state} />
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
