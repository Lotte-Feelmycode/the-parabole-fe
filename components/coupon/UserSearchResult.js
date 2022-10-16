export default function UserSearchResult({ user }) {
  // if (!userList) {
  //   return <p>해당 유저명을 가지는 사용자가 존재하지 않습니다.</p>;
  // }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {/* <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.userId}
      </th> */}
      <td className="py-4 px-6">{user.username}</td>
      <td className="py-4 px-6">{user.email}</td>
      <td className="py-4 px-6">{user.phone}</td>
    </tr>
  );
}
