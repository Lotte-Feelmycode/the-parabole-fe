import styled from '@emotion/styled';
import CloseButton from '@components/input/CloseButton';
import MessageNode from '@components/chat/MessageNode';
import { GET_DATA } from '@apis/defaultApi';

import { useState } from 'react';
import SendMessageNode from './SendMessageNode';
import { isEmpty } from '@utils/functions';
import { useGetToken } from '@hooks/useGetToken';

export default function ChatContainer({ setModalState }) {
  const [sendMessage, setSendMessage] = useState("");

  const [messageList, setMessageList] = useState([]);
  const [storeList, setStoreList] = useState();
  const [productList, setProductList] = useState();
  const [couponList, setCouponList] = useState();
  const [selectStore, setSelectStore] = useState();
  const [selectProduct, setSelectProduct] = useState();
  const [selectCoupon, setSelectCoupon] = useState();

  let infoTxt = "1. 스토어\n";
  infoTxt += "2. 상품(이름으로 검색)\n";
  infoTxt += "3. 상품(스토어로 검색)\n";
  infoTxt += "4. 쿠폰(스토어로 검색)";

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

    if (isEmpty(sendMessage)) {
      alert("메시지를 입력해주세요.");
      return;
    }
    setMessageList((_chatMessages) => [..._chatMessages, "//" + sendMessage]);

    // 스토어 전체 조회
    if (sendMessage.includes("스토어")) {
      GET_DATA('/chat').then((res) => {
        setStoreList(res);

        let msg = "인기 스토어 목록입니다.";
        msg += "\n";

        res.map((item, index) => {
          msg += "🏠"
          msg += item;
          msg += "\n";
        });
        
        setMessageList((_chatMessages) => [..._chatMessages, msg]);
      });
    } else if (Array.isArray(storeList) && (storeList[0].includes(sendMessage) || storeList[1].includes(sendMessage))) {
      GET_DATA(`/chat/list?storeName=${sendMessage}`).then((res) => {
        setProductList(res);
        setSelectStore(sendMessage);

        
        let msg = sendMessage + "로 검색하신 스토어의 인기 상품 TOP3 입니다.";
        msg += "\n";

        res.map((item, index) => {
          msg += "✨"
          msg += item;
          msg += "\n";
        });
        
        setMessageList((_chatMessages) => [..._chatMessages, msg]);
      });
    } else if (selectStore && sendMessage.includes("쿠폰") && !sendMessage.includes("다운")) {
      GET_DATA(`/chat/coupon?storeName=${selectStore}`)
      .then((res) => {
        setCouponList(res);

        let msg = sendMessage + "로 검색하신 스토어의 쿠폰목록 입니다.";
        msg += "\n";

        res.map((item, index) => {
          msg += "🎈 "
          msg += item;
          msg += "\n";
        });
        
        setMessageList((_chatMessages) => [..._chatMessages, msg]);
      })
    } else if (sendMessage.includes("셀러")) {
      let msg = "📌 셀러 등록 방법";
      msg += "\n우선 더 파라볼래 회원가입을 하시고, 고객센터로 문의해주세요!";
      msg += "\n";
      msg += "\n더 파라볼래 셀러 회원 등록시 이벤트 등록, 쿠폰 등 다양한 마케팅 혜택을 체험할 수 있습니다.";
      setMessageList((_chatMessages) => [..._chatMessages, msg]);
    } else if (sendMessage.includes("쿠폰") && sendMessage.includes("다운")) {
      let msg = "🎁 쿠폰 다운로드 방법";
      msg += "\nA. 상품 상세 페이지에서 해당 스토어의 혜택을 확인할 수 있어요! ";
      msg += "\nB. 스토어 홈에서도 혜택 받기 버튼을 통해 쿠폰을 다운로드할 수 있어요!";

      msg += "\n";
      msg += "\n(다운로드 받은 쿠폰은 주문 시 적용가능합니다.)";
      setMessageList((_chatMessages) => [..._chatMessages, msg]);
    } else if (sendMessage.includes("이벤트") && sendMessage.includes("등록")) {
      let msg = "📌 이벤트 등록 방법";
      msg += "\nA. 우선 셀러로 로그인 해주세요. ";
      msg += "\nB. 셀러 오피스에서 이벤트 등록 메뉴로 진입해주세요.";
      msg += "\nC. 이벤트 정보들을 입력해주세요!";

      msg += "\n";
      msg += "\n(선착순 이벤트의 경우 기존 스케쥴이 있는지 확인 해주세요!)";
      setMessageList((_chatMessages) => [..._chatMessages, msg]);
    } else if (sendMessage.includes("주문")) {
      GET_DATA(`/chat/order`, '', useGetToken()).then((res) => {
        let msg = "";
        if (!isEmpty(res)) {
          msg = localStorage.getItem("name")+"님의 총 주문 금액은";
          msg += res
          msg += "입니다";
        } else {
          msg = localStorage.getItem("name")+"님의 주문내역이 없습니다.";
          setMessageList((_chatMessages) => [..._chatMessages, msg]);
        }
      });
    } else if (sendMessage.includes("이벤트")) {
      
      let eStatus = -1;
      if (sendMessage.includes("진행전") || sendMessage.includes("시작전")) {
        eStatus = 0;
      } else if (sendMessage.includes("진행 중") || sendMessage.includes("진행중")) {
        eStatus = 1;
      } else if (sendMessage.includes("진행 중") || sendMessage.includes("진행중")) {
        eStatus = 2;
      } 

      GET_DATA(`/event/list`,  { eventStatus: eStatus }).then((res) => {
        let msg = "";

        if (res && res.length > 0) {
          msg = "현재 진행중인 이벤트 목록입니다.";
          res.map((item, index) => {
            msg += "🎁 "
            msg += item.title;
            msg += "\n";
          });
        } else {
          msg = "현재 진행중인 이벤트가 없습니다!";
        }

        setMessageList((_chatMessages) => [..._chatMessages, msg]);
      });
    }
    else {
      let msg = "죄송해요. 질문을 이해하지 못했어요.";
      msg += "\n다시 말씀해주세요.";

      setMessageList((_chatMessages) => [..._chatMessages, msg]);
    }

    setSendMessage("");
  }

  const handleOnKeyPress = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      submitHandler(e);
    }
  };

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
        <MessageNode text="1. 스토어 2. 상품(이름으로 검색) 3. 상품(스토어로 검색) 4. 쿠폰(스토어로 검색)"/>

        {messageList && messageList.length > 0 &&
          messageList.map((message, index) => (
            message && message.startsWith("//") ? (
              <SendMessageNode text={message.split("//")[1]}/> 
            ) : (
              <MessageNode text={message}/> 
            )
          ))
        }
      </MidSection>
      <BottomSection>
        <input
          value={sendMessage}
          onKeyUp={(e) => handleOnKeyPress(e)}
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