import styled from '@emotion/styled';
import OrderDetailHeader from '@components/order/OrderDetailHeader';
import OrderDetailContent from '@components/order/OrderDetailContent';
import OrderDetailFooter from '@components/order/OrderDetailFooter';
import { ThemeBlueWhite } from '@utils/constants/themeColor';

export default function OrderDetail({ orderBySellerDtoList, headers }) {
  function ShowOrderDetail({ dto }) {
    let contentTotalPrice = 0;
    dto.orderInfoResponseDtos.forEach((item) => {
      contentTotalPrice =
        (contentTotalPrice + item.productPrice) * item.productCnt;
    });

    return (
      <OrderDetailSection className="order-detail-container" key={dto.sellerId}>
        <OrderDetailHeader storeName={dto.storeName} sellerId={dto.sellerId} />
        <OrderDetailContent orderInfoResponseDtos={dto.orderInfoResponseDtos} />
        <OrderDetailFooter
          contentTotalPrice={contentTotalPrice}
          storeName={dto.storeName}
          sellerId={dto.sellerId}
          headers={headers}
        />
      </OrderDetailSection>
    );
  }

  return (
    <OrderDetailContainer className="order-detail-container">
      {orderBySellerDtoList &&
        orderBySellerDtoList.map((dto) => (
          <ShowOrderDetail dto={dto} key={dto.sellerId} />
        ))}
    </OrderDetailContainer>
  );
}

const OrderDetailContainer = styled.div``;

const OrderDetailSection = styled.div`
  background-color: ${ThemeBlueWhite};
  border-radius: 6px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    padding: 10px 10px;
  }

  @media (min-width: 1024px) {
    padding: 10px 20px;
    margin: 30px 0;
  }
`;
