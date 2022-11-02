import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { DELETE } from '@apis/defaultApi';
import { ThemeGray1 } from '@utils/constants/themeColor';
import CartProduct from '@components/cart/CartProduct';

export default function CartContentDetail({
  userId,
  cartItemDtoList,
  checkBoxStates,
  cartCheckBoxChange,
  cartInfoChange,
}) {
  const router = useRouter();

  const ProductCheckSection = styled.div`
    position: relative;
    display: block;
    flex: 0 0 auto;
    margin-right: 5px;
    padding: 5px;
  `;

  const ProductDetailSection = styled.div`
    position: relative;
    display: flex;
    flex: 1 0 auto;
  `;

  const ProductDeleteSection = styled.div`
    position: relative;
    flex: 0 0 auto;
    padding-left: 5px;
    display: block;
    margin-left: auto;

    &:hover {
      cursor: pointer;
    }
  `;

  const CartDetailSection = styled.div`
    padding-top: 5px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    display: flex;
  `;

  const deleteCartItem = ({ input }) => {
    const CartItemDeleteRequestDto = {
      userId: userId,
      cartItemId: input,
    };
    if (confirm('장바구니에서 삭제하시겠습니까?')) {
      DELETE(`/cart/delete`, CartItemDeleteRequestDto);
      router.reload();
    }
  };

  return (
    <div>
      {cartItemDtoList &&
        cartItemDtoList.map((item) => (
          <CartDetailSection key={item.cartItemId}>
            <ProductCheckSection>
              <input
                type="checkbox"
                onChange={(event) =>
                  cartCheckBoxChange({
                    cartItemId: item.cartItemId,
                    flag: event.target.checked,
                  })
                }
                checked={checkBoxStates.get(item.cartItemId)}
              />
            </ProductCheckSection>
            <ProductDetailSection>
              <CartProduct
                userId={userId}
                cartItemId={item.cartItemId}
                product={item.product}
                count={item.count}
                setCountFunc={cartInfoChange}
              />
            </ProductDetailSection>
            <ProductDeleteSection>
              <button
                onClick={() => deleteCartItem({ input: item.cartItemId })}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill={ThemeGray1}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    fillRule="nonzero"
                    d="M6 4.6L10.3.3l1.4 1.4L7.4 6l4.3 4.3-1.4 1.4L6 7.4l-4.3 4.3-1.4-1.4L4.6 6 .3 1.7 1.7.3 6 4.6z"
                  />
                </svg>
              </button>
            </ProductDeleteSection>
          </CartDetailSection>
        ))}
    </div>
  );
}
