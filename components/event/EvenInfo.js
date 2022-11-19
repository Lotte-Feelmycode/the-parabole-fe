import { useRouter } from 'next/router';
import { Blue } from '@components/input/Button';
import { getDate, getDateTimeShort } from '@utils/functions';
import styled from '@emotion/styled';
import Timer from '@components/common/Timer';
import { NO_EVENT_DETAIL_IMAGE } from '@utils/constants/images';

export default function EventInfo({ eventInfo, eventImage, storeInfo }) {
  const router = useRouter();

  function goToStore() {
    if (storeInfo && storeInfo.sellerId) {
      router.push({ pathname: `/store/${storeInfo.sellerId}` });
    }
  }

  return (
    <>
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="flex flex-col text-center pb-12 md:pb-16">
              <H1
                className="break-all text-2xl md:text-5xl lg:text-6xl leading-tighter tracking-tighter"
                data-aos="zoom-y-out"
              >
                {eventInfo.descript}
              </H1>
              <H1
                className="break-all text-4xl md:text-7xl lg:text-8xl font-bold leading-tighter tracking-tighter
                  bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 whitespace-pre-line"
                data-aos="zoom-y-out"
              >
                {eventInfo.title}
              </H1>
              <div className="max-w-3xl mx-auto mt-5">
                <div>
                  <div className="flex justify-center item-center flex-row">
                    <p className="text-xl md:text-2xl font-semibold text-gray-500 my-10">
                      {storeInfo && storeInfo.storeName}
                    </p>
                  </div>
                  <div className="flex justify-center item-center flex-col">
                    <InfoTable>
                      <tbody>
                        <tr>
                          <InfoTableTh className="text-left">
                            <p className="text-left text-l md:text-xl text-bold text-gray-900">
                              응모기간
                            </p>
                          </InfoTableTh>
                          <td>
                            <div className="flex">
                              <p className="contents text-left text-l md:text-xl text-bold text-gray-900">
                                {getDateTimeShort(eventInfo.startAt)}
                              </p>
                              <p className="contents text-left text-l md:text-xl text-bold text-gray-900">
                                {' - '}
                              </p>
                              <p className="contents text-left text-l md:text-xl text-bold text-gray-900">
                                {getDateTimeShort(eventInfo.endAt)}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <InfoTableTh className="text-left">
                            <p className="text-left text-l md:text-xl text-bold text-gray-900">
                              당첨자 발표
                            </p>
                          </InfoTableTh>
                          <td>
                            <p className="text-center text-l md:text-xl text-bold text-gray-900">
                              {getDate(eventInfo.endAt)}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </InfoTable>
                  </div>
                </div>
                <p className="mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                  {eventInfo.type === 'FCFS' && eventInfo.status !== 0 && (
                    <Timer endAt={eventInfo.endAt} />
                  )}
                </p>
                <div
                  className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <div className="animate-pulse">
                    <Blue
                      buttonText={'상품 더 보러가기'}
                      onClickFunc={goToStore}
                    />
                  </div>
                </div>
              </div>
              <div className="place-self-center	mt-20">
                <img
                  className="justify-self-center"
                  src={eventImage.eventDetailImg || NO_EVENT_DETAIL_IMAGE}
                  layout="responsive"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const InfoTable = styled.table`
  @media (min-width: 767px) {
    width: 400px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const InfoTableTh = styled.th`
  @media (min-width: 767px) {
    width: 30%;
  }
  @media (max-width: 767px) {
    width: 33%;
    min-width: 74px;
  }
`;

const H1 = styled.div`
  font-family: 'AppleSDGothicNeoB';
`;
