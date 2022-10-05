import styled from '@emotion/styled';
import { useRouter } from 'next/router';

export default function Event({ event }) {
  console.log('EVENT');
  const router = useRouter();
  const onClick = (id) => {
    router.push({
      pathname: `/event/seller/${id}`,
      query: {},
    });
  };
  const getTime = (str) => {
    const getDate = str.split('T')[0];
    const date =
      str.split('T')[0].split('-')[0] +
      '년 ' +
      getDate.split('-')[1] +
      '월 ' +
      getDate.split('-')[2] +
      '일 ';
    const getTime = str.split('T')[1];
    let time = getTime.split(':')[0];
    if (time >= 13) time = '오후 ' + (time - 12) + '시 ';
    else time = '오전 ' + time + '시 ';
    time += getTime.split(':')[1] + '분 ';
    return date + time;
  };
  return (
    <>
      <div className="event">
        <a onClick={() => onClick(event.id)}>
          <div>
            <EventImage
              src={event.eventImage.eventBannerImg}
              alt={event.descript}
            />
          </div>
          <div>
            <p>
              {event.type} | {event.title}
            </p>
            <p>
              {getTime(event.startAt)} ~ {getTime(event.endAt)}
            </p>
          </div>
        </a>
      </div>
    </>
  );
}

const EventImage = styled.img`
  width: 400px;
`;
