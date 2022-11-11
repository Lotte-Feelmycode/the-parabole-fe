import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { GET_DATA, POST } from '@apis/defaultApi';
import { numberToMonetary } from '@utils/functions';
import * as color from '@utils/constants/themeColor';
import { SmallLineWhite, LineBlue, Blue } from '@components/input/Button';
import Input from '@components/input/Input';
import { ICON_SHOP } from '@utils/constants/icons';
import CouponListModal from '@components/coupon/CouponListModal';
import { useGetToken } from '@hooks/useGetToken';

export default function ProductDetail() {
  // TODO : userID
  const userId = 3;

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

  const [headers, setHeaders] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push('/signin');
      }
    }
    setHeaders(useGetToken());
  }, []);

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
    // seller header없이 셀러아이디로 받는 api 필요
    GET_DATA(`/coupon/seller/list`, '', headers).then((res) => {
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
    if (!isCountValid()) {
      return;
    } else if (count <= 0) {
      alert('수량을 입력해주세요');
      return;
    } else {
      POST(`/cart/product/add`, {
        userId: userId,
        productId: productId,
        cnt: count,
      }).then((res) => {
        if (res) {
          if (res.success) {
            const confirmMsg =
              '장바구니에 성공적으로 담겼습니다. 장바구니페이지로 이동하시겠습니까?';
            const confirmFlag = confirm(confirmMsg);
            if (confirmFlag) {
              router.push({ pathname: `/user/cart` });
            }
          } else {
            console.log(res);
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
    const orderInfoDto = [{ productId: productId, productCnt: count }];
    POST(`/orderinfo`, {
      userId: userId,
      orderInfoDto: orderInfoDto,
    }).then((res) => {
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
      <SiteHead title={product.productName} />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {/* <span>상품 상세 화면</span> */}
          <ProductWrap>
            <ProductTopSection className="product-top-section">
              <ProductThumbnailImgSection className="product-thumbnail-img-section">
                <ProductThumbnailImg
                  className="product-thumbnail-img"
                  src={product.productThumbnailImg}
                />
              </ProductThumbnailImgSection>
              <ProductDetailTop className="product-detail-top">
                <div className="product-name-title">
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
                  <StoreBenfitBox
                    onClick={(e) => showBenefitModal(e, product.sellerId)}
                  >
                    <div className="align-baseline">
                      <p className="align-middle font-3xl text-black-800 font-semibold text-center">
                        스토어 혜택을 받아보세요!
                      </p>
                    </div>
                  </StoreBenfitBox>
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
                        src={detail.img}
                      />
                      <span>{detail.imgCaption}</span>
                    </li>
                  ))}
              </ul>
            </DetailLayout>
          </ProductWrap>
        </div>
      </section>
    </CommerceLayout>
  );
}

const ProductWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 14px 0 0;
`;

const ProductName = styled.span`
  font-size: 36px;
  font-weight: 500;
  margin-right: 36px;
  text-overflow: ellipsis;
`;

const ProductTopSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 90px;
  width: 100%;
`;

const ProductThumbnailImgSection = styled.div`
  margin: 10px 10px 10px 0;
  max-width: 100%;
  min-width: 300px;

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductDetailTop = styled.div`
  max-width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex: 1 1 auto;
  margin: 20px;
`;

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 900;
  margin-right: 4px;
`;

const StoreSection = styled.a`
  display: flex;
  align-items: center;
  margin: 20px 0px;
`;
const StoreNameSection = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: center;
`;

const StoreBtnSection = styled.div`
  margin-left: auto;
`;

const StoreBenfitBox = styled.div`
  background-color: ${color.ThemeBlueWhite};
  border-radius: 0.375rem;
  width: 100%;
  height: 3rem;

  &:hover {
    background-color: ${color.ColorBlue2};
    cursor: pointer;
  }
`;

const InputSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0;
  padding: 10px;
  background-color: ${color.ThemeGray5};

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
  padding: 20px 24px;
`;

const ProductThumbnailImg = styled.img`
  width: 100%;
`;
const ProductDetailImage = styled.img`
  width: 100%;
`;
