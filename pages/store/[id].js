import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductList from '@components/product/ProductList';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';

export default function store() {
  const router = useRouter();

  const [productListProps, setProductListProps] = useState({
    size: 12,
    page: 0,
    sellerId: router.query.id,
    sort: 'createdAt,desc',
  });

  useEffect(() => {
    setProductListProps({
      size: 12,
      page: 0,
      sellerId: router.query.id,
      sort: 'createdAt,desc',
    });
  }, [router.query]);

  return (
    <CommerceLayout>
      <SiteHead title="판매자 페이지" />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div>
            <ProductList {...productListProps} />
          </div>
        </div>
      </section>
    </CommerceLayout>
  );
}
