import styled from '@emotion/styled';

export default function UserSearchResult({ user }) {
  // if (!userList) {
  //   return <p>해당 유저명을 가지는 사용자가 존재하지 않습니다.</p>;
  // }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="py-4 px-6">
        <input type="checkbox" />
        {user.username}
      </td>
      <td className="py-4 px-6">{user.email}</td>
      <td className="py-4 px-6">{user.phone}</td>
    </tr>
  );
}
