import CommerceLayout from '@components/common/CommerceLayout';
import { useState } from 'react';
import UserOrderList from '@components/order/UserOrderList';
import EventApplyList from '@components/user/EventApplyList';
import MyProfile from '@components/user/MyProfile';

export default function () {
  // TODO: userId 집어넣기
  const userId = 1;

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
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        {mypageStateList.map((state, index) => (
          <a
            key={index}
            onClick={() => {
              setNowState(index);
            }}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-l">{state}</span>
          </a>
        ))}
      </nav>
      <div>{showMypageMainComp(nowState)}</div>
    </CommerceLayout>
  );
}
