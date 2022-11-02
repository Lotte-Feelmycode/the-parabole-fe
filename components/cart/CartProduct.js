import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { PATCH } from '@apis/defaultApi';
import { numberToMonetary } from '@utils/functions';
import { SmallWhite } from '@components/input/Button';
import Input from '@components/input/Input';

export default function CartProduct({
  userId,
  cartItemId,
  product,
  count,
  setCountFunc,
}) {
  const router = useRouter();
  const goToProductDetail = (id) => {
    router.push({
      pathname: `/product/${id}`,
    });
  };

  const [optionCount, setOptionCount] = useState(count);
  const [optionCountHistory, setOptionCountHistory] = useState(optionCount);
  const maxCount = product.productRemains < 100 ? product.productRemains : 100;
  const minCount = 1;
  useEffect(() => {
    countCheck(optionCount);
    if (optionCount != optionCountHistory) {
      PATCH(`/cart/update/cnt`, {
        cartItemId: cartItemId,
        userId: userId,
        productId: product.productId,
        cnt: optionCount,
      }).then((res) => {
        if (res) {
          if (res.success) {
            setOptionCountHistory(optionCount);
            setCountFunc({ cartItemId: cartItemId, cnt: optionCount });
          } else {
            alert(res.message);
            console.log(res);
            setOptionCount(optionCountHistory);
          }
        } else {
          console.log('장바구니 수정 오류', res);
          setOptionCount(optionCountHistory);
        }
      });
    }
  }, [optionCount]);

  const onOptionCountChange = (e) => {
    countCheck(e.target.value);
  };

  const countCheck = (number) => {
    let num = number;
    if (num > maxCount) num = maxCount;
    if (num < minCount) num = minCount;
    setOptionCount(num);
  };

  const minusBtnClick = () => {
    countCheck(optionCount - 1);
  };

  const plusBtnClick = () => {
    countCheck(optionCount + 1);
  };

  return (
    <>
      <ProductSection
        onClick={() => goToProductDetail(product.productId || 0)}
        className="product-section"
      >
        <ProductImageSection className="product-image-section">
          <ProductImage
            className="product-img"
            src={product.productThumbnailImg}
            alt={product.productName}
          />
        </ProductImageSection>
        <ProductInfoSection className="product-info-section">
          <ProductTitle>{product.productName}</ProductTitle>
        </ProductInfoSection>
      </ProductSection>
      <CartOptionSection className="cart-option-section">
        <OptionInputSection>
          <SmallWhite
            buttonText="-"
            onClickFunc={minusBtnClick}
            attr={optionCount <= 1 ? { disabled: true } : ''}
            css={{
              borderBottomRightRadius: '0',
              borderTopRightRadius: '0',
            }}
          />
          <InputNumberSection>
            <Input
              type="number"
              value={optionCount}
              onChange={onOptionCountChange}
              css={{
                textAlign: 'right',
                height: '30px',
                width: '100%',
                margin: '0',
              }}
            />
          </InputNumberSection>
          <SmallWhite
            buttonText="+"
            onClickFunc={plusBtnClick}
            attr={optionCount >= maxCount ? { disabled: true } : ''}
            css={{
              borderBottomLeftRadius: '0 !important ',
              borderTopLeftRadius: '0',
            }}
          />
        </OptionInputSection>
        <PriceSection className="product-price">
          <strong className="product-price-final">
            <span className="product-price-number">
              {numberToMonetary(product.productPrice * optionCount)}
            </span>
            원
          </strong>
        </PriceSection>
      </CartOptionSection>
    </>
  );
}

const ProductSection = styled.a`
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 auto;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const ProductImageSection = styled.div`
  flex: 0 0 auto;
  text-align: center;
  margin: 10px;
`;

const ProductImage = styled.img`
  width: 70px;
`;

const ProductInfoSection = styled.div`
  flex: 1 0 0px;
  padding: 5px;
  display: flex;
`;

const ProductTitle = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    width: 100px;
  }
`;

const CartOptionSection = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const OptionInputSection = styled.div`
  display: flex;
  padding: 5px;
  text-align: center;
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
  }
`;

const InputNumberSection = styled.div`
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    max-width: 80px;
  }
`;

const PriceSection = styled.div`
  text-align: right;
  flex: 0 0 auto;
  padding: 10px;
  @media (max-width: 1024px) {
    margin-left: auto;
  }
  @media (min-width: 1024px) {
  }
`;
