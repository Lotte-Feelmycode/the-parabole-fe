import styled from '@emotion/styled';
import { ThemeGray4 } from '@utils/constants/themeColor';
import { LargeInput } from '@components/input/Input';
import { useState } from 'react';

export default function OrdererSection({
  getUserName,
  getUserPhone,
  receiverName,
  receiverPhone,
  receiverSimpleAddress,
  receiverDetailAddress,
  receiverMemo,
  setReceiverName,
  setReceiverPhone,
  setReceiverSimpleAddress,
  setReceiverDetailAddress,
  setReceiverMemo,
}) {
  const [sameAsUserFlag, setSameAsUserFlag] = useState(false);

  function sameAsUser(flag) {
    setSameAsUserFlag(flag);
    if (flag) {
      setReceiverName(getUserName);
      setReceiverPhone(getUserPhone);
    } else {
      setReceiverName('');
      setReceiverPhone('');
    }
  }

  return (
    <div>
      <div>
        <H3>주문자</H3>
        <InputContainer>
          <InputLable>주문자 이름</InputLable>
          <Inputpart>
            <LargeInput
              css={input}
              attr={{ disabled: true }}
              value={getUserName}
            />
          </Inputpart>
        </InputContainer>
        <InputContainer>
          <InputLable>휴대전화</InputLable>
          <Inputpart>
            <LargeInput
              // TODO : user 정보 넣기
              css={input}
              value={getUserPhone}
            />
          </Inputpart>
        </InputContainer>
      </div>
      <HR />
      <H3 className="receiver-section">배송정보</H3>
      <SameAsUserSection className="same-as-user-section">
        <input
          type="checkBox"
          onChange={(event) => {
            sameAsUser(event.target.checked);
          }}
        />
        <span> 주문자 정보와 동일</span>
      </SameAsUserSection>
      <div>
        <InputContainer>
          <InputLable>받는 분</InputLable>
          <Inputpart>
            {sameAsUserFlag ? (
              <LargeInput
                type="text"
                css={input}
                attr={{ disabled: true }}
                value={receiverName}
                onChange={(event) => {
                  setReceiverName(event.target.value);
                }}
              />
            ) : (
              <LargeInput
                type="text"
                css={input}
                value={receiverName}
                onChange={(event) => {
                  setReceiverName(event.target.value);
                }}
              />
            )}
          </Inputpart>
        </InputContainer>
        <InputContainer>
          <InputLable>휴대전화</InputLable>
          <Inputpart>
            {sameAsUserFlag ? (
              <LargeInput
                type="text"
                css={input}
                value={receiverPhone}
                onChange={(event) => {
                  setReceiverPhone(event.target.value);
                }}
              />
            ) : (
              <LargeInput
                type="text"
                css={input}
                value={receiverPhone}
                onChange={(event) => {
                  setReceiverPhone(event.target.value);
                }}
              />
            )}
          </Inputpart>
        </InputContainer>
        <InputContainer>
          <InputLable>배송지</InputLable>
          <Inputpart>
            <LargeInput
              css={input}
              value={receiverSimpleAddress}
              onChange={(event) => {
                setReceiverSimpleAddress(event.target.value);
              }}
            />
          </Inputpart>
        </InputContainer>
        <InputContainer>
          <InputLable>상세 주소</InputLable>
          <Inputpart>
            <LargeInput
              css={input}
              value={receiverDetailAddress}
              onChange={(event) => {
                setReceiverDetailAddress(event.target.value);
              }}
            />
          </Inputpart>
        </InputContainer>
        <InputContainer>
          <InputLable>배송 메모</InputLable>
          <Inputpart>
            <LargeInput
              css={input}
              value={receiverMemo}
              onChange={(event) => {
                setReceiverMemo(event.target.value);
              }}
            />
          </Inputpart>
        </InputContainer>
      </div>
    </div>
  );
}

const input = {
  width: '14rem',
  borderRadius: '0.2rem',
  border: 'solid 1px ' + ThemeGray4,
  fontSize: '1rem',
  margin: 0,
};

const H3 = styled.p`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const HR = styled.hr`
  margin: 1rem;
  color: ${ThemeGray4};
  background-color: ${ThemeGray4};
  border-color: ${ThemeGray4};
`;

const SameAsUserSection = styled.div`
  padding: 5px 0;
  font-size: 1rem;
`;

const InputContainer = styled.div`
  display: inline-flex;
  width: 100%;
  margin: 10px 0;
`;

const InputLable = styled.span``;

const Inputpart = styled.div`
  margin: 0;
  margin-left: auto;
`;
