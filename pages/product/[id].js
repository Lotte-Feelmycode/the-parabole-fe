import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { GET_DATA, POST } from '@apis/defaultApi';
import { useGetToken } from '@hooks/useGetToken';
import { numberToMonetary } from '@utils/functions';
import { ThemeGray4 } from '@utils/constants/themeColor';
import { LINKS } from '@utils/constants/links';
import { ICON_SHOP } from '@utils/constants/icons';
import { NO_IMAGE } from '@utils/constants/images';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import { SmallLineWhite, LineBlue, Blue } from '@components/input/Button';
import Input from '@components/input/Input';
import CouponListModal from '@components/coupon/StoreCouponListModal';

export default function ProductDetail() {
  const router = useRouter();

  const [productId, setProductId] = useState(router.query.id);
  const [product, setProduct] = useState({});
  const [productDetail, setProductDetail] = useState([]);
  const [seller, setSeller] = useState('');
  const [count, setCount] = useState(1);
  const [modalState, setModalState] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const [maxCount, setMaxCount] = useState(100);
  const minCount = 0;

  useEffect(() => {
    const productId = router.query.id;
    if (productId) setProductId(productId);
    GET_DATA(`/product`, { productId: productId }).then((res) => {
      if (res && res.product) {
        setProduct(res.product);
        setProductDetail(res.productDetail);
        setSeller(res.storeName);
        setMaxCount(
          res.product.productRemains < 100 ? res.product.productRemains : 100,
        );
      }
    });
  }, [router.query]);

  function goToStore(storeId) {
    if (storeId) {
      router.push({ pathname: `/store/${storeId}` });
    }
  }

  function showBenefitModal(e, storeId) {
    e.preventDefault();

    setModalState(true);
    GET_DATA(`/coupon/store`, { sellerId: storeId }).then((res) => {
      if (res) {
        setCoupons(res.content);
      }
    });
  }

  function isCountValid() {
    if (count > maxCount || count < minCount) {
      setCount(1);
      alert('담을 수 있는 수를 초과했습니다.');
      return false;
    }
    return true;
  }

  function addCart() {
    let headers;
    if (!isCountValid()) {
      return;
    } else if (count <= 0) {
      alert('수량을 입력해주세요');
      return;
    } else {
      if (typeof window !== 'undefined' && typeof window !== undefined) {
        if (localStorage.getItem('userId') === null) {
          alert('로그인 해주세요.');
          router.push(LINKS.SIGNIN);
        }
      }
      headers = useGetToken();

      POST(
        `/cart/product/add`,
        {
          productId: productId,
          cnt: count,
        },
        headers,
      ).then((res) => {
        if (res) {
          if (res.success) {
            const confirmMsg =
              '장바구니에 성공적으로 담겼습니다. 장바구니페이지로 이동하시겠습니까?';
            const confirmFlag = confirm(confirmMsg);
            if (confirmFlag) {
              router.push(LINKS.CART);
            }
          } else {
            alert(res.data.message);
          }
        } else {
          // TODO 장바구니 실패했을때 경우의 수 추가
          alert('이미 추가된 상품입니다.');
        }
      });
    }
  }

  function directOrder() {
    let headers;
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push(LINKS.SIGNIN);
      }
    }
    headers = useGetToken();

    const orderInfoDto = [{ productId: productId, productCnt: count }];
    POST(
      `/orderinfo`,
      {
        orderInfoDto: orderInfoDto,
      },
      headers,
    ).then((res) => {
      if (res && res.success) {
        router.push(`/user/order`);
      }
    });
  }

  useEffect(() => {
    countCheck(count);
  }, [count]);

  const onCountChange = (e) => {
    countCheck(e.target.value);
  };

  const countCheck = (number) => {
    let num = number;
    if (num > maxCount) num = maxCount;
    if (num < minCount) num = minCount;
    setCount(num);
  };

  return (
    <CommerceLayout>
      <SiteHead
        title={product.productName}
        url={`https://theparabole.shop/${productId}`}
      />
      <ProductWrap>
        <ProductTopSection className="product-top-section">
          <ProductThumbnailImgSection className="product-thumbnail-img-section">
            <ProductThumbnailImg
              className="product-thumbnail-img"
              src={product.productThumbnailImg || NO_IMAGE}
            />
          </ProductThumbnailImgSection>
          <ProductDetailTop className="product-detail-top">
            <div className="product-name-title max-w-2xl overflow-ellipsis">
              <ProductName>{product.productName}</ProductName>
            </div>
            <div className="product-price border-b-2 pb-4">
              <ProductPrice>
                {numberToMonetary(product.productPrice)}
              </ProductPrice>
              원
            </div>
            <StoreSection onClick={() => goToStore(product.sellerId)}>
              <StoreNameSection>
                <img
                  src={ICON_SHOP}
                  loading="lazy"
                  className="w-7 h-7 mx-2 object-cover object-center"
                />
                <span className="text-lg"> {seller} </span>
              </StoreNameSection>
              <StoreBtnSection>
                <SmallLineWhite buttonText="브랜드홈 ▶" />
              </StoreBtnSection>
            </StoreSection>
            <div className="flex border-t-2 py-2">
              <LineBlue
                buttonText="스토어 혜택을 받아보세요!"
                onClickFunc={(e) => showBenefitModal(e, product.sellerId)}
                css={{ width: '100%', fontWeight: 'bold' }}
              />
            </div>
            <div>
              {modalState && (
                <CouponListModal
                  setModalState={setModalState}
                  couponList={coupons}
                  storeName={seller}
                />
              )}
            </div>
            <InputSection>
              <ProductCountSection>
                <Input
                  type="number"
                  onChange={onCountChange}
                  value={count}
                  attr={{
                    min: minCount,
                    max: maxCount,
                  }}
                  css={{
                    width: '100%',
                    height: '40px',
                    fontSize: '20px',
                    border: '0px',
                  }}
                />
              </ProductCountSection>
              <TotalInputSection>
                <TotalPrice>
                  {numberToMonetary(count * product.productPrice) || 0}
                </TotalPrice>
                원
              </TotalInputSection>
            </InputSection>
            <BtnSection>
              <LineBlue
                buttonText="장바구니"
                onClickFunc={addCart}
                css={{ width: '49%', marginRight: '1%' }}
              />
              <Blue
                buttonText="바로구매"
                onClickFunc={directOrder}
                css={{ width: '49%', marginLeft: '1%' }}
              />
            </BtnSection>
          </ProductDetailTop>
        </ProductTopSection>
        <DetailLayout>
          <ul>
            {productDetail &&
              productDetail.map((detail) => (
                <li key={detail.productDetailId}>
                  <ProductDetailImage
                    className="product-detail-img"
                    src={detail.img || NO_IMAGE}
                  />
                  <span>{detail.imgCaption}</span>
                </li>
              ))}
          </ul>
        </DetailLayout>
      </ProductWrap>
    </CommerceLayout>
  );
}

const ProductLayout = styled.div`
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  margin: auto;
`;

const ProductWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 14px 0 0;
`;

const ProductName = styled.span`
  font-weight: 500;
  text-overflow: elipsis;
  @media (min-width: 768px) {
    font-size: 36px;
  }
  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const ProductTopSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 90px;
  width: 100%;
`;

const ProductThumbnailImgSection = styled.div`
  overflow: hidden;
  @media (min-width: 768px) {
    width: 49%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductThumbnailImg = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ProductDetailTop = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  flex-wrap: nowrap;
  flex: 1 1 auto;
  @media (min-width: 768px) {
    margin-left: 2%;
    width: 48%;
  }
  @media (max-width: 768px) {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }
`;

const ProductPrice = styled.span`
  font-weight: 900;
  margin-right: 4px;
  @media (min-width: 768px) {
    font-size: 30px;
  }
  @media (max-width: 768px) {
    font-size: 23px;
  }
`;

const StoreSection = styled.a`
  display: flex;
  margin: 20px 0px;

  @media (min-width: 768px) {
    align-items: center;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StoreNameSection = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: center;
  @media (min-width: 768px) {
  }
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const StoreBtnSection = styled.div`
  @media (min-width: 768px) {
    margin-left: auto;
  }
  @media (max-width: 768px) {
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const InputSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0;
  padding: 10px;
  background-color: ${ThemeGray4};
  border-radius: 0.25rem;
`;

const ProductCountSection = styled.div`
  flex: 1 1 100%;
  max-width: 100%;
`;

const TotalInputSection = styled.div`
  flex: 1 1 100%;
  margin-left: auto;
  text-align: end;
`;

const TotalPrice = styled.span`
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
`;

const BtnSection = styled.div`
  margin: 10px 0px;
  text-align: center;
`;

const DetailLayout = styled.div`
  @media (min-width: 768px) {
    padding: 20px 24px;
  }
`;

const ProductDetailImage = styled.img`
  width: 100%;
`;
