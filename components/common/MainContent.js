import { useEffect, useState } from 'react';
import { GET_DATA } from '@apis/defaultApi';
import { useRouter } from 'next/router';

export default function MainContent({ title, content }) {
  const initList = [
    {
      id: -1,
      eventImage: {
        eventBannerImg:
          'https://cdn.class101.net/images/e3bd3fc0-0c63-41f7-8ece-744368b70f41/2048xauto.webp',
      },
      title: '더미 이벤트',
    },
    {
      id: -1,
      eventImage: {
        eventBannerImg:
          'https://cdn.class101.net/images/0206c338-0b0e-4e48-94ae-d50a494532e7/2048xauto.webp',
      },
      title: '더미 이벤트',
    },
  ];
  const router = useRouter();
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    GET_DATA(`/event/list`, { eventStatus: 1 }).then((res) => {
      if (res && res.length > 1) {
        setEventList(res.slice(0, 2));
      } else {
        setEventList(initList);
      }
    });
  }, []);

  const onClick = (id) => {
    if (id > 0) {
      router.push({
        pathname: `/event/${id}`,
      });
    } else {
      router.push({
        pathname: `/event`,
      });
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-wrap justify-between mb-8 md:mb-16">
          <div className="w-full lg:w-1/3 flex flex-col justify-center lg:pt-48 lg:pb-24 mb-6 sm:mb-12 lg:mb-0">
            <h1 className="text-black-800 text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-8">
              {title}
            </h1>

            <p className="max-w-md text-gray-500 xl:text-lg leading-relaxed">
              {content}
            </p>
          </div>

          {eventList && eventList.length > 1 && (
            <div className="w-full lg:w-2/3 flex justify-center mb-12 md:mb-16">
              <div
                onClick={() => onClick(eventList[0].id)}
                className="bg-gray-100 rounded-lg shadow-lg overflow-hidden relative z-10 top-12 md:top-16 left-12 md:left-16 -ml-12 lg:ml-0 w-1/2"
              >
                <img
                  src={eventList[0].eventImage.eventBannerImg}
                  alit={eventList[0].title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-110 transition duration-200"
                />
              </div>

              <div
                onClick={() => onClick(eventList[1].id)}
                className="bg-gray-100 rounded-lg shadow-lg overflow-hidden z-8 left-12 md:left-16 -ml-12 lg:ml-0 w-1/2"
              >
                <img
                  src={eventList[1].eventImage.eventBannerImg}
                  alit={eventList[1].title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-110 transition duration-200"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
