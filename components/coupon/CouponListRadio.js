import { GET_DATA } from '@apis/defaultApi';
import * as btn from '@components/input/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

function CouponListRadio({ sellerId, setCouponParentId }) {
  const router = useRouter();
  const [couponList, setCouponList] = useState([]);
  const [totalElementCnt, setTotalElementCnt] = useState(0);

  const [radioValue, setRadioValue] = useState(1);

  useEffect(() => {
    GET_DATA(`/coupon/seller/list`, { sellerId }).then((res) => {
      if (res) {
        console.log(res);
        if (res.numberOfElements === 0) {
          alert('판매자가 등록한 쿠폰이 없습니다.');
        } else if (res.content) {
          setCouponList(res.content);
          setTotalElementCnt(res.numberOfElements);
        }
      } else {
        alert('판매자의 쿠폰을 조회하지 못했습니다. 다시 시도해주세요.');
      }
    });
  }, []);

  function handleRadioChange(e) {
    console.log('------radio button clicked-----');
    console.log(`선택한 값 : ${e.target.value}`);
    setRadioValue(e.target.value);
    setCouponParentId(e.target.value);
  }

  return (
    <div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                쿠폰명
              </th>
              <th scope="col" className="py-3 px-6">
                쿠폰 타입
              </th>
              <th scope="col" className="py-3 px-6">
                할인율/액수
              </th>
              <th scope="col" className="py-3 px-6">
                쿠폰 상세설명
              </th>
              <th scope="col" className="py-3 px-6">
                발급 수량(총 수량)
              </th>
              <th scope="col" className="py-3 px-6">
                잔여 수량
              </th>
            </tr>
          </thead>
          <tbody>
            {couponList &&
              couponList.map((coupon) => (
                // <CouponChk key={coupon.couponId} coupon={coupon} />
                <tr
                  key={coupon.couponId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* <Chk type="checkbox" /> */}
                    <input
                      id="coupon-radio"
                      type="radio"
                      value={coupon.couponId}
                      name="list-radio"
                      onChange={handleRadioChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 mr-3"
                    />
                    {coupon.name}
                  </th>
                  <td className="py-4 px-6">{coupon.type}</td>
                  <td className="py-4 px-6">{coupon.discountValue}</td>

                  <td className="py-4 px-6">{coupon.detail}</td>
                  <td className="py-4 px-6">{coupon.cnt}</td>
                  <td className="py-4 px-6">{coupon.remains}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <br />
      <strong>
        <p>총 쿠폰 수량 : {totalElementCnt}</p>
      </strong>
      <btn.Pink
        onClickFunc={() => router.push('./new')}
        buttonText="쿠폰 등록하기"
        css={{
          width: '30%',
          float: 'right',
          marginLeft: '3%',
        }}
      />
    </div>
  );
}

export default CouponListRadio;

const Chk = styled.input`
  margin-right: 8px;
`;
