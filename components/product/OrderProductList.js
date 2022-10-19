import styled from '@emotion/styled';
import { ThemeGray2 } from '@utils/constants/themeColor';

export default function OrderProductList({ productList }) {
  return (
    <div>
      {productList &&
        productList.map((product) => (
          <Product product={product} key={product.productId} />
        ))}
    </div>
  );
}

function Product({ product }) {
  return (
    <ProductInfoContainer
      className="productInfoContainer"
      borderColor={ThemeGray2}
    >
      <table className="w-full text-m text-center">
        <tbody>
          <tr>
            <TdImg rowSpan={5}>
              <img src={product.productThumbnailImg} />
            </TdImg>
            <td>
              <InfoController>
                <TdTitle>상품명</TdTitle>
                <Td>
                  <span>{product.productName}</span>
                </Td>
              </InfoController>
            </td>
          </tr>
          <tr>
            <InfoController>
              <TdTitle>쿠폰</TdTitle>
              <Td>쿠폰정보넣을예정</Td>
            </InfoController>
          </tr>
          <tr>
            <InfoController>
              <TdTitle>상품 개수</TdTitle>
              <Td>{product.productCnt}</Td>
            </InfoController>
          </tr>
          <tr>
            <InfoController>
              <TdTitle>가격</TdTitle>
              <Td>{product.productPrice * product.productCnt}</Td>
            </InfoController>
          </tr>
        </tbody>
      </table>
    </ProductInfoContainer>
  );
}

const ProductInfoContainer = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
`;

const TdImg = styled.td`
  width: 20%;
  padding: 10px;
`;

const InfoController = styled.div`
  display: inline-flex;
  padding: 0 10%;
  width: 100%;
`;

const TdTitle = styled.span`
  text-align: left;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0;
`;

const Td = styled.span`
  text-align: left;
  margin-left: auto;
`;
