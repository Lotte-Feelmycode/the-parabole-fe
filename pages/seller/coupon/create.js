import * as color from '@utils/constants/themeColor';
import * as btn from '@components/input/Button';
import SiteHead from '@components/common/SiteHead';
import Heading from '@components/input/heading';
import styled from '@emotion/styled';
import Input from '@components/input/input';
import CommerceLayout from '@components/common/CommerceLayout';
import { GET, POST_DATA } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useInput from '@hooks/useInput';

export default function CouponCreate() {
  const router = useRouter();
  const [name, onChangeName] = useInput('');
  const [userId, onChangeUserId] = useInput(4);
  const [type, onChangeType] = useInput(1);
  const [discountValue, onChangeDiscountValue] = useInput(0);
  const [validAt, onChangeValidAt] = useInput(Date);
  const [validTime, onChangeValidTime] = useInput();
  const [expiresAt, onChangeExpiresAt] = useInput(Date);
  const [expireTime, onChangeExpireTime] = useInput();
  const [maxDiscountAmount, onChangeMaxDiscountAmount] = useInput(0);
  const [minPaymentAmount, onChangeMinPaymentAmount] = useInput(0);
  const [detail, onChangeDetail] = useInput('');
  const [cnt, onChangeCnt] = useInput();

  const [role, setRole] = useState('');

  // TODO:
  // setUserId(현재로그인되어있는userId-세션,쿠키 등에서 얻어올 것임);

  useEffect(() => {
    GET(`/user/role`, { userId }).then((res) => {
      if (res.message === 'ROLE_USER') {
        setRole('USER');
      }
      if (res.message === 'ROLE_SELLER') {
        setRole('SELLER');
      }
    });
  }, []);

  if (role === 'USER') {
    return (
      <CommerceLayout>
        <p>
          해당 사용자는 판매자가 아니라 쿠폰을 등록할 수 없습니다. 판매자로
          로그인 후에 사용해주세요.
        </p>
      </CommerceLayout>
    );
  }

  function submitFormHandler(e) {
    e.preventDefault();

    const reqBody = {
      name: name,
      userId: userId,
      type: type,
      discountValue: discountValue,
      validAt: validAt + 'T' + validTime,
      expiresAt: expiresAt + 'T' + expireTime,
      maxDiscountAmount: maxDiscountAmount,
      minPaymentAmount: minPaymentAmount,
      detail: detail,
      cnt: cnt,
    };

    POST_DATA(`/coupon/create`, reqBody)
      .then((res) => {
        console.log(res);

        // TODO: alert메시지 수정, 등록 완료 후에 redirection 여부도 추후 의견 통일하여 수정
        alert(
          res.type +
            " 유형의 '" +
            res.couponName +
            "' 쿠폰이 \n" +
            res.cnt +
            ' 장 발급 완료 되었습니다.',
        );
        router.push(`./list`);
      })
      .catch(function (error) {
        console.log(error);
        return {};
      });
  }

  // TODO: Dropdown select 수행 관련 함수
  // function changeTypeSelect() {
  //   var typeSelect = querySelector('#type-select');
  //   var selectValue = typeSelect.options[typeSelect.selectedIndex].value;
  //   var selectText = typeSelect.options[typeSelect.selectedIndex].text;

  //   console.log(selectValue);
  //   console.log(selectText);
  // }

  return (
    <CommerceLayout>
      <SiteHead title="쿠폰 등록" />
      <Divider />
      <Heading title="쿠폰 등록" type="h1" />
      <br />

      <Div>
        <Heading title="쿠폰명" type="h3" />
        <Input
          type="string"
          onChange={onChangeName}
          value={name}
          placeHolder="쿠폰명을 입력하세요."
        />
        <Heading title="쿠폰 유형" type="h3" />
        <Input
          type="string"
          onChange={onChangeType}
          value={type}
          placeHolder="쿠폰 유형을 선택하세요."
        />

        {/* TODO: 쿠폰 유형 선택하는 Input 을 Dropdown UI 로 수정 작업
        TODO: Input 받을때 쿠폰 만료일은 유효 시작일 이후로 설정되어야함. Validation 추가 작업 */}

        {/* <label>쿠폰 유형을 선택하세요.</label>
        <select
          id="type-select"
          name="type"
          onchange={changeTypeSelect()}
          className="w-full p-2.5 text-gray-500 bg-white border shadow-sm outline-none appearance-none"
        >
          <options>
            <option value="" selected disabled>
              쿠폰 타입을 선택
            </option>
            <option value={1}>할인 비율 쿠폰</option>
            <option value={2}>할인 금액 쿠폰</option>
          </options>
        </select> */}

        <Heading title="쿠폰 할인율/금액" type="h3" />
        <Input
          type="number"
          onChange={onChangeDiscountValue}
          value={discountValue}
          placeHolder="등록할 쿠폰의 할인율 또는 할인액수을 입력하세요."
        />
        <Heading title="쿠폰 유효 시작일" type="h3" />
        <Input
          type="date"
          onChange={onChangeValidAt}
          value={validAt}
          placeHolder="쿠폰 사용 가능 시작일을 입력하세요."
        />
        <Input
          type="time"
          onChange={onChangeValidTime}
          value={validTime}
          placeHolder="쿠폰 사용 가능 시작 시간을 입력하세요."
        />
        <Heading title="쿠폰 만료일" type="h3" />
        <Input
          type="date"
          onChange={onChangeExpiresAt}
          value={expiresAt.toI}
          placeHolder="쿠폰 만료일을 입력하세요."
        />
        <Input
          type="time"
          onChange={onChangeExpireTime}
          value={expireTime}
          placeHolder="쿠폰 사용 가능 시작 시간을 입력하세요."
        />
        <Heading title="최대 할인 금액" type="h3" />
        <Input
          type="number"
          onChange={onChangeMaxDiscountAmount}
          value={maxDiscountAmount}
          placeHolder="쿠폰을 사용할 시 최대 할인 가능 금액을 입력하세요."
        />
        <Heading title="최소 결제 금액" type="h3" />
        <Input
          type="number"
          onChange={onChangeMinPaymentAmount}
          value={minPaymentAmount}
          placeHolder="쿠폰을 사용할 시 최소 결제해야 하는 금액을 입력하세요."
        />
        <Heading title="쿠폰 상세 설명" type="h3"></Heading>
        <Input
          type="string"
          onChange={onChangeDetail}
          value={detail}
          placeHolder="쿠폰 상세 설명을 입력하세요."
        />
        <Heading title="쿠폰 발행 수량" type="h3"></Heading>
        <Input
          type="number"
          onChange={onChangeCnt}
          value={cnt}
          placeHolder="해당 쿠폰을 발행할 수량을 입력하세요."
        />
        <BtnSection className="redirection-btn">
          <btn.Blue
            buttonText="쿠폰 등록하기"
            onClickFunc={submitFormHandler}
          />
        </BtnSection>
      </Div>
    </CommerceLayout>
  );
}

const BtnSection = styled.div`
  display: inline-block;
`;

const Div = styled.div`
  display: flex;
  margin-left: 40px;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FormTemplate = styled.form`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;

const InputSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0;
  padding: 10px;
  background-color: ${color.ThemeColor1_1};
  border-radius: 0.25rem;
`;
