import { GET_DATA } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { LargeInput } from '@components/input/Input';

export default function MyProfile({ headers }) {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    GET_DATA(`/user`, '', headers).then((res) => {
      if (res) {
        setUserInfo(res);
      }
    });
  }, []);

  function GetEmail({ email }) {
    if (email && email.split('@')[1]) {
      return (
        <>
          <LargeInput
            type="text"
            attr={{ readOnly: true }}
            css={{ width: '100%' }}
            value={email.split('@')[0] || ''}
          />
          <span className="py-1 px-1">@</span>
          <LargeInput
            type="text"
            attr={{ readOnly: true }}
            css={{ width: '100%' }}
            value={email.split('@')[1] || ''}
          />
        </>
      );
    } else {
      return (
        <LargeInput
          type="text"
          attr={{ readOnly: true }}
          css={{ width: '100%' }}
          value={email || ''}
        />
      );
    }
  }

  return (
    <>
      <BgDiv className="py-7">
        <LabelSection>
          <LabelTitle>이름</LabelTitle>
          <LabelInputSection>
            <LargeInput
              type="text"
              attr={{ readOnly: true }}
              css={{ width: '100%' }}
              value={userInfo.username || ''}
            />
          </LabelInputSection>
        </LabelSection>
        <LabelSection>
          <LabelTitle>닉네임</LabelTitle>
          <LabelInputSection>
            <LargeInput
              type="text"
              attr={{ readOnly: true }}
              css={{ width: '100%' }}
              value={userInfo.nickname || ''}
            />
          </LabelInputSection>
        </LabelSection>
        <LabelSection>
          <LabelTitle>이메일</LabelTitle>
          <LabelInputSection>
            <GetEmail email={userInfo.email} />
          </LabelInputSection>
        </LabelSection>
        <LabelSection>
          <LabelTitle>계정정보</LabelTitle>
          <LabelInputSection>
            <LargeInput
              type="text"
              attr={{ readOnly: true }}
              css={{ width: '100%' }}
              value={userInfo.role || ''}
            />
          </LabelInputSection>
        </LabelSection>
      </BgDiv>
    </>
  );
}

const BgDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 10%;
  align-items: center;
  border-radius: 7%;
`;

const LabelSection = styled.div`
  display: flex;
  width: 90%;
  margin: 20px;
`;

const LabelTitle = styled.span`
  margin: auto;
  font-size: 1.2rem;
  font-weight: bold;
  width: 30%;
`;

const LabelInputSection = styled.span`
  display: inline-flex;
  width: 70%;
`;
