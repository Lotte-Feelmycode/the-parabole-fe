import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import ProductList from '@components/product/ProductList';
import styles from '@styles/Home.module.scss';

export default function Home() {
  const productListProps = {
    size: 3,
    page: 0,
  };

  return (
    <CommerceLayout>
      <SiteHead title="Home" />

      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className={styles.section}>THE PARABOLE</h1>
          <h2 className={styles.section}>상품목록</h2>
          <ProductList {...productListProps} />
        </div>
      </section>
    </CommerceLayout>
  );
}
