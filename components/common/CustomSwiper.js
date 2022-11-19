import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import styled from '@emotion/styled';

export default function CustomSwiper() {
  return (
    <SwiperSection className="swiper-section">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/store/banners/store_home_banners/166573992584362130.png?gif=1&w=2560&q=100"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/store/banners/store_home_banners/166597362662322690.png?gif=1&w=2560&q=100"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/store/banners/store_home_banners/166605757286962706.png?gif=1&w=2560&q=100"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/store/banners/store_home_banners/166573964522940796.jpg?gif=1&w=2560&q=100"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/store/banners/store_home_banners/166573981678744789.png?gif=1&w=2560&q=100"></img>
        </SwiperSlide>
      </Swiper>
    </SwiperSection>
  );
}

const SwiperSection = styled.div`
  @media (min-width: 767px) {
    display: block;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;
