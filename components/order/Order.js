import { useRouter } from 'next/router';

export default function Order({ order }) {
  const router = useRouter();

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
      <div>주문 상태 {order.state}</div>
      <div>결제 수단 {order.payState}</div>
    </div>
  );
}
