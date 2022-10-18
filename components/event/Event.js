import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { EVENT_TYPE } from '@utils/constants/types';
import { getTime, getState } from '@utils/functions';

export default function Event({ event }) {
  const router = useRouter();
  const onClick = (id) => {
    router.push({
      pathname: `/event/${id}`,
    });
  };

  return (
    <>
      <EventDiv>
        <a className="cursor-pointer" onClick={() => onClick(event.id)}>
          <div>
            <EventImage
              src={event.eventImage.eventBannerImg}
              alt={event.descript}
            />
          </div>
          <Content>
            <Left>{event.storeName}</Left>
            <Right>
              <Tags>{getState(EVENT_TYPE, event.type)}</Tags>
            </Right>
            <br />
            <br />
            <Title>{event.title}</Title>
            <Time>
              {getTime(event.startAt)} ~<br /> {getTime(event.endAt)}
            </Time>
          </Content>
        </a>
      </EventDiv>
    </>
  );
}

const EventDiv = styled.div`
  display: inline-block;
  height: 23rem;
  width: 28rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #d6d6d6;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Left = styled.div`
  font-weight: bold;
  float: left;
  margin: 0 auto;
  font-size: 1.5rem;
  color: #999;
`;

const Right = styled.div`
  font-weight: bold;
  float: right;
  margin: 0 auto;
  font-size: 1.5rem;
  color: #999;
`;

const Time = styled.div`
  margin-top: 0.5rem;
  font-size: 1rem;
`;

const EventImage = styled.img`
  width: 25rem;
  height: 10rem;
  margin: auto;
  margin-bottom: 1rem;
`;

const Tags = styled.span`
  background-color: black;
  color: #fff;
  font-size: 1rem;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 3rem;
`;
