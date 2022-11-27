import styled from '@emotion/styled';
import CloseButton from '@components/input/CloseButton';
import MessageNode from '@components/chat/MessageNode';
import { GET_DATA } from '@apis/defaultApi';

import { useState } from 'react';

export default function ChatContainer({ setModalState }) {
  const [sendMessage, setSendMessage] = useState("");

  const [messageList, setMessageList] = useState([]);
  const [storeList, setStoreList] = useState();
  const [productList, setProductList] = useState();
  const [couponList, setCouponList] = useState();
  const [selectStore, setSelectStore] = useState();
  const [selectProduct, setSelectProduct] = useState();
  const [selectCoupon, setSelectCoupon] = useState();

  const closeModal = (e) => {
    e.preventDefault();
    setModalState(false);
  };

  const changeSendMsgHandler = (e) => {
    e.preventDefault();
    setSendMessage(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (sendMessage.includes("스토어")) {
      GET_DATA('/chat').then((res) => {
        setStoreList(res);

        let msg = res.toString();
        setMessageList((_chatMessages) => [..._chatMessages, msg]);
      });
    }

    if (Array.isArray(storeList) && (sendMessage.includes(storeList[0]) || sendMessage.includes(storeList[1]) || sendMessage.includes(storeList[2]))) {
      GET_DATA(`/list?storeName=${sendMessage}`).then((res) => {
        setProductList(res);

        let msg = res.toString();
        setMessageList((_chatMessages) => [..._chatMessages, msg]);
      });
    }

    if (Array.isArray(storeList) && (sendMessage.includes(storeList[0]) || sendMessage.includes(storeList[1]) || sendMessage.includes(storeList[2]))) {
      selectStore(sendMessage);
      GET_DATA(`/list?storeName=${sendMessage}`).then((res) => {
        setProductList(res);

        let msg = res.toString();
        setMessageList((_chatMessages) => [..._chatMessages, msg]);
      });
    }

    if (selectStore && sendMessage.includes("쿠폰")) {
      GET_DATA(`/coupon?storeName=${selectStore}`).then((res) => {
        setCouponList(res);

        let msg = res.toString();
        setMessageList((_chatMessages) => [..._chatMessages, msg]);
      });
    }

    setSendMessage("");
  }
  return (
    <ModalContainer>
      <TopSection className="top-section">
        <div className="p-1 flex flex-row align-center">
          <img src="/parabole.svg" className="w-6 mr-2" />
          <p>The Parabole</p>
        </div>
        <CloseButtonSection>
          <a onClick={closeModal}>
            <CloseButton />
          </a>
        </CloseButtonSection>
      </TopSection>
      <MidSection className="overflow-y-auto">
        <MessageNode text="방문해주셔서 감사합니다 :) 어떻게 도와드릴까요?"/>
        <MessageNode text="u1-s1's store , u4-s2's store"/>

        {messageList && messageList.length > 0 &&
          messageList.map((message, index) => (
            <MessageNode text={message}/>
          ))
        }
      </MidSection>
      <BottomSection>
        <input
          value={sendMessage}
          onChange={changeSendMsgHandler}
          className="block h-10 mx-2 p-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
          placeholder="채팅을 입력하세요"/>
          <button onClick={submitHandler} type="submit" className="inline-flex justify-center p-2 max-h-10 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100">
          <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
          <span className="sr-only">채팅을 입력하세요</span>
        </button>
      </BottomSection>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  z-index: 999;

  position: fixed;
  bottom: 1rem;
  right: 1rem;
  /* transform: translate(-50%, -50%); */

  background-color: white;
  border: 0px;
  border-radius: 20px;

  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 300px;
  height: 600px;
`;
const TopSection = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`;

const CloseButtonSection = styled.div`
  padding-top: 5px;
  text-align: right;
`;

const MidSection = styled.div`
  padding: 5px 15px;
  height: 80%;
`;

const BottomSection = styled.div`
  padding: 5px 15px;
  height: 80%;
  border-style: solid 1px gray;

  display: flex;
  flex-direction: row;
`;


const Node = styled.div`

`