import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { numberToMonetary } from '@utils/moneyUtil';

export default function Product({ product }) {
  // console.log('product props : ' + JSON.stringify(product));
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(
      {
        pathname: `/product/${id}`,
      },
      `/product/${id}`,
    );
  };

  return (
    <>
      <div className="product">
        <a onClick={() => onClick(product.productId || 1, product.productName)}>
          <div>
            <ProductImage
              className="product-img"
              src={product.productThumbnailImg}
              alt="천연 순면 마스크팩 시트 4종 100매 티트리 쉐어버터 로얄제리젤리 알로에"
            />
          </div>
        </a>
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
      </div>
    </>
  );
}

const ProductImage = styled.img`
  width: 330px;
`;
