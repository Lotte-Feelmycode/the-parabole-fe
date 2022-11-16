import { Blue } from '@components/input/Button';
import { ICON_SHOP } from '@utils/constants/icons';
import { useEffect, useState } from 'react';
import { GET_DATA } from '@apis/defaultApi';
import CouponListModal from '@components/coupon/CouponListModal';
import styled from '@emotion/styled';

export default function StoreInfo({ total, storeId, storeName }) {
  const [modalState, setModalState] = useState(false);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    if (storeId) {
      GET_DATA(`/coupon/store`, { sellerId: storeId }).then((res) => {
        if (res) {
          console.log(res);
          setCoupons(res.content);
        }
      });
    }
  }, [storeId]);

  function showBenefitModal(e) {
    e.preventDefault();

    setModalState(true);
  }

  return (
    <>
      <div className="store-info bg-white pb-4">
        <div className="max-w-screen-2xl mx-auto">
          <div className="p-4 md:h-80 flex flex-col sm:flex-row bg-blue-50 rounded-lg overflow-hidden">
            <div className="w-full sm:w-1/2 lg:w-3/5 flex flex-col p-4 sm:p-8">
              <div>
                <img src={ICON_SHOP} />
                <span className="text-gray-800 text-xl md:text-2xl lg:text-4xl font-bold mb-4">
                  {storeName}
                </span>
              </div>
              <p className="max-w-md text-gray-600 mb-8">총 상품 : {total}개</p>
            </div>
            <StoreCouponButtonSection className="store-coupon-button-section flex py-2">
              <Blue
                buttonText="쿠폰을 받으세요!"
                onClickFunc={(e) => showBenefitModal(e)}
                css={{ width: '100%', fontWeight: 'bold' }}
              />
            </StoreCouponButtonSection>
            <div>
              {modalState && (
                <CouponListModal
                  setModalState={setModalState}
                  couponList={coupons}
                  storeName={storeName}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const StoreCouponButtonSection = styled.div`
  margin-top: auto;
  margin-left: auto;
`;
