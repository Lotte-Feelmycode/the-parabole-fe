import { ICON_CHECK } from '@utils/constants/icons';

export default function StatusSummary({ eventList }) {
  function getCnt(status) {
    if (status === 0) {
      return eventList.filter((e) => 0 === e.status).length;
    } else if (status === 1) {
      return eventList.filter((e) => 1 === e.status).length;
    } else {
      return eventList.filter((e) => 2 === e.status).length;
    }
  }

  return (
    <div className="mt-4 mb-2 bg-gray-50 h-20 grid grid-cols-3 gap-2 px-10 justify-items-center justify-center align-center place-content-center">
      <div className="flex flex-row self-center justify-items-stretch">
        <img src={ICON_CHECK} className="mr-2" />
        <div className="text-gray-800 text-base mr-2">시작 전</div>
        <div className="text-gray-900 font-bold mr-2 text-base">
          {getCnt(0)}
        </div>
        <div className="text-gray-800 text-base">개</div>
      </div>
      <div className="flex flex-row self-center justify-items-stretch">
        <img src={ICON_CHECK} className="mr-2" />
        <div className="text-gray-800 text-base mr-2">진행 중</div>
        <div className="text-gray-900 font-bold mr-2 text-base">
          {getCnt(1)}
        </div>
        <div className="text-gray-800 text-base">개</div>
      </div>
      <div className="flex flex-row self-center justify-items-stretch">
        <img src={ICON_CHECK} className="mr-2" />
        <div className="text-gray-800 text-base mr-2">종료</div>
        <div className="text-gray-900 font-bold mr-2 text-base">
          {getCnt(2)}
        </div>
        <div className="text-gray-800 text-base">개</div>
      </div>
    </div>
  );
}
