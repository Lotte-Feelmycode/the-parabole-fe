import styled from '@emotion/styled';
import { useRouter } from 'next/router';

export default function Order({ order }) {
  const router = useRouter();

  const onClick = (id) => {
    router.push({});
  };

  return (
    <div>
      <div>{order.productThumbnailImg}</div>
      <div>
        <div>{order.userEmail}</div>
      </div>
      <div>
        <div>{order.productName}</div>
        <div>
          {order.productDiscountPrice} | {order.productPrice}
        </div>
      </div>
      <div>
        {order.productCnt} | {order.productRemain}
      </div>
    </div>
  );
}
