import styled from '@emotion/styled';
import { ThemeGray4 } from '@utils/constants/themeColor';

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
      borderColor={ThemeGray4}
    >
      <table className="w-full text-m text-center">
        <tbody>
          <tr>
            <TdImg rowSpan={5}>
              <img src={product.productThumbnailImg} />
            </TdImg>
            <td>
              <InfoController>
                <InfoTitle>상품명</InfoTitle>
                <InfoData>
                  <span>{product.productName}</span>
                </InfoData>
              </InfoController>
            </td>
          </tr>
          <tr>
            <td>
              <InfoController>
                <InfoTitle>쿠폰</InfoTitle>
                <InfoData>쿠폰정보넣을예정</InfoData>
              </InfoController>
            </td>
          </tr>
          <tr>
            <td>
              <InfoController>
                <InfoTitle>상품 개수</InfoTitle>
                <InfoData>{product.productCnt}</InfoData>
              </InfoController>
            </td>
          </tr>
          <tr>
            <td>
              <InfoController>
                <InfoTitle>가격</InfoTitle>
                <InfoData>{product.productPrice * product.productCnt}</InfoData>
              </InfoController>
            </td>
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

const InfoTitle = styled.span`
  text-align: left;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0;
`;

const InfoData = styled.span`
  text-align: left;
  margin-left: auto;
`;
