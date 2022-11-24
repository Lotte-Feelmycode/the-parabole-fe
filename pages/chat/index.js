import styled from '@emotion/styled';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import MainContent from '@components/common/MainContent';
import IconList from '@components/common/IconList';
import ProductList from '@components/product/ProductList';
import ChatContainer from '@components/chat/ChatContainer';

export default function Home() {
  const productListProps = {
    size: 12,
    page: 0,
    sort: 'createdAt,desc',
  };

  return (
    <CommerceLayout>
      <SiteHead title="Home" />
      <div className="z-50 rounded p-4 h-96 w-72 bottom-20 right-10 bg-gray-100 fixed">
        <ChatContainer />
      </div>
      <div className="container px-5 py-12 mx-auto">
        <MainContent
          title="더파라볼래"
          content="셀러가 직접 등록하는 다양한 이벤트에 참여해보세요!"
        />
        <Row>
          <IconList />
        </Row>
        <Row>
          <ProductList {...productListProps} />
        </Row>
      </div>
      <div className="z-50 h-24 bg-white fixed">
        <ChatContainer />
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
