import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import ProductList from '@components/product/ProductList';

export default function Home() {
  const productListProps = {
    size: 10,
    page: 1,
  };

  return (
    <CommerceLayout>
      <SiteHead title={'Home'} />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1>THE PARABOLE</h1>
          <ProductList {...productListProps} />
        </div>
      </section>
    </CommerceLayout>
  );
}
