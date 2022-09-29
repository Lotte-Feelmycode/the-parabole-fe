import { GET, POST, PATCH, DELETE } from '@apis/defaultApi'; // GET, POST, PATCH, DELETE 메소드 임포트
import { useInput } from '@hooks/useInput'; // 커스텀 훅 임포트
import { USER_ERROR } from '@utils/constants/errors'; // 사용자 에러 메시지 상수 임포트

export default function TestPage() {
  // GET METHOD 사용하기
  /* param 없는 경우 */
  const events = GET(`/events`, {});
  console.log(events);

  /* PathVariable 사용시 */
  const eventId = '1';
  const event = GET(`/events/${eventId}`, {});
  console.log(event);

  /* RequestParam 사용 */
  const productParam = {
    sellerId: 1,
    category: 'FOOD',
    productName: '순대',
  };
  const products = GET('/product', productParam);
  console.log(products);

  // POST METHOD 사용하기
  const EventCreateRequestDto = {
    sellerId: 1,
    createdBy: 'SELLER',
    type: 'RAFFLE',
    title: 'React test event',
    descript: '리액트에서 테스트',
    eventImage: {
      eventBannerImg: 'eventBannerImg.url',
      eventDetailImg: 'eventDetailImg.url',
    },
    eventPrizeCreateRequestDtos: [{ id: 1, type: 'PRODUCT', stock: 30 }],
  };
  POST('/event', EventCreateRequestDto);

  // DELETE METHOD 사용하기
  DELETE('/event/10', {});

  return (
    <>
      <h1>api test</h1>
    </>
  );
}
