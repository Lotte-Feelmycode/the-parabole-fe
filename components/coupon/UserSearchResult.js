export default function UserSearchResult({ userList }) {
  if (!userList) {
    return <p>해당 유저명을 가지는 사용자가 존재하지 않습니다.</p>;
  }

  return (
    <ul className="user-list">
      {userList &&
        userList.map((user) => (
          <li key={user.userId}>
            {user.username}&nbsp;{user.email}&nbsp;{user.phone}
          </li>
        ))}
    </ul>
  );
}
