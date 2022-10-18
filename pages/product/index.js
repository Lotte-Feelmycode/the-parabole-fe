import SiteHead from '@components/common/SiteHead.js';
import CommerceLayout from '@components/common/CommerceLayout';
import styled from '@emotion/styled';
import ProductList from '@components/product/ProductList';

export default function Product() {
  return (
    <>
      <CommerceLayout>
        <SiteHead title="EventList" />
        <section className="flex min-h-screen flex-col text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <ProductList />
          </div>
        </section>
      </CommerceLayout>
    </>
  );
}

const H1 = styled.h1`
  font-size: 30px;
  margin-bottom: 30px;
  font-family: 'SansBold';
`;
