import SellerHeader from '@components/seller/SellerHeader';
import SiteHead from '@components/common/SiteHead';
import Footer from '@components/common/Footer';

export default function SellerLayout({ children }) {
  return (
    <>
      <SellerHeader />
      <SiteHead title={'Seller Office'} />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div>{children}</div>
        </div>
      </section>
      <Footer />
    </>
  );
}
