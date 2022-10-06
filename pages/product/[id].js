import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { GET } from '@apis/defaultApi';
import { numberToMonetary } from '@utils/moneyUtil';

export default function ProductDetail() {
  const router = useRouter();
  const [productId, setProductId] = useState(router.query.id);
  const [product, setProduct] = useState({});
  const [productDetail, setProductDetail] = useState([]);
  const [seller, setSeller] = useState({});

  useEffect(() => {
    const productId = router.query.id;
    if (productId) setProductId(productId);
    GET(`/product`, { productId: productId }).then((res) => {
      if (res && res.product) {
        setProduct(res.product);
        setProductDetail(res.productDetail);
        setSeller(res.seller);
      }
    });
  }, [router.query]);

  return (
    <CommerceLayout>
      <SiteHead title={product.productName} />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="page-info">상품 상세 화면</h1>
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
                  <h1>{product.productName}</h1>
                </div>
                <div className="product-price">
                  <span>{numberToMonetary(product.productPrice)}</span>원
                </div>
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
  padding 14px 0 0;
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

const DetailLayout = styled.div`
  padding: 20px 24px;
`;

const ProductThumbnailImg = styled.img`
  width: 100%;
`;
const ProductDetailImage = styled.img`
  width: 100%;
`;
