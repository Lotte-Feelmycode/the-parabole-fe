import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import {
  ThemeGray1,
  ThemeWhite,
  ThemeGray5,
} from '@utils/constants/themeColor';
import { numberToMonetary } from '@utils/functions';

export default function CartCouponModal({
  setModalState,
  couponList,
  contentTotalPrice,
  storeName,
}) {
  // var couponArray = new Array();

  const [couponArray, setCouponArray] = useState([]);

  const addCouponArray = (parameter) => {
    setCouponArray((couponArray) => [
      ...couponArray,
      {
        couponName: parameter.couponName,
        description: parameter.description,
        discountPrice: parameter.discountPrice,
      },
    ]);
  };

  useEffect(() => {
    if (
      couponList.rateCoupon &&
      couponList.amountCoupon &&
      couponList.amountCoupon.length + couponList.rateCoupon.length > 0
    ) {
      const rateCouponList = couponList.rateCoupon;
      const amountCouponList = couponList.amountCoupon;

      var rateIndex = 0;
      var amountIndex = 0;

      for (
        ;
        rateIndex + amountIndex <
        rateCouponList.length + amountCouponList.length;

      ) {
        var parameter = null;

        if (rateCouponList.length > rateIndex) {
          const nowCoupon = rateCouponList[rateIndex];
          const nowPrice = (contentTotalPrice * nowCoupon.discountValue) / 100;
          parameter = {
            couponName: nowCoupon.couponName,
            description: nowCoupon.discountValue + '%',
            discountPrice: nowPrice,
          };
        }

        if (amountCouponList.length > amountIndex) {
          const nowCoupon = amountCouponList[amountIndex];
          var nowPrice =
            contentTotalPrice - nowCoupon.discountValue < 0
              ? 0
              : nowCoupon.discountValue;

          if (parameter == null || parameter.discountPrice < nowPrice) {
            parameter = {
              couponName: nowCoupon.couponName,
              description: nowCoupon.discountValue + '₩',
              discountPrice: nowPrice,
            };
            amountIndex = amountIndex + 1;
          } else {
            rateIndex = rateIndex + 1;
          }
        }

        if (parameter) {
          addCouponArray(parameter);
        }
      }
    }
  }, []);

  const closeModal = () => {
    setModalState(false);
  };

  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef();

  useEffect(() => {
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalState(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  return (
    <ModalContainer ref={modalRef} className="modal-container">
      <TopSection>
        <button onClick={closeModal}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill={ThemeGray1}
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fillRule="nonzero"
              d="M6 4.6L10.3.3l1.4 1.4L7.4 6l4.3 4.3-1.4 1.4L6 7.4l-4.3 4.3-1.4-1.4L4.6 6 .3 1.7 1.7.3 6 4.6z"
            />
          </svg>
        </button>
      </TopSection>
      <DetailSection>
        <ModalTitleSection>{storeName}에서 사용가능한 쿠폰</ModalTitleSection>
        <ModalTableSection>
          <ShowCouponTable
            couponList={couponArray}
            contentTotalPrice={contentTotalPrice}
          />
        </ModalTableSection>
      </DetailSection>
    </ModalContainer>
  );
}

function ShowCouponTable({ couponList, contentTotalPrice }) {
  if (couponList.length > 0) {
    return (
      <CouponTable className="coupon-table">
        <thead className="text-m uppercase">
          <tr className="bg-white border-b">
            <th className="text-sm font-medium text-gray-900 px-6 py-4 ">
              쿠폰이름
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 ">
              쿠폰설명
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 ">
              할인금액
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4">
              적용후금액
            </th>
          </tr>
        </thead>
        <tbody className="text-m">
          {couponList &&
            couponList.map((coupon) => (
              <CouponTableRow
                key={coupon.couponName}
                couponName={coupon.couponName}
                description={coupon.description}
                discountPrice={coupon.discountPrice}
                contentTotalPrice={contentTotalPrice}
              />
            ))}
        </tbody>
      </CouponTable>
    );
  } else {
    return <div>쿠폰이 없습니다.</div>;
  }
}

function CouponTableRow({
  couponName,
  description,
  discountPrice,
  contentTotalPrice,
}) {
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <span>{couponName}</span>
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {description} 할인쿠폰
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {numberToMonetary(discountPrice)}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {numberToMonetary(contentTotalPrice - discountPrice)}
      </td>
    </tr>
  );
}

const ModalContainer = styled.div`
  /* 모달창 크기 */
  width: 800px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-30%, -50%);

  /* 모달창 디자인 */
  background-color: ${ThemeGray5};
  border: 1px solid black;
  border-radius: 8px;
`;

const TopSection = styled.div`
  text-align: right;
  padding: 5px 10px;
`;

const DetailSection = styled.div`
  text-align: center;
`;

const ModalTitleSection = styled.div`
  margin: 0 30px;
  background-color: ${ThemeWhite};
  font-size: 1.5rem;
  font-weight: bolder;
  border-radius: 1rem;
`;

const ModalTableSection = styled.div`
  margin: 30px 0;
`;

const CouponTable = styled.table`
  margin: 5%;
  width: 90%;
  text-align: center;
  border-radius: 10px;
`;
