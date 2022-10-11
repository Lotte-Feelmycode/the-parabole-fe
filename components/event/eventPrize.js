import { POST } from '@apis/defaultApi';
import styled from '@emotion/styled';
import { useEffect } from 'react';
export default function EventPrize({ eventprize }) {
  console.log('3333', eventprize);

  useEffect(() => {
    POST('/eventprize', eventprize).then((res) => {
      if (res) {
        console.log(res);
      } else {
        alert('상품을 찾을 수 없습니다. 다시 시도해주세요.');
      }
    });
  });
  return (
    <>
      <div className="event-prize">
        <div>
          <EventPrizeImg
            className="prize-img"
            src="https://contents.lotteon.com/itemimage/_v131456/LO/15/12/39/13/20/_1/51/23/91/32/1/LO1512391320_1512391321_1.jpg/dims/resizef/554X554"
            alt="3900 티타늄 드라이기 KC인증 2000W "
          />
        </div>
        <div className="prize-body">
          <div>
            <div className="prize-name">{eventprize}</div>
          </div>
          <div>
            <div className="prize-stock">{eventprize}</div>
          </div>
        </div>
      </div>
    </>
  );
}

const EventPrizeImg = styled.img`
  width: 200px;
`;
