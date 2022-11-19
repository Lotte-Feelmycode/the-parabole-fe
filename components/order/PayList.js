import styled from '@emotion/styled';
import { ORDER_PAY } from '@utils/constants/types';
import { LineBlue, Blue } from '@components/input/Button';

export default function PayList({ index, setIndex }) {
  const btnCss = { width: '100%' };

  function selectPay(name, idx) {
    if (idx === index) {
      return (
        <Blue
          buttonText={name}
          onClickFunc={() => setIndex(idx)}
          css={btnCss}
        />
      );
    } else {
      return (
        <LineBlue
          css={btnCss}
          buttonText={name}
          onClickFunc={() => setIndex(idx)}
        />
      );
    }
  }

  return (
    <SelectPaySection>
      {ORDER_PAY.map((order) => (
        <SelectPayBtnSection key={order.value}>
          {order && selectPay(order.name, order.index)}
        </SelectPayBtnSection>
      ))}
    </SelectPaySection>
  );
}

const SelectPaySection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin-left: auto;
  margin-right: auto;
`;

const SelectPayBtnSection = styled.a`
  @media (min-width: 1287px) {
    margin: 10px 1%;
    width: 22%;
  }

  @media (max-width: 1287px) {
    margin: 10px 1%;
    width: 31%;
  }

  @media (max-width: 768px) {
    margin: 10px 1%;
    width: 48%;
  }

  @media (max-width: 548px) {
    margin: 10px 0;
    width: 100%;
  }
`;
