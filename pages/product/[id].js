import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import { useRouter } from 'next/router';
import styles from '@styles/Home.module.scss';
import { useState, useEffect } from 'react';
import { GET } from '@apis/defaultApi';

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
      if (res.product) {
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
          <h1 className={styles.section}>상품 상세 화면</h1>
          <div>
            <div className="productNameTitle">
              <h1>{product.productName}</h1>
            </div>
            <div className="productPrice">
              <span>{product.productPrice}</span>원
            </div>
            <div className="productDetailImg">
              <ul>
                {productDetail &&
                  productDetail.map((detail) => (
                    <li key={detail.productDetailId}>
                      <span>{detail.imgCaption}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </CommerceLayout>
  );
}
