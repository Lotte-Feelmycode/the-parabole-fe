import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import { useRouter } from 'next/router';

export default function ProductDetail({ id }) {
  const router = useRouter();
  // console.log(router);
  const productId = router.query.id;
  const productName = router.query.title;
  // console.log('productdetail props : ' + JSON.stringify(id));
  return (
    <CommerceLayout>
      <SiteHead title={productName} />
      <div>
        <div className="productNameTitle">
          <h1>{productName}</h1>
        </div>
        <div className="productPrice"></div>
      </div>
    </CommerceLayout>
  );
}
