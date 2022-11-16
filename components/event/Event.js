import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { EVENT_TYPE } from '@utils/constants/types';
import { getDateTime, getState } from '@utils/functions';
import { NO_IMAGE } from '@utils/constants/images';

import {
  ThemeGray4,
  ThemeGray1,
  ThemeWhite,
  ThemeBlack,
  MainBlue,
} from '@utils/constants/themeColor';

export default function Event({ event }) {
  const router = useRouter();
  const goToEventDetail = (id) => {
    router.push({
      pathname: `/event/${id}`,
    });
  };

  return (
    <EventSection>
      <a className="cursor-pointer" onClick={() => goToEventDetail(event.id)}>
        <ImgSection className="img-section">
          <EventImage
            src={event.eventImage.eventBannerImg || NO_IMAGE}
            alt={event.descript}
          />
        </ImgSection>
        <ContentSection className="content-section">
          <TitleSection className="title-section">{event.title}</TitleSection>
          <TypeSection className="type-section">
            <StoreNameSection>{event.storeName}</StoreNameSection>
            <Tags>{getState(EVENT_TYPE, event.type)}</Tags>
          </TypeSection>
          <TimeSection className="time-section">
            {getDateTime(event.startAt)}
            <br />
            {' ~ '}
            {getDateTime(event.endAt)}
          </TimeSection>
        </ContentSection>
      </a>
    </EventSection>
  );
}

const EventSection = styled.li`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  min-width: 300px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid ${ThemeGray4};
  overflow: hidden;

  @media (min-width: 1024px) {
    width: 47%;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const ImgSection = styled.div`
  overflow: hidden;
  border-radius: 6px;
  width: 100%;
  padding: 10px;
  text-align: center;
`;

const EventImage = styled.img`
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 500 / 200;
  border-radius: 6px;
  margin: auto;
  box-shadow: 0 5px 18px -7px ${ThemeGray1};
`;

const ContentSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 1rem;
`;

const TitleSection = styled.div`
  margin-bottom: 10px;
  font-size: x-large;
  font-weight: 700;
  text-align: left;
  max-width: 100%;
  min-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StoreNameSection = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${MainBlue};
`;

const TypeSection = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const TimeSection = styled.div`
  padding-top: 10px;
  text-align: left;
`;

const Tags = styled.span`
  background-color: ${ThemeBlack};
  color: ${ThemeWhite};
  font-size: 1rem;
  margin-left: auto;
  padding: 0.5rem 1rem;
  border-radius: 3rem;
`;
