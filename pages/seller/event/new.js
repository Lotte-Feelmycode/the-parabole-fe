import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GET, POST } from '@apis/defaultApi';
import useInput from '@hooks/useInput';
import useCheck from '@hooks/useCheck';

import Heading from '@components/input/Heading';
import Input from '@components/input/Input';
import Radio from '@components/input/Radio';
import Checkbox from '@components/input/Checkbox';
import * as btn from '@components/input/Button';
import CloseButton from '@components/input/CloseButton';
import ImageUploader from '@components/input/ImageUploader';
import SellerLayout from '@components/seller/SellerLayout';
import {
  getTimeNotKor,
  getState,
  isEmpty,
  numberToMonetary,
} from '@utils/functions';
import { EVENT_TYPE, PRIZE_TYPE } from '@utils/constants/types';
import { EVENT_ERROR } from '@utils/constants/errors';
import { ICON_WARNING_SIGN } from '@utils/constants/icons';

export default function Event() {
  const router = useRouter();

  const [productList, setProductList] = useState([]);
  const [couponList, setCouponList] = useState([]);
  const [prizeList, setprizeList] = useState([]);

  const [title, onChangeTitle] = useInput('');
  const [descript, onChangeDescript] = useInput('');
  const [eventType, onEventType] = useInput('');
  const [chatOpen, onChatOpen] = useCheck(true);
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();
  const [stockList, setStockList] = useState([]);

  const [isProductSelect, setProductSelect] = useState(false);
  const [isCouponSelect, setCouponSelect] = useState(false);

  // 선착순 이벤트 체크
  function checkFcfsPrize() {
    if (eventType === 'FCFS' && prizeList.length > 0) {
      alert('선착순 이벤트는 한 가지 경품만 추가할 수 있습니다.');
      return false;
    }
    return true;
  }

  // 이벤트 등록 validation check
  function validation(inputParams) {
    if (isEmpty(inputParams.title)) {
      alert(EVENT_ERROR.NO_EVENT_TITLE);
      return;
    }
    if (isEmpty(inputParams.descript)) {
      alert(EVENT_ERROR.NO_DESCRIPT);
      return;
    }
    if (isEmpty(inputParams.type)) {
      alert(EVENT_ERROR.NO_EVENT_TYPE);
      return;
    }
    if (isEmpty(inputParams.startAt)) {
      alert(EVENT_ERROR.NO_START_AT);
      return;
    }
    if (isEmpty(inputParams.endAt)) {
      alert(EVENT_ERROR.NO_END_AT);
      return;
    }
    if (
      inputParams.startAt >= inputParams.endAt ||
      inputParams.startAt <= new Date() ||
      inputParams.endAt <= new Date()
    ) {
      alert(EVENT_ERROR.INVALID_DATE);
      return;
    }
    if (prizeList.length < 1) {
      alert(EVENT_ERROR.NO_PRIZE_LIST);
      return;
    }
    if (isEmpty(inputParams.eventImage.eventBannerImg)) {
      alert(EVENT_ERROR.NO_EVENT_BANNER_IMAGE);
      return;
    }
    if (isEmpty(inputParams.eventImage.EventDetailImg)) {
      alert(EVENT_ERROR.NO_EVENT_DETAIL_IMAGE);
      return;
    }
    if (checkFcfsPrize()) return;
    return true;
  }

  // 경품 수량 (-) 버튼 클릭 이벤트
  const minusBtnClick = (e, index) => {
    e.preventDefault();

    let newVal = stockList[index].stock - 1;
    if (newVal < 1) {
      alert('경품 수량은 한 개 이상 선택해야 합니다.');
      return;
    }
    let copyArray = [...stockList];

    copyArray[index] = { ...copyArray[index], stock: newVal };
    setStockList(copyArray);
  };

  // 경품 수량 (+) 버튼 클릭 이벤트
  const plusBtnClick = (e, index) => {
    e.preventDefault();

    let newVal = stockList[index].stock + 1;
    let copyArray = [...stockList];
    if (newVal < 1) {
      alert('경품 수량은 한 개 이상 선택해야 합니다.');
      return;
    }

    copyArray[index] = { ...copyArray[index], stock: newVal };
    setStockList(copyArray);
  };

  // 이벤트 경품 조회 컴포넌트
  function ProductList({ inputProductList }) {
    return (
      <>
      {isProductSelect && (<>
        {productList && productList.length > 0 ? (
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
                  <tr key={product.productId} className="h-24 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4 w-32">
                      <img src={product.productThumbnailImg} alt="상품"></img>
                    </td>
                    <td className="py-4 px-10 w-40">{product.productName}</td>
                    <td className="py-4 px-10 w-40">
                      {product.productCategory}
                    </td>
                    <td className="py-4 px-10 w-40">
                      {numberToMonetary(product.productPrice)} 원
                    </td>
                    <td className="py-4 px-10 w-40">
                      {product.productRemains}
                    </td>
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
        ) : <div className="w-full flex flex-col flex-wrap content-center justify-center">
              <div className="place-self-center mb-2"><img className="w-12" src={ICON_WARNING_SIGN}></img></div>
              <div className="text-center text-xl font-semibold">등록된 상품이 없습니다. </div>
            </div>
          }</>)}
      </>
    );
  }

  // 이벤트 쿠폰 조회 컴포넌트
  function CouponList({ inputCouponList }) {
    return (
      <>
      {isCouponSelect && (<>
        {couponList && couponList.length > 0 ? (
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
                    <tr key={coupon.couponId}  className="h-12 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                ))}
            </tbody>
          </table>
        ) : <div className="w-full flex flex-col flex-wrap content-center justify-center">
              <div className="place-self-center mb-2"><img className="w-12" src={ICON_WARNING_SIGN}></img></div>
              <div className="text-center text-xl font-semibold">등록된 쿠폰이 없습니다. </div>
            </div>}
          </>)}
      </>
    );
  }

  // 선택 경품 목록 컴포넌트
  function EventPrizes({ inputList }) {
    return (
      <>
        <div className="w-full">
          <div className="">
            <p className="text-lg bg-pink-100 text-pink-600 font-bold pl-2 pt-4 pb-2">
              선택 경품 목록
            </p>
          </div>
          {inputList && Array.isArray(inputList) && inputList.length > 0 ? (
            <table className="w-full text-m text-center">
              <thead className="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="h-12">
                  <th scope="col" className="py-3 px-6 w-28">
                    경품 유형
                  </th>
                  <th scope="col" className="py-3 px-6 w-48">
                    상품 또는 쿠폰명
                  </th>
                  <th scope="col" className="py-3 px-6 w-20">
                    재고
                  </th>
                  <th scope="col" className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {inputList.map((prize, index) => (
                  <tr key={prize.prizeId} className="h-12 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <input type={'hidden'} value={prize.prizeId} />

                    <td className="py-4 px-8 w-28">
                      {getState(PRIZE_TYPE, prize.type)}
                    </td>
                    <td className="py-4 px-8 w-48">{prize.name}</td>
                    <td className="py-4 px-8 w-20">
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
                            maxWidth: '60px',
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
                    <td>
                      <CloseButton
                        onClickFunc={(event) => removePrize(event, index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4">
              선택된 경품이 없습니다. <b>상품</b> 또는 <b>쿠폰</b>을
              선택해주세요.
            </div>
          )}
        </div>
      </>
    );
  }

  const startAtChangeHandler = (e) => {
    e.preventDefault();

    let fromDTM = e.target.value;
    setStartAt(fromDTM);

    console.log(fromDTM);
    // let date = new Date(fromDTM.sp, 0, 1);
    // date객체 리턴후 계산 필요

    const params = {
      eventStatus : 1,
      dateDiv : 0,
      fromDateTime : startAt + ':00',
      toDateTime : (startAt.substring(0,13)) + ':50:00',
    }

    
    if (eventType === 'FCFS') {
      POST('/event/list', params).then((res) => {
        if (res && res.data && res.data.length > 0) {
          alert("이미 같은 시간대 등록된 이벤트가 있습니다. 다른 시간을 선택해주세요");
          setStartAt('');
          setEndAt('');
        }
      });
    }
  }

  const endAtChangeHandler = (e) => {
    e.preventDefault();

    setEndAt(e.target.value);
  }

  //경품 삭제 핸들러
  const removePrize = (e, index) => {
    e.preventDefault();
    if (!confirm('경품을 삭제하시겠습니까?')) return;

    let copyArray = [...prizeList];
    copyArray.splice(index, 1);
    setprizeList(copyArray);
  };

  // 경품 (상품) 선택 핸들러
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

    if (!checkFcfsPrize()) return;

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

  // 경품 (쿠폰) 선택 핸들러
  const onAddCouponPrizeHandler = (e) => {
    e.preventDefault();

    const idx = e.target.value;

    const arrIdx = prizeList.findIndex((e) => e.id == couponList[idx].couponId);

    if (arrIdx > -1) {
      alert('이미 같은 쿠폰을 등록했습니다');
      return;
    }

    if (!checkFcfsPrize()) return;

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

  // 경품(상품) 버튼 클릭시 조회 이벤트 핸들러
  const onSearchProductsHandler = (e) => {
    e.preventDefault();

    // TODO : USER 정보 가져오기
    // const userId = sessionStorage.getItem("ID");
    const params = {
      sellerId: 1,
    };
    GET(`/product/list`, params).then((res) => {
      setProductList(res.data.content);
      setProductSelect(true);
      setCouponSelect(false);
    });
  };

  // 경품(쿠폰) 버튼 클릭시 조회 이벤트 핸들러
  const onSearchCouponsHandler = (e) => {
    e.preventDefault();

    // TODO : USER 정보 가져오기
    // const userId = sessionStorage.getItem("ID");
    const params = {
      sellerId: 1,
    };
    GET(`/coupon/seller/list`, params).then((res) => {
      setCouponList(res.data.content);
      setCouponSelect(true);
      setProductSelect(false);
    });
  };


  const onCancelHandler = (e) => {
    e.preventDefault();

    if (
      confirm(
        '페이지를 벗어나면 작성 내용을 잃게됩니다. \n 작성을 중단하시겠습니까?',
      )
    ) {
      router.back();
    }
  };

  // 이벤트 등록 버튼 핸들러
  // TODO : 이미지 업로더 수정
  const onSubmitHandler = (e) => {
    e.preventDefault();

    let copyArr = [...prizeList];

    for (var i = 0; i < prizeList.length; i++) {
      copyArr[i] = { ...copyArr[i], stock: stockList.at(i).stock };
    }

    // TODO : 이벤트 채팅 여부 추가
    // console.log('이벤트 채팅 여부 : ', chatOpen);

    const eventParams = {
      //userId: localStorage.getItem("ID"),
      userId: 1,
      createdBy: 'SELLER',
      type: eventType,
      startAt: startAt + ':00',
      endAt: endAt + ':00',
      title: title,
      descript: descript,
      // chatOpen : chatOpen,
      eventImage: {
        eventBannerImg: 'dummyimage',
        EventDetailImg: 'dummydetail',
      },
      eventPrizeCreateRequestDtos: prizeList,
    };

    if (validation(eventParams)) {
      POST('/event', eventParams).then((res) => {
        if (res && res.data && confirm('이벤트를 등록하시겠습니까?') > 0) {
          alert('이벤트가 등록되었습니다. ');
          router.push({ pathname: `/seller/event/list` }, `/seller/event/list`);
        }
      });
    }
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
        />
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
        />
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

        <Heading title="이벤트 채팅 생성 여부" type="h2" />
        <Div>
          <Checkbox text="생성" onChange={onChatOpen} value={chatOpen} />
        </Div>
        <Divider />

        <Heading title="이벤트 진행 일시" type="h2" />
        <div className='w-full mb-4'>
          <Heading title="시작 일시" type="h3" />
          <Input
            type="datetime-local"
            onChange={startAtChangeHandler}
            value={startAt}
            css={{
              border: '0.1px solid #52525224',
            }}
          />
          <Heading title="종료 일시" type="h3" />
          <Input
            type="datetime-local"
            onChange={endAtChangeHandler}
            value={endAt}
            css={{
              border: '0.1px solid #52525224',
            }}
          />
        </div>
        <Divider />

        <div className="flex">
          <Heading title="이벤트 경품 선택" type="h2" />
          &nbsp;&nbsp;
          <btn.SmallPink
            buttonText="상품"
            onClickFunc={onSearchProductsHandler}
          />
          &nbsp;
          <btn.SmallPink
            buttonText="쿠폰"
            onClickFunc={onSearchCouponsHandler}
          />
        </div>
        <div className="mb-8">
          <p>상품 또는 쿠폰 목록을 조회해서 경품을 등록하세요.</p>
        </div>
        <div className="flex grid grid-flow-row-dense grid-cols-3">
          <div className="flex col-span-2 bg-gray-100 overflow-y-auto h-96">
            <ProductList inputProductList={productList} />
            <CouponList inputCouponList={couponList} />
          </div>
          <div className="flex align-middle bg-gray-100 border-l border-pink-200 overflow-y-auto">
            <EventPrizes inputList={prizeList} />
          </div>
        </div>

        <Divider />
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
          <btn.LinePink
            buttonText="취소하기"
            name="btnCancel"
            onClickFunc={onCancelHandler}
            css={{ margin: '10px;' }}
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

const OptionInputSection = styled.div`
  display: flex;
  padding: 5px;
  flex: 0 0 auto;
`;
