import { GET, POST } from '@apis/defaultApi';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import Heading from '@components/input/Heading';
import Input from '@components/input/Input';
import Radio from '@components/input/Radio';
import * as btn from '@components/input/Button';
import ImageUploader from '@components/input/ImageUploader';
import SellerLayout from '@components/seller/SellerLayout';
import { numberToMonetary } from '@utils/moneyUtil';
import getTime from '@utils/functions';
import { EVENT_TYPE } from '@utils/constants/types';
//import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import BasicDateTimePicker from '@components/input/DatePicker';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Event() {
  const router = useRouter();

  const [productList, setProductList] = useState([]);
  const [couponList, setCouponList] = useState([]);

  const [title, onChangeTitle] = useInput('');
  const [descript, onChangeDescript] = useInput('');
  const [eventType, onEventType] = useInput('');
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());

  const onSearchProductsHandler = (e) => {
    e.preventDefault();

    // TODO : USER 정보 가져오기
    // const userId = sessionStorage.getItem("ID");
    const params = {
      sellerId: 1,
    };
    GET(`/product/list`, params).then((res) => {
      setProductList(res.data.content);
    });
  };

  const onSearchCouponsHandler = (e) => {
    e.preventDefault();

    // TODO : USER 정보 가져오기
    // const userId = sessionStorage.getItem("ID");
    const params = {
      userId: 1,
    };
    GET(`/coupon/seller/list`, params).then((res) => {
      console.log(res.data.content);
      setCouponList(res.data.content);
    });
  };

  // TODO : API 호출 부분 수정 (이미지 업로더, 경품목록)
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const eventParams = {
      //userId: localStorage.getItem("ID"),
      userId: 1,
      createdBy: 'SELLER',
      type: eventType,
      //startAt: dayjs(startAt).format('YYYY-MM-DDTHH:mm:ss'),
      //endAt: dayjs(endAt).format('YYYY-MM-DDTHH:mm:ss'),
      startAt: new Date().toISOString().substring(0, 19),
      endAt: new Date().toISOString().substring(0, 19),
      title: title,
      descript: descript,
      eventImage: {
        eventBannerImg: 'dummyimage',
        EventDetailImg: 'dummydetail',
      },
      eventPrizeCreateRequestDtos: [
        { id: 1, type: 'PRODUCT', stock: 30 },
        { id: 2, type: 'PRODUCT', stock: 30 },
      ],
    };

    POST('/event', eventParams).then((res) => {
      if (res && res.data > 0) {
        alert('이벤트가 등록되었습니다. ');
        router.push({ pathname: `/seller/event/list` }, `/seller/event/list`);
      }
    });
  };

  return (
    <SellerLayout>
      <FormTemplate onSubmit={onSubmitHandler}>
        <Heading title="이벤트 등록" type="h1" />
        <Divider />
        <Heading title="이벤트 제목" type="h2" />
        <Input
          type="text"
          name="eventTitle"
          value={title}
          onChange={onChangeTitle}
          css={{
            border: '0.1px solid #52525224',
            placeholder: '이벤트 제목을 입력하세요',
          }}
        ></Input>
        <Divider />
        <Heading title="이벤트 설명" type="h2" />
        <Input
          type="text"
          name="eventDescript"
          value={descript}
          onChange={onChangeDescript}
          css={{
            border: '0.1px solid #52525224',
            placeholder: '이벤트 설명을 입력하세요',
          }}
        ></Input>
        <Divider />

        <Heading title="이벤트 타입" type="h2" />
        <Div>
          <Radio
            id="productStatus"
            items={EVENT_TYPE}
            formName="productStatus"
            className="posting-radio"
            InputClassName="posting-radio_input"
            onChange={onEventType}
            value={eventType}
          />
        </Div>
        <Divider />

        <Heading title="이벤트 진행 일시" type="h2" />
        {/* <Heading title="시작 일시" type="h3" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CalendarContainer>
            <BasicDateTimePicker value={startAt} onChange={setStartAt} />
          </CalendarContainer>
          <Heading title="종료 일시" type="h3" />
          <CalendarContainer>
            <BasicDateTimePicker value={endAt} onChange={setEndAt} />
          </CalendarContainer>
        </LocalizationProvider> */}
        <Divider />

        <Div>
          <Heading title="이벤트 경품 선택" type="h2" />
          &nbsp;
          <btn.SmallBlue
            buttonText="상품"
            onClickFunc={onSearchProductsHandler}
          ></btn.SmallBlue>
          &nbsp;
          <btn.SmallBlue
            buttonText="쿠폰"
            onClickFunc={onSearchCouponsHandler}
          ></btn.SmallBlue>
        </Div>

        <table className="text-m text-center">
          <thead className="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="h-12">
              <th scope="col" className="py-3 px-6 w-32">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="py-3 px-10 w-40">
                상품명
              </th>
              <th scope="col" className="py-3 px-10 w-40">
                상품카테고리
              </th>
              <th scope="col" className="py-3 px-10 w-40 ">
                상품 가격
              </th>
              <th scope="col" className="py-3 px-6  w-40">
                상품 재고
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {productList &&
              productList.map((product, index) => (
                <tr className="h-24 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4 w-32">
                    <img src={product.productThumbnailImg} alt="상품"></img>
                  </td>
                  <td className="py-4 px-8 w-40">{product.productName}</td>
                  <td className="py-4 px-8 w-40">{product.productCategory}</td>
                  <td className="py-4 px-10 w-40">
                    {numberToMonetary(product.productPrice)} 원
                  </td>
                  <td className="py-4 px-10 w-40">{product.productRemains}</td>
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            <tr className="h-24 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td colspan="6" className="px-4 w-32">
                <div className="flex items-center">
                  <btn.SmallBlue buttonText="상품 등록" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <Divider />
        <table className="w-full text-sm text-center">
          <thead className="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                쿠폰명
              </th>
              <th scope="col" className="py-3 px-6">
                쿠폰 유형
              </th>
              <th scope="col" className="py-3 px-6">
                할인율/금액
              </th>
              <th scope="col" className="py-3 px-6">
                최소금액
              </th>
              <th scope="col" className="py-3 px-6">
                최대금액
              </th>
              <th scope="col" className="py-3 px-6">
                시작일자
              </th>
              <th scope="col" className="py-3 px-6">
                만료일자
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {couponList &&
              couponList.map((coupon, index) => (
                <tr className="h-24 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="py-4 px-8 w-40">{coupon.name}</td>
                  <td className="py-4 px-8 w-40">
                    {coupon.type === '1' ? '할인율' : '금액'}
                  </td>
                  <td className="py-4 px-10 w-40">
                    {coupon.type === '1'
                      ? coupon.discountRate + '%'
                      : numberToMonetary(coupon.discountAmount) + '원'}
                  </td>
                  <td className="py-4 px-10 w-40">
                    {numberToMonetary(coupon.maxDiscountAmount)}원
                  </td>
                  <td className="py-4 px-10 w-40">
                    {numberToMonetary(coupon.minPaymentAmount)}원
                  </td>
                  <td className="py-4 px-10 w-40">{getTime(coupon.validAt)}</td>
                  <td className="py-4 px-10 w-40">
                    {getTime(coupon.expiresAt)}
                  </td>
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* TODO: 동적 테이블 추가 */}
        <Divider />
        {/* TODO: 이미지 업로드 추후 수정 */}
        <Heading title="이벤트 배너 이미지" type="h2" />
        <Div>
          <ImageUploader />
        </Div>
        <Divider />
        <Heading title="이벤트 상세 이미지" type="h2" />
        <Div>
          <ImageUploader />
        </Div>
        <Divider />
        <Div>
          <btn.Blue
            buttonText="등록하기"
            name="btnPost"
            onClickFunc={onSubmitHandler}
          />
        </Div>
      </FormTemplate>
    </SellerLayout>
  );
}

const FormTemplate = styled.form`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CalendarContainer = styled.div`
  width: 40%;
  margin-bottom: 20px;
`;
