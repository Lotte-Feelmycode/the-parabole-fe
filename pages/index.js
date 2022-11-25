import styled from '@emotion/styled';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import MainContent from '@components/common/MainContent';
import IconList from '@components/common/IconList';
import ProductList from '@components/product/ProductList';
import ChatContainer from '@components/chat/ChatContainer';
import { useState } from 'react';

export default function Home() {
  const [modalState, setModalState] = useState(false);

  const productListProps = {
    size: 12,
    page: 0,
    sort: 'createdAt,desc',
  };

  const buttonHandler = (e) => {
    e.preventDefault();
    setModalState(true);
  };

  return (
    <CommerceLayout>
      <SiteHead title="Home" />
      <div>{modalState && <ChatContainer setModalState={setModalState} />}</div>
      <div>
        <button
          onClick={buttonHandler}
          title="Contact Sale"
          className="fixed z-90 bottom-10 right-8 bg-blue-600 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
        >
          &#9993;
        </button>
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
