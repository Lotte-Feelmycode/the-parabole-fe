import styled from '@emotion/styled';
import { getState, numberToMonetary, getDateShort } from '@utils/functions';
import { ORDER_STATE } from '@utils/constants/types';
import Link from 'next/link';
import { ThemeGray4 } from '@utils/constants/themeColor';

export default function Order({ order }) {
  return (
    <OrderSection className="order-section">
      <OrderDateSection className="order-date-section">
        <span>{getState(ORDER_STATE, order.state)}</span>
        <span>{getDateShort(order.updatedAt)}</span>
      </OrderDateSection>
      <OrderDetailSection className="order-detail-section">
        <OrderImgSection className="order-img-section">
          <LinkToProduct>
            <Link href={`/product/${order.productId}`}>
              <img src={order.productThumbnailImg} width="100%" margin="0" />
            </Link>
          </LinkToProduct>
        </OrderImgSection>
        <OrderProductSection className="order-product-section">
          <ProductTitleSection className="product-title-section">
            <LinkToProduct>
              <Link href={`/product/${order.productId}`}>
                {order.productName}
              </Link>
            </LinkToProduct>
          </ProductTitleSection>
          <ProductDetailSection className="product-detail-section">
            <ProductDetailPrice>
              {numberToMonetary(order.productPrice * order.productCnt)}원
            </ProductDetailPrice>
            <ProductDetailCount>{order.productCnt}개</ProductDetailCount>
          </ProductDetailSection>
        </OrderProductSection>
      </OrderDetailSection>
    </OrderSection>
  );
}

const OrderSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid ${ThemeGray4};
  border-radius: 10px;

  @media (min-width: 767px) {
    margin: 1%;
    width: 48%;
  }
  @media (max-width: 767px) {
    margin: 1%;
    width: 99%;
  }
`;

const OrderDateSection = styled.div`
  padding: 10px;
`;

const OrderImgSection = styled.div`
  flex-shrink: 0;
  @media (min-width: 767px) {
    width: 100px;
  }
  @media (max-width: 767px) {
    width: 60px;
  }
`;

const OrderDetailSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const OrderProductSection = styled.div`
  width: fit-content;
`;

const ProductTitleSection = styled.div`
  word-break: break-all;
  font-weight: 700;
  @media (min-width: 767px) {
    font-size: large;
  }
  @media (max-width: 767px) {
    font-size: medium;
  }
`;

const ProductDetailSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: auto;
  align-items: flex-end;
`;

const ProductDetailPrice = styled.span`
  border-right: 1px solid ${ThemeGray4};
  padding: 0 10px;
  @media (min-width: 767px) {
    font-weight: 700;
    font-size: medium;
  }
  @media (max-width: 767px) {
    font-size: small;
  }
`;

const ProductDetailCount = styled.span`
  padding: 0 10px;
  @media (min-width: 767px) {
    font-size: small;
  }
  @media (max-width: 767px) {
    font-size: 10px;
  }
`;

const LinkToProduct = styled.div`
  padding: 5px;

  &:hover {
    cursor: pointer;
  }
`;
