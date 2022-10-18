import styled from '@emotion/styled';

import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';

import MainContent from '@components/common/MainContent';
import IconList from '@components/common/IconList';
import ProductList from '@components/product/ProductList';

export default function Home() {
  const productListProps = {
    size: 6,
    page: 0,
  };

  return (
    <CommerceLayout>
      <SiteHead title="Home" />
        <div className="container px-5 py-12 mx-auto">
          <MainContent title="파라볼래" content="셀러가 직접 등록하는 다양한 이벤트에 참여해보세요!"/>
          <Row>
            <IconList></IconList>
          </Row>
          <Row>
            <ProductList {...productListProps} />
          </Row>
        </div>
    </CommerceLayout>
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
