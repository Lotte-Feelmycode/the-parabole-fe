import styled from '@emotion/styled';
import { ThemeGray2 } from '@utils/constants/themeColor';

export default function Product({ product }) {
  return (
    <Div borderColor={ThemeGray2}>
      <table className="w-full text-m text-center">
        <tbody>
          <tr>
            <TdImg rowSpan={5}>
              <img src={product.productThumbnailImg} />
            </TdImg>
            <TdTitle>상품명</TdTitle>
            <Td>
              <span>{product.productName}</span>
            </Td>
          </tr>
          <tr>
            <TdTitle>쿠폰</TdTitle>
            <Td>쿠폰정보넣을예정</Td>
          </tr>
          <tr>
            <TdTitle>상품 개수</TdTitle>
            <Td>{product.productCnt}</Td>
          </tr>
          <tr>
            <TdTitle>가격</TdTitle>
            <Td>{product.productPrice}</Td>
          </tr>
        </tbody>
      </table>
    </Div>
  );
}

const Div = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TdImg = styled.td`
  width: 20%;
  padding: 10px;
`;

const TdTitle = styled.td`
  text-align: left;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0;
`;

const Td = styled.td`
  text-align: left;
`;
