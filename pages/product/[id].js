import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { GET } from '@apis/defaultApi';
import { numberToMonetary } from '@utils/moneyUtil';
import * as btn from '@components/input/Button';
import * as color from '@utils/constants/themeColor';
import Input from '@components/input/Input';
import useInput from '@hooks/useInput';

export default function ProductDetail() {
  const router = useRouter();
  const [productId, setProductId] = useState(router.query.id);
  const [product, setProduct] = useState({});
  const [productDetail, setProductDetail] = useState([]);
  const [seller, setSeller] = useState('');
  const [count, setCount] = useInput(1);

  useEffect(() => {
    const productId = router.query.id;
    if (productId) setProductId(productId);
    GET(`/product`, { productId: productId }).then((res) => {
      if (res && res.product) {
        setProduct(res.product);
        setProductDetail(res.productDetail);
        setSeller(res.storeName);
      }
    });
  }, [router.query]);

  function goToStore(storeId) {
    if (storeId) {
      router.push({
        pathname: `/store/${storeId}`,
      });
    }
  }

  const maxCount = product.productRemains < 100 ? product.productRemains : 100;

  return (
    <CommerceLayout>
      <SiteHead title={product.productName} />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <span>상품 상세 화면</span>
          <ProductWrap>
            <ProductTopSection>
              <ProductThumbnailImgSection>
                <ProductThumbnailImg
                  className="product-thumbnail-img"
                  src={product.productThumbnailImg}
                />
              </ProductThumbnailImgSection>
              <ProductDetailTop>
                <div className="product-name-title">
                  <ProductName>{product.productName}</ProductName>
                </div>
                <div className="product-price">
                  <ProductPrice>
                    {numberToMonetary(product.productPrice)}
                  </ProductPrice>
                  원
                </div>
                <StoreSection onClick={() => goToStore(product.sellerId)}>
                  <StoreNameSection>
                    <span> {seller} </span>
                  </StoreNameSection>
                  <StoreBtnSection>
                    <btn.SmallLineWhite buttonText="브랜드홈 ▶" />
                  </StoreBtnSection>
                </StoreSection>
                <InputSection>
                  <ProductCountSection>
                    <Input
                      type="number"
                      onChange={setCount}
                      value={count}
                      css={{
                        min: 0,
                        max: maxCount,
                        width: '100%',
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
                  <btn.LineBlue
                    buttonText="장바구니"
                    css={{ width: '49%', 'margin-right': '1%' }}
                  />
                  <btn.Blue
                    buttonText="바로구매"
                    css={{ width: '49%', 'margin-left': '1%' }}
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
  font-size: 22px;
  font-weight: 400;
  margin-right: 36px;
`;

const ProductTopSection = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 90px;
  width: 100%;
`;

const ProductThumbnailImgSection = styled.div`
  position: relative;
  float: left;
  margin: 10px 10px 10px 0;
  width: 45%;
`;

const ProductDetailTop = styled.div`
  position: relative;
  float: right;
  width: 45%;
`;

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 900;
  margin-right: 4px;
`;

const StoreSection = styled.a`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`;
const StoreNameSection = styled.div`
  flex: none;
  vertical-align: center;
`;

const StoreBtnSection = styled.div`
  margin-left: auto;
`;

const InputSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0;
  padding: 10px;
  background-color: ${color.ThemeGray2};
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
