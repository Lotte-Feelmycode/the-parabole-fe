import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import ProductList from '@components/product/ProductList';
import styles from '@styles/Home.module.scss';

export default function Home() {
  const productListProps = {
    size: 6,
    page: 0,
  };

  return (
    <CommerceLayout>
      <SiteHead title="Home" />
      <h1 className={styles.section}>THE PARABOLE</h1>
      <h2 className={styles.section}>상품목록</h2>
      <ProductList {...productListProps} />
    </CommerceLayout>
  );
}
