import CommerceHeader from '@components/common/CommerceHeader';
import Footer from '@components/common/Footer';

export default function CommerceLayout({ children }) {
  return (
    <>
      <CommerceHeader />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div>{children}</div>
        </div>
      </section>
      <Footer />
    </>
  );
}
