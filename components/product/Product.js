import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { numberToMonetary } from '@utils/moneyUtil';

export default function Product({ product }) {
  // console.log('product props : ' + JSON.stringify(product));
  const router = useRouter();
  const onClick = (id) => {
    router.push({
      pathname: `/product/${id}`,
    });
  };

  return (
    <>
      <div className="product">
        <ProductSection onClick={() => onClick(product.productId || 0)}>
          <ProductImageSection>
            <ProductImage
              className="product-img"
              src={product.productThumbnailImg}
              alt="천연 순면 마스크팩 시트 4종 100매 티트리 쉐어버터 로얄제리젤리 알로에"
            />
          </ProductImageSection>
          <div className="product-body">
            <div className="srchProductInfoColumn">
              <div className="srchProductUnitTitle">{product.productName}</div>
            </div>
            <div className="srchProductInfoColumn">
              <div className="s-product-price">
                <strong className="s-product-price-final">
                  <span className="s-product-price-number">
                    {numberToMonetary(product.productPrice)}
                  </span>
                  원
                </strong>
              </div>
            </div>
            <div className="srchProductInfoColumn"></div>
          </div>
        </ProductSection>
      </div>
    </>
  );
}

const ProductSection = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

const ProductImageSection = styled.div`
  text-align: center;
`;

const ProductImage = styled.img`
  width: 330px;
`;
