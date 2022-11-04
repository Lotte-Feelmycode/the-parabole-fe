import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductList from '@components/product/ProductList';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import GoToChatBtn from '@components/chat/user/GoToChatBtn';
import OneToOneChat from '@components/chat/user/OneToOneChat';
import { GET_DATA } from '@apis/defaultApi';

export default function store() {
  const router = useRouter();

  const [productListProps, setProductListProps] = useState({
    size: 12,
    page: 0,
    sellerId: router.query.id,
  });
  const [chatStatus, setChatStatus] = useState(false);
  const [seller, setSeller] = useState({});

  const openChat = () => {
    setChatStatus(true);
  };

  const closeChat = () => {
    setChatStatus(false);
  };

  useEffect(() => {
    setProductListProps({
      size: 12,
      page: 0,
      sellerId: router.query.id,
    });

    GET_DATA(`/seller`, { sellerId: router.query.id }).then((res) => {
      if (res) {
        console.log(res);
        setSeller(res);
      }
    });
  }, [router.query]);

  return (
    <CommerceLayout>
      <SiteHead title="판매자 페이지" />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div></div>
          <div>
            <ProductList {...productListProps} />
          </div>
          <div>
            <GoToChatBtn buttonText="문의" openChatFunction={openChat} />
          </div>
          <div>
            {chatStatus && (
              <OneToOneChat closeChatFunction={closeChat} seller={seller} />
            )}
          </div>
        </div>
      </section>
    </CommerceLayout>
  );
}
