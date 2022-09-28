import SellerHeader from '@components/seller/SellerHeader';
import Footer from '@components/common/Footer';

export default function SellerLayout({ children }) {
  return (
    <>
      <SellerHeader />
      <div>{children}</div>
      <Footer />
    </>
  );
}
