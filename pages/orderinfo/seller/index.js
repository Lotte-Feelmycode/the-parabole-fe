import SellerLayout from '@components/seller/SellerLayout';
import SiteHead from '@components/common/SiteHead.js';
import OrderList from '@components/order/OrderList';

export default function Home() {
  return (
    <SellerLayout>
      <SiteHead title="OrderListHome" />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1>THE PARABOLE SELLER OFFICE</h1>
          {/* TODO: sellerId는 로그인한 판매자의 userId를 받아와야 함 */}
          <OrderList sellerId={2} />
        </div>
      </section>
    </SellerLayout>
  );
}
