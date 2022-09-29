import SellerLayout from '@components/seller/SellerLayout';
import SiteHead from '@components/common/SiteHead.js';

export default function Home() {
  return (
    <SellerLayout>
      <SiteHead title={'Seller Office'} />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1>THE PARABOLE SELLER OFFICE</h1>
        </div>
      </section>
    </SellerLayout>
  );
}
