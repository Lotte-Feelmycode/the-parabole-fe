import styled from '@emotion/styled';
import { getTime } from '@utils/functions';

export default function Event({ event }) {
  console.log('EVENT');

  return (
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
  );
}

const EventImage = styled.img`
  width: 400px;
`;
