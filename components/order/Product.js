import styled from '@emotion/styled';

export default function Product({ product }) {
  return (
    <Div>
      <br />
      <table className="w-full text-m text-center">
        <tbody>
          <tr>
            <TdTitle rowSpan={5}>
              <img src={product.productThumbnailImg} />
            </TdTitle>
          </tr>
          <tr>
            <TdTitle>상품명</TdTitle>
            <Td>{product.productName}</Td>
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
  font-size: 1.3rem;
`;

const TdTitle = styled.div`
  text-align: left;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
  width: 11rem;
`;

const Td = styled.td`
  text-align: left;
`;
