import styled from '@emotion/styled';
import { LargeInput } from '@components/input/Input';
import { ThemeGray5 } from '@utils/constants/themeColor';
import { SmallPink } from '@components/input/Button';

export default function CouponAssignResult({
  selectedCoupon,
  userParentList,
  changeUserParentList,
}) {
  function handleChkChange(user) {
    changeUserParentList({
      userId: user.userId,
      email: user.email,
      phone: user.phone,
      username: user.username,
      flag: false,
    });
  }

  function ShowCoupon() {
    if (selectedCoupon !== 0) {
      let couponString =
        selectedCoupon.name +
        ' (' +
        selectedCoupon.discountValue +
        (selectedCoupon.type === 1 ? '% 할인쿠폰' : '₩ 할인쿠폰') +
        ')';

      return (
        <LabelInputSection>
          <LargeInput
            type="text"
            attr={{ readOnly: true }}
            css={{ width: '100%' }}
            value={couponString}
          />
        </LabelInputSection>
      );
    } else {
      return (
        <LabelInputSection>
          <LargeInput
            type="text"
            attr={{ readOnly: true }}
            css={{ width: '100%' }}
            value={'쿠폰을 선택해주세요'}
          />
        </LabelInputSection>
      );
    }
  }

  function ShowUser() {
    if (userParentList.length > 0) {
      return (
        userParentList &&
        userParentList.map((user) => (
          <tr
            key={user.userId}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 px-6"
          >
            <td className="py-4 px-6">{user.username}</td>
            <td className="py-4 px-6">{user.email}</td>
            <td className="py-4 px-6">{user.phone}</td>
            <td className="py-4 px-6">
              <SmallPink
                buttonText={'제거'}
                onClickFunc={() => {
                  handleChkChange(user);
                }}
              />
            </td>
          </tr>
        ))
      );
    } else {
      return (
        <tr>
          <EmptyTd colSpan={4}>
            <span>{'사용자를 선택해주세요'}</span>
          </EmptyTd>
        </tr>
      );
    }
  }

  return (
    <div>
      <LabelSection>
        <LabelTitle>선택된 쿠폰</LabelTitle>
        <ShowCoupon selectedCoupon={selectedCoupon} />
      </LabelSection>
      <LabelTitle>선택된 사용자</LabelTitle>
      <UserTableSection>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">사용자명</th>
              <th className="py-3 px-6">이메일</th>
              <th className="py-3 px-6">전화번호</th>
              <th className="py-3 px-6">제거</th>
            </tr>
          </thead>
          <tbody>
            <ShowUser userParentList={userParentList} />
          </tbody>
        </table>
      </UserTableSection>
    </div>
  );
}

const LabelSection = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
`;

const LabelTitle = styled.span`
  margin-left: auto;
  font-size: 1.1rem;
  width: 30%;
`;

const LabelInputSection = styled.span`
  display: inline-flex;
  width: 70%;
`;

const UserTableSection = styled.div`
  margin-top: 10px;
  max-height: 400px;
  overflow: auto;
`;

const EmptyTd = styled.td`
  text-align: center;
  font-size: larger;
  font-style: bold;
  padding: 30px;
  background-color: ${ThemeGray5};
  color: black;
`;
