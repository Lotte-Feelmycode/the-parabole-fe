import styled from '@emotion/styled';
import { ThemeGray4, ThemeGray1 } from '@utils/constants/themeColor';
import { numberToMonetary } from '@utils/functions';
import { NO_IMAGE } from '@utils/constants/images';
import { useRouter } from 'next/router';

export default function OrderDetailContent({ orderInfoResponseDtos }) {
  const router = useRouter();

  function goToProductDetail({ productId }) {
    router.push('/product/' + productId);
  }

  function Product({ product }) {
    return (
      <ProductInfoContainer className="product-info-container">
        <table className="w-full text-m text-center">
          <tbody>
            <tr>
              <td rowSpan={5} width={'70px'}>
                <OrderInfoImageSection className="order-info-image-section">
                  <a
                    onClick={() => {
                      goToProductDetail({ productId: product.productId });
                    }}
                  >
                    <OrderInfoImage
                      src={product.productThumbnailImg || NO_IMAGE}
                    />
                  </a>
                </OrderInfoImageSection>
              </td>
              <td>
                <InfoController>
                  <ProductName>{product.productName}</ProductName>
                </InfoController>
              </td>
            </tr>
            <tr>
              <td>
                <InfoController>
                  <ProductDetail>
                    <ProductPrice>
                      {numberToMonetary(
                        product.productPrice * product.productCnt,
                      ) + '원'}
                    </ProductPrice>
                    <ProductCnt>{product.productCnt + '개'}</ProductCnt>
                  </ProductDetail>
                </InfoController>
              </td>
            </tr>
          </tbody>
        </table>
      </ProductInfoContainer>
    );
  }

  return (
    <div>
      {orderInfoResponseDtos &&
        orderInfoResponseDtos.map((dto) => (
          <Product product={dto} key={dto.id} />
        ))}
    </div>
  );
}

const ProductInfoContainer = styled.div`
  font-size: 1rem;
  border-bottom: 1px solid ${ThemeGray4};
  border-radius: 5px;
  padding: 10px;
  background-color: white;
  @media (min-width: 1024px) {
    height: 85px;
  }
`;

const OrderInfoImageSection = styled.div`
  width: 64px;
  height: 64px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`;

const OrderInfoImage = styled.img`
  object-fit: cover;
`;

const InfoController = styled.div`
  padding: 0 10%;
  width: 100%;
  text-align: left;
  margin-left: auto;
  word-break: break-word;
`;

const ProductName = styled.span`
  font-weight: bolder;
  font-size: 17px;
`;

const ProductDetail = styled.div`
  display: flex;
  align-items: center;
`;

const ProductPrice = styled.span`
  font-size: 16px;
  line-height: 17px;
  font-weight: bold;
  border-right: 1px solid ${ThemeGray4};
  padding-right: 5px;
`;

const ProductCnt = styled.span`
  font-size: 14px;
  color: ${ThemeGray1};
  padding-left: 5px;
`;
