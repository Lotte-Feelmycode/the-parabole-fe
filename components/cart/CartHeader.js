import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { DELETE } from '@apis/defaultApi';
import { SmallLineWhite } from '@components/input/Button';

export default function CartHeader({
  totalCheckBoxChange,
  cartBySellerDtoList,
  checkBoxStates,
  numberOfChekced,
  totalCheckBoxFlag,
  userId,
}) {
  const router = useRouter();

  const CommerceCartHeaderContainer = styled.div`
    z-index: 100;
    margin: 0;
    padding: 0;
  `;

  const CommerceCartHeaderContainerChild = styled.div`
    padding: 0 21px;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin: 0 0 11px;
    z-index: 100;
  `;

  const CommerceCartHeaderLeft = styled.span`
    flex: 0 0 auto;
    display: flex;
  `;
  const CommerceCartHeaderRight = styled.span`
    flex: 0 0 auto;
  `;

  const deleteCheckedItemBtn = () => {
    var deleteFlag = false;
    if (
      cartBySellerDtoList &&
      numberOfChekced !== 0 &&
      confirm('선택한 상품을 장바구니에서 삭제하시겠습니까?')
    ) {
      cartBySellerDtoList.map((dto) => {
        const cartItemList = dto.cartItemDtoList;
        cartItemList.map((item) => {
          if (checkBoxStates.get(item.cartItemId)) {
            const CartItemDeleteRequestDto = {
              userId: userId,
              cartItemId: item.cartItemId,
            };
            DELETE(`/cart/delete`, CartItemDeleteRequestDto);
            deleteFlag = true;
          }
        });
      });
      if (deleteFlag) {
        router.reload();
      }
    } else {
      alert('상품을 선택해주세요');
    }
  };

  return (
    <CommerceCartHeaderContainer className="commerce-cart-header-container">
      <CommerceCartHeaderContainerChild>
        <CommerceCartHeaderLeft>
          <div className="mx-2">
            <input
              type="checkbox"
              onChange={(event) => totalCheckBoxChange(event.target.checked)}
              checked={totalCheckBoxFlag}
            />
          </div>
          <span>모두 선택</span>
        </CommerceCartHeaderLeft>
        <CommerceCartHeaderRight>
          <SmallLineWhite
            buttonText="선택삭제"
            onClickFunc={() => {
              deleteCheckedItemBtn();
            }}
          />
        </CommerceCartHeaderRight>
      </CommerceCartHeaderContainerChild>
    </CommerceCartHeaderContainer>
  );
}
