import CommerceLayout from '@components/common/CommerceLayout';
import { useState } from 'react';
import UserOrderList from '@components/order/UserOrderList';
import EventApplyList from '@components/user/EventApplyList';
import MyProfile from '@components/user/MyProfile';

export default function () {
  // TODO: userId 집어넣기
  const userId = 3;

  const [nowState, setNowState] = useState(0);
  const mypageStateList = ['나의 주문', '나의 이벤트', '나의 프로필'];

  function showMypageMainComp(input) {
    if (input === 0) {
      return (
        <div>
          <UserOrderList userId={userId} />
        </div>
      );
    } else if (input === 1) {
      return <EventApplyList />;
    } else if (input === 2) {
      return (
        <div>
          <MyProfile userId={userId}></MyProfile>
        </div>
      );
    }
  }

  return (
    <CommerceLayout>
      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center border-b bg-gray-100">
        <ul className="list-none text-center whitespace-nowrap">
          {mypageStateList.map((state, index) => (
            <li className="float-left">
              <a
                key={index}
                onClick={() => {
                  setNowState(index);
                }}
                className="flex title-font text-lg font-semibold items-center p-5 text-gray-900 mb-4 md:mb-0 cursor-pointer"
              >
                {nowState === index && (
                  <span className="ml-3 text-l text-blue-500">{state}</span>
                )}
                {nowState !== index && (
                  <span className="ml-3 text-l hover:text-blue-500">
                    {state}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div>{showMypageMainComp(nowState)}</div>
    </CommerceLayout>
  );
}
