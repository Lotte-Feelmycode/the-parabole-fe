import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { GET_DATA } from '@apis/defaultApi';
import { ThemeGray4, ThemeGray1, MainBlue } from '@utils/constants/themeColor';
import { APPLY_TYPE } from '@utils/constants/types';
import { getDateTimeShort } from '@utils/functions';

export default function EventApplyList({ headers }) {
  const [total, setTotal] = useState([]);
  const [nowState, setNowState] = useState(3);

  useEffect(() => {
    // TODO: PathVariable 대신 Header 를 넘기고 백엔드에서 @RequestAttribute 로 변경합니다.
    GET_DATA(`/event/user/participant`, '', headers).then((res) => {
      if (res) {
        setTotal(res);
      }
    });
  }, []);

  function EventApply({ applyInfo }) {
    function EventStatus({ status }) {
      var statusString = status;
      if (1 === status) statusString = '진행중';
      else if (2 === status) statusString = '종료';

      return (
        <>
          <EventApplySection>{statusString}</EventApplySection>
        </>
      );
    }

    const EventApplySection = styled.div`
      border-radius: 2rem;
      color: ${MainBlue};
      display: initial;
      font-weight: bolder;
      font-size: 16px;
    `;

    return (
      <EventSection className="justify-center col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0">
        <EventImgSection className="img-section">
          <EventImg loading="lazy" src={applyInfo.eventImg} />
        </EventImgSection>
        <EventStatusSection className="status-section">
          <EventTitleSection className="title-section">
            {applyInfo.eventTitle}
          </EventTitleSection>
          <EventDetailSection>
            <EventStatus status={applyInfo.status} />
            <ApplyTime>
              {getDateTimeShort(applyInfo.startAt)}
              {' ~ '}
              {getDateTimeShort(applyInfo.endAt)}
            </ApplyTime>
          </EventDetailSection>
          <EventWinnerApplySection>
            <EventApplySection>추첨 여부</EventApplySection>
            <EventWinnerApplyStatus>
              {applyInfo.winnerStatus}
            </EventWinnerApplyStatus>
          </EventWinnerApplySection>
          <EventWinnerPrizeSection>
            <>
              {applyInfo.prizeName != null ? (
                <>
                  <EventApplySection>응모 상품</EventApplySection>
                  <EventWinnerPrizeName>
                    {applyInfo.prizeName}
                  </EventWinnerPrizeName>
                </>
              ) : null}
            </>
          </EventWinnerPrizeSection>
        </EventStatusSection>
      </EventSection>
    );
  }
  const EventWinnerPrizeSection = styled.div`
    display: inline-flex;
    align-items: center;
  `;
  const EventWinnerPrizeName = styled.div`
    font-size: 13px;
    margin-left: auto;
    padding-right: 10px;
    color: ${ThemeGray1};
  `;
  const EventWinnerApplySection = styled.div`
    display: inline-flex;
    align-items: center;
  `;
  const EventWinnerApplyStatus = styled.div`
    font-size: 13px;
    margin-left: auto;
    padding-right: 10px;
    color: ${ThemeGray1};
  `;
  const EventSection = styled.li`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    border: 1px solid ${ThemeGray4};
    border-radius: 10px;
    @media (min-width: 767px) {
      margin: 10px;
      width: 47%;
    }
    @media (max-width: 767px) {
      margin: auto;
      width: 100%;
      text-align: center;
    }
  `;

  const EventImgSection = styled.div`
    overflow: hidden;
    border-radius: 6px;
    width: 100%;
    padding: 10px;
    flex: 1 1 auto;
    text-align: center;
  `;

  const EventImg = styled.img`
    max-width: 100%;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 500 / 200;
    border-radius: 6px;
    margin: auto;
    box-shadow: 0 5px 18px -7px ${ThemeGray1};
  `;

  const EventStatusSection = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    padding: 10px;
    flex: 1 1 0;
  `;

  const EventDetailSection = styled.div`
    display: inline-flex;
    align-items: center;
  `;

  const EventTitleSection = styled.div`
    margin-bottom: 10px;
    font-size: x-large;
    font-weight: 700;
    text-align: left;
  `;

  const ApplyTime = styled.div`
    font-size: 13px;
    margin-left: auto;
    padding-right: 10px;
    color: ${ThemeGray1};
  `;

  function PrintEventTable() {
    return (
      <ul className="flex flex-wrap row justify-center">
        {total &&
          total.map((event) => {
            if (nowState === 3) {
              return <EventApply applyInfo={event} key={event.eventId} />;
            } else if (nowState === event.status)
              return <EventApply applyInfo={event} key={event.eventId} />;
          })}
      </ul>
    );
  }

  return (
    <>
      <NavSection className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center border-b">
        <MenuList className="contents list-none text-center whitespace-nowrap">
          {APPLY_TYPE.map((state) => {
            if (state.value === 'EVENT_BEGIN') return;
            return (
              <li className="float-left" key={state.index}>
                {nowState === state.index && (
                  <SelectedNav
                    className="flex title-font text-middle font-semibold items-center text-gray-900  cursor-pointer"
                    key={state.index}
                    onClick={() => {
                      setNowState(state.index);
                    }}
                  >
                    <MenuNameSpan className="selected-nav">
                      {state.name}
                    </MenuNameSpan>
                  </SelectedNav>
                )}
                {nowState !== state.index && (
                  <a
                    className="flex title-font text-middle font-semibold items-center text-gray-900  cursor-pointer"
                    key={state.index}
                    onClick={() => {
                      setNowState(state.index);
                    }}
                  >
                    <MenuNameSpan className="hover:text-blue-500">
                      {state.name}
                    </MenuNameSpan>
                  </a>
                )}
              </li>
            );
          })}
        </MenuList>
      </NavSection>
      <PrintEventTable />
    </>
  );
}

const SelectedNav = styled.a`
  color: ${MainBlue};
  margin-bottom: 0.1rem;
`;

const NavSection = styled.nav`
  background-color: ${ThemeGray4};
  font-size: large;
  margin-bottom: 10px;
`;

const MenuList = styled.ul`
  background-color: ${ThemeGray4};
  @media (min-width: 767px) {
  }
  @media (max-width: 767px) {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
  }
`;

const MenuNameSpan = styled.span`
  @media (min-width: 767px) {
    font-size: large;
    margin: 20px;
  }
  @media (max-width: 767px) {
    font-size: medium;
    margin: 15px;
  }
`;
