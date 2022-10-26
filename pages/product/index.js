import styled from '@emotion/styled';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import { useRouter } from 'next/router';
import ProductList from '@components/product/ProductList';
import CustomSwiper from '@components/common/CustomSwiper';

export default function Products({}) {
  const router = useRouter();
  const inputSearchValue = router.query.searchValue;
  const productListProps = {
    size: 12,
    page: 0,
    productName: inputSearchValue,
  };

  return (
    <>
      <CommerceLayout>
        <SiteHead title="Home" />
        <div className="container py-12">
          <CustomSwiper />
          <Row>
            <ProductList {...productListProps} />
          </Row>
        </div>
      </CommerceLayout>
    </>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-right: -10px;
  margin-left: -10px;
  align-items: stretch;
  margin-bottom: 40px;
`;
