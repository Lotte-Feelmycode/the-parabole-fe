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
import { getTimeNotKor, getState } from '@utils/functions';
import { EVENT_TYPE } from '@utils/constants/types';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { PRIZE_TYPE } from '@utils/constants/types';
export default function Event() {
  const router = useRouter();

  const [productList, setProductList] = useState([]);
  const [couponList, setCouponList] = useState([]);
  const [prizeList, setprizeList] = useState([]);

  const [title, onChangeTitle] = useInput('');
  const [descript, onChangeDescript] = useInput('');
  const [eventType, onEventType] = useInput('');
  const [startAt, onStartAt] = useInput();
  const [endAt, onEndAt] = useInput();
  const [stockList, setStockList] = useState([]);

  function addStock(prize, newStock) {
    // e.target.value로 index 가져옴
    // index로 배열에서 product id / coupon id 찾음
    //
    console.log(prize);
    console.log(newStock);

    const pid = prize.id;

    const arrIdx = prizeList.findIndex((e) => e.prizeId == pid);

    let copyArr = [...prizeList];
    copyArr[arrIdx] = { ...copyArr[arrIdx], stock: newStock };

    setprizeList(copyArr);
  }

  const minusBtnClick = (e, index) => {
    e.preventDefault();

    let newVal = stockList[index].stock - 1;
    let copyArray = [...stockList];

    copyArray[index] = { ...copyArray[index], stock: newVal };
    setStockList(copyArray);
  };

  const plusBtnClick = (e, index) => {
    e.preventDefault();

    let newVal = stockList[index].stock + 1;
    let copyArray = [...stockList];

    copyArray[index] = { ...copyArray[index], stock: newVal };
    setStockList(copyArray);
  };

  function ProductList({ inputProductList }) {
    return (
      <table className="w-full text-m text-center px-4 pb-8">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="h-14">
            <th scope="col" className="p-4 w-32">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="py-3 px-12 w-40">
              상품명
            </th>
            <th scope="col" className="py-3 px-10 w-40">
              카테고리
            </th>
            <th scope="col" className="py-3 px-10 w-40 ">
              가격
            </th>
            <th scope="col" className="py-3 px-6  w-40">
              재고
            </th>
            <th scope="col" className="py-3 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {productList &&
            productList.map((product, index) => (
              <tr className="h-24 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-32">
                  <img src={product.productThumbnailImg} alt="상품"></img>
                </td>
                <td className="py-4 px-10 w-40">{product.productName}</td>
                <td className="py-4 px-10 w-40">{product.productCategory}</td>
                <td className="py-4 px-10 w-40">
                  {numberToMonetary(product.productPrice)} 원
                </td>
                <td className="py-4 px-10 w-40">{product.productRemains}</td>
                <td className="p-4 w-30">
                  <btn.LinePink
                    buttonText="등록"
                    name="btnPost"
                    css={{
                      fontSize: '14px',
                    }}
                    attr={{
                      value: index,
                    }}
                    onClickFunc={onAddProductPrizeHandler}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }

  function CouponList({ inputCouponList }) {
    return (
      <table className="w-full text-m text-center px-4 py-16">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="h-14">
            <th scope="col" className="py-2 px-4">
              쿠폰명
            </th>
            <th scope="col" className="py-2 px-4">
              할인율/금액
            </th>
            <th scope="col" className="py-2 px-4">
              최소금액
            </th>
            <th scope="col" className="py-2 px-4">
              최대금액
            </th>
            <th scope="col" className="py-2 px-4">
              유효기간
            </th>
            <th scope="col" className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {couponList &&
            couponList.map((coupon, index) => (
              <>
                <tr className="h-12 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="py-4 px-8 w-40">{coupon.name}</td>
                  <td className="py-4 px-10 w-20">
                    {coupon.type === '1'
                      ? coupon.discountValue + '%'
                      : numberToMonetary(coupon.discountValue) + '원'}
                  </td>
                  <td className="py-4 px-10 w-20">
                    {numberToMonetary(coupon.maxDiscountAmount)}원
                  </td>
                  <td className="py-4 px-10 w-20">
                    {numberToMonetary(coupon.minPaymentAmount)}원
                  </td>
                  <td className="py-4 w-40">
                    {getTimeNotKor(coupon.validAt)} ~{' '}
                    {getTimeNotKor(coupon.expiresAt)}
                  </td>

                  <td className="p-4 w-10">
                    <div className="flex items-center">
                      <btn.LinePink
                        buttonText="등록"
                        name="btnPost"
                        css={{
                          fontSize: '14px',
                        }}
                        attr={{ value: index }}
                        onClickFunc={onAddCouponPrizeHandler}
                      />
                    </div>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    );
  }

  function EventPrizes({ inputList }) {
    return (
      <div className="w-full">
        <div className="">
          <p className="text-lg text-pink-600 font-bold pl-2 pt-4 pb-2">
            선택 경품 목록
          </p>
        </div>
        {inputList && Array.isArray(inputList) ? (
          <table className="w-full text-m text-center">
            <thead className="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="h-12">
                <th scope="col" className="py-3 px-6 w-32">
                  경품 유형
                </th>
                <th scope="col" className="py-3 px-6 w-40">
                  상품 또는 쿠폰명
                </th>
                <th scope="col" className="py-3 px-6 w-24">
                  재고
                </th>
              </tr>
            </thead>
            <tbody>
              {inputList.map((prize, index) => (
                <tr className="h-12 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <input type={'hidden'} value={prize.prizeId} />

                  <td className="py-4 px-8 w-32">
                    {getState(PRIZE_TYPE, prize.type)}
                  </td>
                  <td className="py-4 px-8 w-40">{prize.name}</td>
                  <td className="py-4 px-8 w-24">
                    <OptionInputSection>
                      <btn.SmallWhite
                        buttonText="-"
                        onClickFunc={(event) => minusBtnClick(event, index)}
                        css={{
                          borderBottomRightRadius: '0',
                          borderTopRightRadius: '0',
                        }}
                      />
                      <Input
                        type="number"
                        value={stockList[index].stock}
                        css={{
                          textAlign: 'right',
                          maxWidth: '80px',
                          height: '30px',
                          margin: '0',
                        }}
                      />
                      <btn.SmallWhite
                        buttonText="+"
                        onClickFunc={(event) => plusBtnClick(event, index)}
                        css={{
                          borderBottomLeftRadius: '0 !important ',
                          borderTopLeftRadius: '0',
                        }}
                      />
                    </OptionInputSection>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>선택된 경품이 없습니다. 상품 또는 쿠폰을 선택해주세요.</div>
        )}
      </div>
    );
  }

  const onAddProductPrizeHandler = (e) => {
    e.preventDefault();

    const idx = e.target.value;

    const arrIdx = prizeList.findIndex(
      (e) => e.id == productList[idx].productId,
    );

    if (arrIdx > -1) {
      alert('이미 같은 상품을 등록했습니다');
      return;
    }

    const tmpobj = {
      type: 'PRODUCT',
      id: productList[e.target.value].productId,
      name: productList[e.target.value].productName,
      stock: 30,
    };

    const stockObj = {
      id: idx,
      stock: 10,
    };

    setStockList([stockObj, ...stockList]);
    setprizeList([tmpobj, ...prizeList]);
  };

  const onAddCouponPrizeHandler = (e) => {
    e.preventDefault();

    const idx = e.target.value;

    const arrIdx = prizeList.findIndex((e) => e.id == couponList[idx].couponId);

    if (arrIdx > -1) {
      alert('이미 같은 쿠폰을 등록했습니다');
      return;
    }

    const tmpobj = {
      type: 'COUPON',
      id: couponList[e.target.value].couponId,
      name: couponList[e.target.value].name,
      stock: 30,
    };

    const stockObj = {
      id: idx,
      stock: 10,
    };

    setStockList([stockObj, ...stockList]);
    setprizeList([tmpobj, ...prizeList]);
  };

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
      sellerId: 1,
    };
    GET(`/coupon/seller/list`, params).then((res) => {
      console.log(res.data.content);
      setCouponList(res.data.content);
    });
  };

  // TODO : API 호출 부분 수정 (이미지 업로더, 경품목록)
  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log(prizeList);
    let copyArr = [...prizeList];

    for (var i = 0; i < prizeList.length; i++) {
      copyArr[i] = { ...copyArr[i], stock: stockList.at(i).stock };
    }

    setprizeList(copyArr);

    const eventParams = {
      //userId: localStorage.getItem("ID"),
      userId: 1,
      createdBy: 'SELLER',
      type: eventType,
      startAt: startAt + ':00',
      endAt: endAt + ':00',
      title: title,
      descript: descript,
      eventImage: {
        eventBannerImg: 'dummyimage',
        EventDetailImg: 'dummydetail',
      },
      eventPrizeCreateRequestDtos: prizeList,
    };

    console.log(eventParams);

    POST('/event', eventParams).then((res) => {
      if (res && res.data && confirm('이벤트를 등록하시겠습니까?') > 0) {
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
          attr={{
            placeholder: '이벤트 제목을 입력하세요',
          }}
          css={{
            border: '0.1px solid #52525224',
          }}
        ></Input>
        <Divider />
        <Heading title="이벤트 설명" type="h2" />
        <Input
          type="text"
          name="eventDescript"
          value={descript}
          onChange={onChangeDescript}
          attr={{
            placeholder: '이벤트 설명을 입력하세요',
          }}
          css={{
            border: '0.1px solid #52525224',
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
        <CalendarContainer>
          <Heading title="시작 일시" type="h3" />
          <Input
            type="datetime-local"
            onChange={onStartAt}
            value={startAt}
            css={{
              border: '0.1px solid #52525224',
            }}
          />
          <Heading title="종료 일시" type="h3" />
          <Input
            type="datetime-local"
            onChange={onEndAt}
            value={endAt}
            css={{
              border: '0.1px solid #52525224',
            }}
          />
        </CalendarContainer>
        <Divider />

        <Div>
          <Heading title="이벤트 경품 선택" type="h2" />
          &nbsp;&nbsp;
          <btn.SmallPink
            buttonText="상품"
            onClickFunc={onSearchProductsHandler}
          ></btn.SmallPink>
          &nbsp;
          <btn.SmallPink
            buttonText="쿠폰"
            onClickFunc={onSearchCouponsHandler}
          ></btn.SmallPink>
        </Div>

        <div className="flex grid grid-flow-row-dense grid-cols-3 grid-rows-2">
          <div className="flex col-span-2">
            <ProductList inputProductList={productList} />
          </div>
          <div className="flex row-span-2  bg-gray-100">
            <EventPrizes inputList={prizeList} />
          </div>
          <div className="flex col-span-2">
            <CouponList inputCouponList={couponList} />
          </div>
        </div>

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
          <btn.Pink
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
  width: 100%;
  margin-bottom: 20px;
`;

const OptionInputSection = styled.div`
  display: flex;
  padding: 5px;
  flex: 0 0 auto;
`;
