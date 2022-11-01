import styled from '@emotion/styled';
import { ThemeWhite } from '@utils/constants/themeColor';
import { numberToMonetary } from '@utils/functions';
import { Blue } from '@components/input/Button';

export default function CartSidebar({
  GoToOrder,
  totalPrice,
  numberOfChekced,
}) {
  const CommerceCartSidebar = styled.div`
    display: block;
    padding-top: 35px;
    position: relative;
    width: 100%;
    min-height: 1px;
    box-sizing: border-box;
  `;

  const StickyContainer = styled.div`
    position: sticky;
    top: 81px;
    transition: top 0.1s ease 0s;
    margin: 0;
    padding: 0;
  `;

  const StickyChild = styled.div`
    position: relative;
    padding: 5px 0;
  `;

  const CommerceCartSummery = styled.div`
    margin-bottom: 20px;
    border-radius: 6px;
    padding: 10px 20px;
    background-color: ${ThemeWhite};
    display: flex;
  `;

  const TotalPriceLabelSection = styled.div`
    flex: 0 1 auto;
    display: block;
  `;

  const TotalPriceLabel = styled.dt`
    font-weight: 700;
    font-size: 15px;
  `;

  const TotalPriceValueSection = styled.div`
    flex: 0 0 auto;
    margin-left: auto;
    text-align: right;
    display: block;
  `;

  const TotalPriceValue = styled.dd`
    text-align: right;
    font-size: 24px;
    font-weight: 700;
  `;

  return (
    <CommerceCartSidebar className="commerce-cart-sidebar">
      <StickyContainer>
        <StickyChild>
          <CommerceCartSummery>
            <TotalPriceLabelSection>
              <TotalPriceLabel>
                <span>총 가격 : </span>
              </TotalPriceLabel>
            </TotalPriceLabelSection>
            <TotalPriceValueSection>
              <TotalPriceValue>
                <span>{numberToMonetary(totalPrice) || 0}</span>원
              </TotalPriceValue>
            </TotalPriceValueSection>
          </CommerceCartSummery>
          <Blue
            buttonText={numberOfChekced + '개 상품 구매하기'}
            css={{ width: '100%' }}
            onClickFunc={GoToOrder}
          />
        </StickyChild>
      </StickyContainer>
    </CommerceCartSidebar>
  );
}
